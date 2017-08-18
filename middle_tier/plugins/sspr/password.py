import json
import string
import random

from proxy.request import send_request, Request
from proxy.response import Response
from resources.base import Resource


class SSPRResource(Resource):
    def __init__(self, service):
        super().__init__(service)
        self.service = service

    def multiple_sspr_random_passwords(self, request):
        url = self.service.target_url + "/randompassword"
        passwords = []

        num = request.args.get('num')
        if num is not None and num != '':
            num = int(num)
        else:
            num = 10

        if num < 1 or num > 50:
            num = 10

        for i in range(0, num):
            r = send_request(url, request.method, request.headers)
            passwords.append(r.text)

        return Response(json.dumps({"passwords": passwords}), headers={'Content-type':"application/json"})

    def multiple_random_passwords(self, request):
        passwords = []
        num = request.args.get('num')
        if num is not None and num != '':
            num = int(num)
        else:
            num = 10

        if num < 1 or num > 50:
            num = 10

        for i in range(0, num):
            passwords.append(''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10)))

        return Response(json.dumps({"passwords": passwords}), headers={'Content-type':"application/json"}, status_code=200)