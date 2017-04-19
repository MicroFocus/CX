import logging
from logging.handlers import RotatingFileHandler

from app import application
from reverse import ReverseProxied

if __name__ == "__main__":
    handler = RotatingFileHandler('/opt/logs/foo.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.INFO)
    application.logger.addHandler(handler)
    application.wsgi_app = ReverseProxied(application.wsgi_app)
    application.run()
