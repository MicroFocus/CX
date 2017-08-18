import importlib
import re

import logging

from proxy.request import send_request

log = logging.getLogger(__name__)

class Handler(object):
    def __init__(self):
        pass

    def handle(self, request):
        raise NotImplemented

    def can_handle(self, request):
        return False


class CommonHandler(Handler):
    def __init__(self, listen_path, target_url):
        super().__init__()
        self.listen_path = listen_path
        self.target_url = target_url

    def can_handle(self, request):
        return (re.match(self.listen_path, request.url) is not None) and self.target_url

    def handle(self, request):
        final_url = "{}/{}".format(self.target_url,request.url[len(self.listen_path):])
        response = send_request(final_url, request.method, request.headers, request.data)
        return response


class VirtualHandler(Handler):
    def __init__(self,service, virtual):
        super().__init__()
        self.service = service
        self.virtual = virtual


    def can_handle(self, request):
        handler_url = "{}{}".format(self.service.listen_path, self.virtual["path"])
        can_handle = (re.match(handler_url, request.url) is not None) and (
        request.method == self.virtual["method"])
        return can_handle

    def handle(self, request):
        module_name = self.virtual["function_source_uri"]
        module = importlib.import_module(module_name)
        if not module_name:
            raise Exception("Can't load module: {}".format(module_name))

        clazz, method = self.virtual["response_function_name"].split(".")
        clazz_obj = getattr(module, clazz)
        if not clazz_obj:
            raise Exception("Can't load class: {} {}".format(module_name, clazz))
        virtual_handler = clazz_obj(self.service)
        method_obj = getattr(virtual_handler, method)
        if not method_obj:
            raise Exception("Can't load method: {} {} {}".format(module_name, clazz, method))
        response = method_obj(request)
        return response
