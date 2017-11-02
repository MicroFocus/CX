from werkzeug.contrib.cache import RedisCache


def get_cache():
    return RedisCache('redis')