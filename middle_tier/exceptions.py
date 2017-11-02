class MiddleTierException(Exception):
    def __init__(self, *args, **kwargs):
        self.code = kwargs.get("code", 400)
