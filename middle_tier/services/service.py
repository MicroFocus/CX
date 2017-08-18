import re

import logging

from services.handlers import CommonHandler, VirtualHandler

logger = logging.getLogger()
class Service:
    def __init__(self, service_definition):
        self.service_definition = service_definition
        self.handlers = []
        if "virtual" in service_definition:
            virtual_handlers = service_definition["virtual"]
            for virtual_handler in virtual_handlers:
                self.handlers.append(VirtualHandler(self, virtual_handler))
        if "proxy" in service_definition:
            self.listen_path = self.service_definition["proxy"]["listen_path"]
            self.target_url = self.service_definition["proxy"]["target_url"]
            self.handlers.append(CommonHandler(self.listen_path, self.target_url))

    def handle(self, request):
        for handler in self.handlers:
            if handler.can_handle(request):
                return handler.handle(request)
        return None

    def can_handle(self, request):
        can_handle = any([handler.can_handle(request) for handler in self.handlers])
        return can_handle
