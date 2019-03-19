# -*- coding: utf-8 -*-
import logging
from logging.handlers import RotatingFileHandler

import flask
from flask import Flask, jsonify

from exceptions import MiddleTierException
from proxy.request import Request
from security import UnauthorizedSecurityException
from services.loader import ServiceLoader, NotFoundServiceException
from utils.reverse import ReverseProxied

application = Flask(__name__)
application.wsgi_app = ReverseProxied(application.wsgi_app)
from flask import request

loader = None


@application.before_first_request
def setup_logging():
    handler = RotatingFileHandler('/opt/logs/middle_tier.log', maxBytes=1024 * 1024 * 20, backupCount=10)
    handler.setLevel(logging.INFO)
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.DEBUG)
    stream_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s '
        '[in %(pathname)s:%(lineno)d]'
    ))
    application.logger.addHandler(handler)
    application.logger.addHandler(stream_handler)
    application.logger.setLevel(logging.DEBUG)
    logger = logging.getLogger()
    logger.addHandler(handler)
    logger.addHandler(stream_handler)
    logger.setLevel(logging.DEBUG)


@application.before_first_request
def startup():
    global loader
    loader = ServiceLoader()
    loader.load()


@application.errorhandler(500)
def internal_server_error(error):
    application.logger.error('Server Error: %s', error)
    return jsonify({"error": "{}".format(str(error))}), 500


@application.errorhandler(404)
def internal_server_error(error):
    application.logger.error('Not found: %s', error)
    return jsonify({"error": "{}".format(str(error))}), 404


@application.errorhandler(MiddleTierException)
def unhandled_app_exception(e):
    application.logger.exception('Application exception: %s status', e.code)
    return jsonify({"error": "{}".format(str(e))}), e.code


@application.errorhandler(Exception)
def unhandled_exception(e):
    application.logger.exception('Unhandled Exception')
    return jsonify({"error": "{}".format(str(e))}), 500


@application.route('/<service_name>/<path:sub_url>', methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
@application.route('/<service_name>/', defaults={'sub_url': ''}, methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'])
def home(service_name, sub_url):
    global loader
    url = "/" + service_name + "/" + sub_url + "?"+ request.query_string.decode("utf-8")
    service_request = Request(url, request.method, request.args, request.headers, request.get_data(as_text=True))
    service = loader.find_service(service_request)
    application.logger.debug("Service: %s", str(service))
    if service:
        response = service.handle(service_request)
        resp = flask.Response(response.content)
        for key, value in response.headers.items():
            if key not in ["Content-Length", "Content-Encoding", "Transfer-Encoding"]:
                resp.headers[key] = value
        return resp, response.status_code
    else:
        raise NotFoundServiceException("There is not suitable handler")


if __name__ == '__main__':
    application.run(debug=True, host='0.0.0.0')
