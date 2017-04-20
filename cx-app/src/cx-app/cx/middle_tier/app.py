# -*- coding: utf-8 -*-
import logging
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
    if not application.debug:
        # In production mode, add log handler to sys.stderr.
        application.logger.addHandler(logging.StreamHandler())
        application.logger.setLevel(logging.INFO)

@application.route('/<service_name>/<path:sub_url>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def home(service_name, sub_url):
    with open("services.json") as services_file:
        services = json.load(services_file)
        if service_name not in services:
            return jsonify({"error": "Incorrect service: {}".format(service_name)})
        else:
            base_url = services[service_name]["url"]
    url = base_url + "/" + sub_url
    application.logger.info('Url:{}'.format(url))

    headers = {key: value for (key, value) in request.headers if key != 'Host'}
    if request.method == "GET":
        req = requests.get(url, headers=headers, stream=True)
    elif request.method == "POST":
        req = requests.post(url, data=request.data, headers=headers, stream=True)
    elif request.method == "DELETE":
        req = requests.delete(url, data=request.data, headers=headers, stream=True)
    elif request.method == "PUT":
        req = requests.put(url, data=request.data, headers=headers, stream=True)
    elif request.method == "PATCH":
        req = requests.patch(url, data=request.data, headers=headers, stream=True)
    return Response(stream_with_context(req.iter_content()), content_type=req.headers['content-type'])

