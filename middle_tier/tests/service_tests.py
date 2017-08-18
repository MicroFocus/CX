import json
import unittest

from services.service import Service


class TestService(unittest.TestCase):
    CONFIG1 = """
    {
  "id": "sspr",
  "name": "SSPR service wrapper",
  "description": "",
  "version_data": {
    "versions": {
      "Default": {
      }
    }
  },
  "proxy": {
    "listen_path": "/test/",
    "target_url": "http://httpbin.org/"
  }
}"""

    CONFIG2 = """
        {
      "id": "sspr",
      "name": "SSPR service wrapper",
      "description": "",
      "version_data": {
        "versions": {
          "Default": {
          }
        }
      },
      "proxy": {
        "listen_path": "/test/[\\\\d]+",
        "target_url": "http://httpbin.org/"
      }
    }"""

    def test_can_handle(self):
        service = Service(json.loads(self.CONFIG1))
        self.assertTrue(service.can_handle('/test/my'))

    def test_can_handle2(self):
        service = Service(json.loads(self.CONFIG2))
        self.assertFalse(service.can_handle('/test/as'))
        self.assertTrue(service.can_handle('/test/12'))
