import json
import string
import random
from hashlib import sha256
import logging
import requests
from proxy.request import send_request, Request
from proxy.response import Response
from resources.base import Resource

logger = logging.getLogger()
class AAFResource(Resource):
    def __init__(self, service):
        super().__init__(service)
        self.config = service.service_definition
        if self.config is None:
            raise IncorrectSecurityConfigurationException("AAF ingegration is not configured")
        data = self.config.get("data")

        self.endpoint_id = data.get("endpoint_id")
        self.endpoint_secret = data.get("endpoint_secret")
        self.target_url = data.get("target_url")

    def get_endpoint_hash(self, endpointId, endpoint_secret, salt):
        salted_endpoint_id = (endpointId + salt).encode('utf-8')
        endpoint_id_hash = sha256(salted_endpoint_id).hexdigest()
        salted_endpoint_secret = (endpoint_secret + endpoint_id_hash).encode('utf-8')
        return sha256(salted_endpoint_secret).hexdigest()

    def create_endpoint(self, request):
        logger.debug("AAF target url: {}".format(self.target_url))
        try:
            salt = "3a8c901ade36cd446114eb602711ccce75443c294cc3dd02e574702bb574f32f"
            r = requests.post("{}/api/v1/endpoints/{}/sessions".format(self.target_url, self.endpoint_id),
                              data={"salt": salt,
                                    "endpoint_secret_hash": self.get_endpoint_hash(self.endpoint_id,
                                                                                   self.endpoint_secret, salt),
                                    "session_data": {}}, timeout=30, verify=False)
            logger.debug("AAF returns: {}".format(r.text))
            logger.debug("r.status_code: {}".format(r.status_code))
            if r.status_code == 200:
                return Response(r.text, headers={'Content-type': "application/json"})
            elif r.status_code == 401:
                '''
                When the server returns a 401 it means that the client ID or 
                client secret are incorrect.  In this case we can give a better
                error message to help sort out the configuration issue.
                '''
                raise IncorrectSecurityConfigurationException("Unable to authenticate request")
            else:
                return Response(r.text, headers={'Content-type': "application/json"})
        except Exception as e:
            logger.exception("Failed to run AAF token checker")
            raise e
