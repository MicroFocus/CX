import json
import logging

import requests

from exceptions import MiddleTierException
from proxy.response import Response
from resources.base import Resource
from security import IncorrectSecurityConfigurationException, UnauthorizedSecurityException, \
    AuthenticationResponse
from security.custom import CustomKeyHandler

logger = logging.getLogger()
TARGET_URL_PROP = "target_url"
USERNAME_PROP = "username"
PASSWORD_PROP = "password"
APP_PROP = "app"
TIMEOUT = "timeout"


class OSPAuthenticationResponse(AuthenticationResponse):
    def __init__(self, response):
        self.response = response

    def get_username(self):
        return self.response.get("username")


class OSPTokenCheckClient:
    def __init__(self, url, username, password, app, timeout=10):
        self.app = app
        self.url = self.get_osp_introspect_url(url, app)
        self.username = username
        self.timeout = timeout
        self.password = password
        if any(prop is None for prop in [url, username, password, app, timeout]):
            raise MiddleTierException(
                "These params are not configured: {}")

    def get_osp_introspect_url(self, url, app):
        url = '{base}/osp/a/{app}/auth/oauth2/introspect'.format(base=url,
                                                                 app=app)
        logger.debug("OSP introspect url = {}".format(url))
        return url

    def check_token(self, token):
        logger.debug("OSP url: {}".format(self.url))
        try:
            r = requests.post(self.url, auth=(self.username, self.password), data={
                "token": token}, timeout=self.timeout)
            logger.debug("OSP returns: {}".format(r.text))
            if r.status_code == 200:
                return r.json()
            else:
                return None
        except Exception as e:
            logger.exception("Failed to run OSP token checker")
            raise e


class OSPProxy(CustomKeyHandler):
    def __init__(self, config):
        super().__init__(config)
        if self.config is None:
            raise IncorrectSecurityConfigurationException("Security custom data is not configured")
        data = self.config.get("data")

        url = data.get(TARGET_URL_PROP)
        username = data.get(USERNAME_PROP)
        password = data.get(PASSWORD_PROP)
        app = data.get(APP_PROP)
        timeout = data.get(TIMEOUT, 10)
        self.osp_client = OSPTokenCheckClient(url, username, password, app, timeout)

    def check(self, token):
        logger.debug("OSP security proxy data = {}".format(self.config))
        bearer_prefix = "Bearer "
        if not token.startswith(bearer_prefix):
            raise UnauthorizedSecurityException("Incorrect auth key")
        token = token[len(bearer_prefix):]
        try:
            check_token = self.osp_client.check_token(token)
            is_active = check_token.get('active', False)
            logger.debug("OSP user status: {}".format(is_active))
            if is_active:
                return OSPAuthenticationResponse(check_token)
            else:
                raise UnauthorizedSecurityException("Not authorized")
        except Exception:
            raise UnauthorizedSecurityException("Not authorized")


class OSPVirtualEndpoint(Resource):
    def __init__(self, service):
        super().__init__(service)
        self.config = service.service_definition
        if self.config is None:
            raise IncorrectSecurityConfigurationException("Security custom data is not configured")
        data = self.config.get("data")

        url = data.get(TARGET_URL_PROP)
        username = data.get(USERNAME_PROP)
        password = data.get(PASSWORD_PROP)
        app = data.get(APP_PROP)
        timeout = data.get(TIMEOUT, 10)
        self.osp_client = OSPTokenCheckClient(url, username, password, app, timeout)

    def get_token(self, request):
        bearer_prefix = "Bearer "
        token = request.headers.get("Authorization")
        if not token or not token.startswith(bearer_prefix):
            raise UnauthorizedSecurityException("Not authorized")
        token = token[len(bearer_prefix):]
        try:
            response = self.osp_client.check_token(token)
            is_active = response.get('active', False)
            logger.debug("OSP user status: {}".format(is_active))
            if not is_active:
                raise UnauthorizedSecurityException("Not authorized")
        except Exception:
            return Response(json.dumps({}), headers={'Content-type': "application/json"})
        return Response(json.dumps(response), headers={'Content-type': "application/json"})
