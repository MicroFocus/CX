import logging

import requests

from exceptions import MiddleTierException
from security import IncorrectSecurityConfigurationException, UnauthorizedSecurityException, \
    AuthenticationResponse

logger = logging.getLogger()


class OSPAuthenticationResponse(AuthenticationResponse):
    def __init__(self, response):
        self.response = response


class OSPProxy:
    TARGET_URL_PROP = "target_url"
    USERNAME_PROP = "username"
    PASSWORD_PROP = "password"
    APP_PROP = "app"

    def check(self, request, service_data=None):
        if service_data is None:
            raise IncorrectSecurityConfigurationException("Security custom data is not configured")
        logger.debug("OSP security proxy data = {}".format(service_data))
        data = service_data.get("data")
        self.validate_custom_data(data)
        url = self.get_osp_introspect_url(data)
        token = self.get_osp_token(request, service_data)
        r = requests.post(url, auth=(data.get(self.USERNAME_PROP), data.get(self.PASSWORD_PROP)), data={
            "token": token
        })
        logger.debug("OSP returns: {}".format(r.text))
        if r.status_code == 200:
            return OSPAuthenticationResponse(r.json())
        else:
            raise UnauthorizedSecurityException("Not authorized")

    def get_osp_introspect_url(self, data):
        url = '{base}/osp/a/{app}/auth/oauth2/introspect'.format(base=data.get(self.TARGET_URL_PROP),
                                                                 app=data.get(self.APP_PROP))
        logger.debug("OSP introspect url = {}".format(url))
        return url

    def get_osp_token(self, request, service_data):
        token = request.headers.get(service_data.get("auth_header_name", "Authorization"))
        if not token:
            raise UnauthorizedSecurityException("No Authentication header or parameter was included in the request.")
        bearer_prefix = "Bearer "
        if token.startswith(bearer_prefix):
            token = token[len(bearer_prefix):]
        else:
            raise UnauthorizedSecurityException("Authentication header was incorrect.")
        logger.debug("Token value = {}".format(token))
        return token

    def validate_custom_data(self, data):
        config_params = [self.TARGET_URL_PROP, self.USERNAME_PROP, self.PASSWORD_PROP, self.APP_PROP]
        if any((data.get(prop) is None for prop in config_params)):
            missed_params = [prop for prop in config_params if data.get(prop) is None]
            raise IncorrectSecurityConfigurationException(
                "These params are not configured: {}".format(", ".join(missed_params)))
