# -*- coding: utf-8 -*-
import logging
from logging.handlers import RotatingFileHandler

from flask import Flask, jsonify
from flask import json

from reverse import ReverseProxied

application = Flask(__name__)
application.wsgi_app = ReverseProxied(application.wsgi_app)
from flask import Response
from flask import stream_with_context
from flask import request
import requests


@application.before_first_request
def setup_logging():
    handler = RotatingFileHandler('/opt/logs/middle_tier.log', maxBytes=1024 * 1024 * 20, backupCount=10)
    handler.setLevel(logging.INFO)
    application.logger.addHandler(handler)
    if not application.debug:
        # In production mode, add log handler to sys.stderr.
        application.logger.addHandler(logging.StreamHandler())
        application.logger.setLevel(logging.INFO)


@application.errorhandler(500)
def internal_server_error(error):
    application.logger.error('Server Error: %s', (error))
    return jsonify({"error": "Error: {}".format(str(error))})


@application.errorhandler(Exception)
def unhandled_exception(e):
    application.logger.error('Unhandled Exception: %s', (e))
    return jsonify({"error": "Error: {}".format(str(e))})


class IncorrectService(Exception):
    pass


class IncorrectMethod(Exception):
    pass


def send_request(url, method, request_headers, stream=True):
    headers = {key: value for (key, value) in request_headers if key != 'Host'}
    if method == "GET":
        req = requests.get(url, headers=headers, stream=stream, verify=False)
    elif method == "POST":
        req = requests.post(url, data=request.data, headers=headers, stream=stream, verify=False)
    elif method == "DELETE":
        req = requests.delete(url, data=request.data, headers=headers, stream=stream, verify=False)
    elif method == "PUT":
        req = requests.put(url, data=request.data, headers=headers, stream=stream, verify=False)
    elif method == "PATCH":
        req = requests.patch(url, data=request.data, headers=headers, stream=stream, verify=False)
    else:
        raise IncorrectMethod("Incorrect method: {}".format(request.method))
    req.raise_for_status()
    return req


def get_base_url(service_name):
    base_url = None
    with open("services.json") as services_file:
        services = json.load(services_file)
        if service_name not in services:
            raise Exception("Incorrect service: {}".format(service_name))
        else:
            base_url = services[service_name]["url"]
    return base_url


@application.route('/<service_name>/<path:sub_url>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
@application.route('/<service_name>/', defaults={'sub_url': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def home(service_name, sub_url):
    base_url = get_base_url(service_name)
    url = base_url + "/" + sub_url
    req = send_request(url, request.method, request.headers)
    return Response(stream_with_context(req.iter_content()), content_type=req.headers['content-type'])


@application.route('/registration/randompassword_n', methods=['GET'])
def sspr_random_password():
    url = get_base_url("registration") + "/randompassword"
    passwords = []

    num = request.args.get('num')
    if num is not None and num != '':
        num = int(num)
    else:
        num = 10

    if num < 1 or num > 50:
        num = 10

    for i in range(0, num):
        r = send_request(url, request.method, request.headers, stream=False)
        passwords.append(r.text)

    return jsonify({"passwords": passwords})


if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')
