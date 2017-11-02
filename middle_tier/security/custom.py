import importlib
import logging

from werkzeug.contrib.cache import RedisCache

from cache import get_cache
from exceptions import MiddleTierException
from security import SecurityHandler, UnauthorizedSecurityException

logger = logging.getLogger()



# Override this class to develop new key security checker
class CustomKeyHandler(SecurityHandler):
    def __init__(self, config):
        super().__init__(config)


class CustomKeySecurityHandlerWrapper(SecurityHandler):
    """
    This class handles the caching of the security token.  It determines when you should 
    get the security token from cache and when we should call to OSP to validate the token.
    
    Right now we are using this class for OSP tokens, but it is just a generic cache.  It could
    support any type of token or other data we need at some point in the future.
    
    This class uses a REDIS cache so we can have a shared cache instead of relying on Python 
    threads.  Our application uses uWSGI which separates HTTP calls on processes instead of 
    threads.  That means we don't share memory between the threads.  If we try to we will
    run into trouble with the Python Global Interpreter Lock.
    
    Instead of that we are running Redis in a separate process to manage the cache of tokens.
    By using this separate process we can avoid validating the OSP token on every request and
    gain a substantial performance improvement.
    
    Right now we are using redis, but this class is a generic cache interface.  It could work 
    with memcached or any other cache we wanted to use.  There is more documentation about that
    here:
    
        http://werkzeug.pocoo.org/docs/0.12/contrib/cache
    
    This would all be avoidable if we were using JWT tokens.  With JWT we could validate the
    token without making a call to OSP and we wouldn't have as much need for caching, but JWT
    isn't available on the versions of OSP we need to support.
    """
    cache = None

    def __init__(self, auth_data):
        super().__init__(auth_data)
        self.auth_data = auth_data
        auth_data_custom = self.auth_data.get("data", {})
        self.cache_time = self.auth_data.get('cache_time')
        if self.cache_time:
            self.cache = get_cache()
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
        if self.cache:
            response = self.cache.get(key)
            if response:
                logger.debug("Using cache for key: %s", key)
        if response is None:
            response = self.virtual_handler(key)
            if self.cache:
                logger.debug("Setting cache value for key: %s", key)
                self.cache.set(key, response, timeout=self.cache_time)
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
