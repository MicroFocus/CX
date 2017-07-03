class Response:
    def __init__(self, content, headers, status_code=200):
        self.status_code = status_code
        self.headers = headers
        self.content = content
