import logging

from security import SecurityHandlerFactory
from services.handlers import CommonHandler, VirtualHandler

logger = logging.getLogger()


class Service:
    def __init__(self, service_definition, auth=None):
        self.service_definition = service_definition
        self.handlers = []
        self.pre_handlers = []
        if "virtual" in service_definition:
            virtual_handlers = service_definition["virtual"]
            for virtual_handler in virtual_handlers:
                self.handlers.append(VirtualHandler(self, virtual_handler))
        if "proxy" in service_definition:
            self.listen_path = self.service_definition["proxy"]["listen_path"]
            self.target_url = self.service_definition["proxy"]["target_url"]
            self.handlers.append(CommonHandler(self.listen_path, self.target_url))
        if auth:
            security_pre_handler = SecurityHandlerFactory.create(auth)
            self.pre_handlers.append(security_pre_handler)

    def pre_handle(self, request):
        logger.debug("Pre handlers = {}".format(self.pre_handlers))
        for pre_handler in self.pre_handlers:
            pre_handler.handle(request)

    def handle(self, request):
        self.pre_handle(request)
        for handler in self.handlers:
            if handler.can_handle(request):
                logger.debug("Handler = {}".format(self.pre_handlers))
                return handler.handle(request)
        return None

    def can_handle(self, request):
        can_handle = any([handler.can_handle(request) for handler in self.handlers])
        return can_handle
