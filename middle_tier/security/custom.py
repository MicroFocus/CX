import importlib
import logging

from lru import LRUCacheDict

from exceptions import MiddleTierException
from security import SecurityHandler, UnauthorizedSecurityException

logger = logging.getLogger()
MAX_CACHE_SIZE = 10000


# Override this class to develop new key security checker
class CustomKeyHandler(SecurityHandler):
    def __init__(self, config):
        super().__init__(config)


class CustomKeySecurityHandlerWrapper(SecurityHandler):
    cache = None

    def __init__(self, auth_data):
        super().__init__(auth_data)
        self.auth_data = auth_data
        auth_data_custom = self.auth_data.get("data", {})
        cache_time = self.auth_data.get('cache_time')
        if cache_time:
            self.cache = LRUCacheDict(max_size=MAX_CACHE_SIZE, expiration=cache_time)
        self.module_name = auth_data_custom["function_source_uri"]
        self.clazz, self.method = auth_data_custom["response_function_name"].split(".")
        self.virtual_handler_clazz = self.create_auth_service(self.auth_data, self.module_name, self.clazz)
        if not isinstance(self.virtual_handler_clazz, CustomKeyHandler):
            raise MiddleTierException("Security handler should be inherited from security.custom.CustomKeyHandler")
        self.virtual_handler = getattr(self.virtual_handler_clazz, self.method)
        if not self.virtual_handler:
            raise MiddleTierException("Can't load method: {} {} {}".format(self.module_name, self.clazz, self.method))

    def handle(self, request):
        key = self.get_key(request, self.auth_data)
        response = None
        if self.cache and self.cache.has_key(key):
            logger.debug("Using cache for key: %s", key)
            try:
                response = self.cache[key]
            except KeyError:
                logger.debug("Cache doesn't have this key")
        if response is None:
            response = self.virtual_handler(key)
            if self.cache:
                logger.debug("Setting cache value for key: %s", key)
                self.cache[key] = response
        if response:
            request.auth = response
        return response

    @staticmethod
    def create_auth_service(auth_data, module_name, clazz):
        loaded_module = importlib.import_module(module_name)
        if not module_name:
            raise MiddleTierException("Can't load module: {}".format(module_name))
        clazz_obj = getattr(loaded_module, clazz)
        if not clazz_obj:
            raise MiddleTierException("Can't load class: {} {}".format(module_name, clazz))
        virtual_handler = clazz_obj(auth_data)
        return virtual_handler

    @staticmethod
    def get_key(request, service_data):
        token = request.headers.get(service_data.get("auth_header_name", "Authorization"))
        if not token:
            raise UnauthorizedSecurityException("Provide auth key")
        logger.debug("Token value = {}".format(token))
        return token
