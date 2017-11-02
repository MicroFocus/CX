import logging

from exceptions import MiddleTierException

logger = logging.getLogger()


class IncorrectSecurityConfigurationException(MiddleTierException):
    pass


class UnauthorizedSecurityException(MiddleTierException):
    def __init__(self, *args, **kwargs):
        super().__init__(self, *args, code=401, *kwargs)


class SecurityInternalException(MiddleTierException):
    pass


class AuthenticationResponse:
    def get_username(self):
        return None

    def get_user_groups(self):
        return None


class SecurityHandler:
    def __init__(self, config):
        self.config = config

    def get_data(self):
        return self.config.get("data", {})

    def get_auth_header_name(self):
        return self.config.get("auth_header_name")

    def handle(self, request):
        raise NotImplemented


class SecurityHandlerFactory:
    @classmethod
    def create(cls, auth_data):
        if auth_data.get("type") == "custom_key":
            from security.custom import CustomKeySecurityHandlerWrapper
            return CustomKeySecurityHandlerWrapper(auth_data)
        return None
