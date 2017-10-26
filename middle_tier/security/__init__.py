import importlib

from exceptions import MiddleTierException


class IncorrectSecurityConfigurationException(MiddleTierException):
    pass


class UnauthorizedSecurityException(MiddleTierException):
    pass


class SecurityInternalException(MiddleTierException):
    pass


class AuthenticationResponse:
    pass


class SecurityHandler:
    BY_HEADER = 0
    BY_COOKIE = 1
    BY_URL_PARAM = 2

    def __init__(self, config):
        self.method = self.BY_HEADER
        self.config = config

    def get_data(self):
        return self.config.get("data", {})

    def get_auth_header_name(self):
        return self.config.get("auth_header_name")

    def handle(self, request):
        raise NotImplemented


class CustomSecurityHandler(SecurityHandler):
    def __init__(self, auth_data):
        super().__init__(auth_data)
        self.auth_data = auth_data

    def handle(self, request):
        auth_data_custom = self.auth_data.get("data", {})
        module_name = auth_data_custom["function_source_uri"]
        module = importlib.import_module(module_name)
        if not module_name:
            raise MiddleTierException("Can't load module: {}".format(module_name))

        clazz, method = auth_data_custom["response_function_name"].split(".")
        clazz_obj = getattr(module, clazz)
        if not clazz_obj:
            raise MiddleTierException("Can't load class: {} {}".format(module_name, clazz))
        virtual_handler = clazz_obj()
        method_obj = getattr(virtual_handler, method)
        if not method_obj:
            raise MiddleTierException("Can't load method: {} {} {}".format(module_name, clazz, method))
        response = method_obj(request, self.auth_data)
        return response


class SecurityHandlerFactory:
    @classmethod
    def create(cls, auth_data):
        if auth_data.get("type") == "custom":
            return CustomSecurityHandler(auth_data)
        return None
