from app import application
from utils.reverse import ReverseProxied

if __name__ == "__main__":
    application.wsgi_app = ReverseProxied(application.wsgi_app)
    application.run()
