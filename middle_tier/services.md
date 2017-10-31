# Services.json

The [services.json](services.json) file controls the middle tier.  It is the place where you add custom REST endpoints and configure security settings.

##Using the middle tier as a proxy server

The middle tier can act as a proxy server to avoid the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) restrictions.  This makes it possible to call REST endpoints on other servers.  

Proxy endpoints look like this:

```
{
  "id": "myendpoint",
  "name": "My Endpoint",
  "description": "This is my endpoint",
  "proxy": {
    "listen_path": "/myendpoint/",
    "target_url": "http://some_other_server/some_other_endpoint"
  }
}
```

 * `id` - The ID of the endpoint.  This my be unique in the `services.json` file.
 * `name` - The name of the endpoint.
 * `description` - The description of this endpoint.
 * `proxy` - This section defines the endpoint you are proxying.
    * `listen_path` - Is the path of your endpoint.  This endpoint will be available at the url `/api/myendpoint`.
    * `target_url` - This is the URL the endpoint will connect to at the remote server.

##Adding custom REST endpoints

The middle tier also supports custom REST endpoints in CX.  Custom REST endpoints, also called virtual endpoints, are a place where you can write your own code that runs on the middle tier.  

Custom REST endpoints are defined like this:

```
{
  "id": "mycustomendpoint",
  "name": "My custom REST endpoint",
  "description": "",
  "virtual": [
    {
      "response_function_name": "MyCustomResource.get_custom_data",
      "function_source_uri": "plugins.myendpoints.myendpoint",
      "path": "list",
      "method": "GET"
    }
  ],
  "proxy": {
    "listen_path": "/custom/"
  }
}
```

They point to a Python file that implements the REST endpoint like this:

```python
import json

import logging

from proxy.response import Response
from resources.base import Resource


log = logging.getLogger(__name__)

"""
This is my custom REST endpoint.
"""
class MyCustomResource(Resource):
    def __init__(self, service):
        super().__init__(service)

    """
    This is the implementation of my endpoint
    """
    def get_custom_data(self, request):
        data = []
        
        #This is a great place to write some custom code
                
        return Response(json.dumps(data), headers={'Content-type': 'application/json'})
```

In the `services.json` file the endpoint values are:

 * `id` - The ID of the endpoint.  This my be unique in the `services.json` file.
 * `name` - The name of the endpoint.
 * `description` - The description of this endpoint.
 * `virtual` - This array contains the set of virtual REST endpoints.  It can contain multiple entries.
	 * 	`response_function_name` - The name of the class and function that will be called when this endpoint is invoked.  In this case the middle tier will call a function called `get_custom_data` in the class `MyCustomResource`.
	 *  `function_source_uri` - Defines the path to the file containing the Python implementation of the endpoint.  If you created a your custom endpoint in the `middle_tier/plugins/myendpoints` folder and named it `myendpoint.py` then the source URI would be `plugins.myendpoints.myendpoint`.  
	 *  `path` - This is the path of the endpoint within the space of this entire entry.  For this example our final URL would be `/api/custom/list'.
	 *  `method` - This defines the HTTP method of the REST endpoint.  This can be `GET`, `PUT`, `POST`, or `DELETE`.
 *  `list_path` - The listen path defines the path for the entire set of REST endpoints in entry.  In this case the REST endpoints would use the URL `/api/custom/<specific endpoint entry>`.
