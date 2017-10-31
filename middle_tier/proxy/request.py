import requests

from proxy.exceptions import IncorrectMethod


class Request:
    def __init__(self, url, method, args, headers, data=None, stream=True, verify_ssl=True):
        self.args = args
        self.stream = stream
        self.data = data
        self.headers = headers
        self.method = method
        self.url = url
        self.verify_ssl = verify_ssl
        # Will be set by security handler
        self.auth = None


def send_request(url, method, request_headers, data=None, stream=True):
    headers = {key: value for (key, value) in request_headers if key != 'Host'}
    if method == "GET":
        req = requests.get(url, headers=headers, stream=stream, verify=False)
    elif method == "POST":
        req = requests.post(url, data=data, headers=headers, stream=stream, verify=False)
    elif method == "DELETE":
        req = requests.delete(url, data=data, headers=headers, stream=stream, verify=False)
    elif method == "PUT":
        req = requests.put(url, data=data, headers=headers, stream=stream, verify=False)
    elif method == "PATCH":
        req = requests.patch(url, data=data, headers=headers, stream=stream, verify=False)
    else:
        raise IncorrectMethod("Incorrect method: {}".format(method))
    return req
