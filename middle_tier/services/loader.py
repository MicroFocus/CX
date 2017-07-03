import json

from services.service import Service


class NotFoundServiceException(Exception):
    pass


CONFIG_PATH = "/opt/middle_tier/services.json"


class ServiceLoader(object):
    """
    Will find specified modules and try to load it
    """

    def __init__(self) -> None:
        super().__init__()
        self.services = []

    def load(self) -> list:
        with open(CONFIG_PATH) as services_file:
            services_json = json.load(services_file)
            self.services = self.process_services(services_json)
            return self.services

    def process_services(self, services_json):
        services = []
        for service in services_json:
            services.append(Service(service))
        return services

    def get_services(self):
        return self.services

    def find_service(self, request):
        for service in self.services:
            if service.can_handle(request):
                return service
        return None
