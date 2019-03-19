import json
import os

from exceptions import MiddleTierException
from services.service import Service


class NotFoundServiceException(MiddleTierException):
    pass


class NotFoundSecurityServiceException(MiddleTierException):
    pass


CONFIG_PATH = os.getenv("CONFIG_PATH") or "/opt/middle_tier/services.json"


class ServiceLoader(object):
    """
    Will find specified modules and try to load it
    """

    def __init__(self) -> None:
        super().__init__()
        self.services = []
        self.auth_services = []

    def load(self) -> list:
        with open(CONFIG_PATH) as services_file:
            services_json = json.load(services_file)
            self.services = self.process_services(services_json)
            return self.services

    def process_services(self, services_json):
        services = []
        for service in services_json.get("services", []):
            auth = service.get("auth")
            auth_service = None
            if auth:
                auth_service = self.get_auth_service(services_json, auth)
            services.append(Service(service, auth=auth_service))
        return services

    def get_services(self):
        return self.services

    def find_service(self, request):
        for service in self.services:
            if service.can_handle(request):
                return service
        return None

    def get_auth_service(self, service_definition, service_id):
        for auth_service in service_definition.get("auth", []):
            if auth_service["id"] == service_id:
                return auth_service
        raise NotFoundSecurityServiceException("There is not auth service: {}".format(service_id))
