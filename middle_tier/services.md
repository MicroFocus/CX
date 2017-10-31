# Services.json

The [services.json](services.json) file controls the middle tier.  It's the place where you add custom REST endpoints and configure security settings.

> Note:  The `services.json` file is one of the rare places where the middle tier can't pick up changes dynamically in development mode.  **You must restart the Docker container to pick up changes in the `services.json` file.**

## Using the middle tier as a proxy server

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

 * `id` - The ID of the endpoint.  This must be unique in the `services.json` file.
 * `name` - The name of the endpoint.
 * `description` - The description of this endpoint.
 * `proxy` - This section defines the endpoint you are proxying.
    * `listen_path` - Is the path of your endpoint.  This endpoint will be available at the url `/api/myendpoint`.
    * `target_url` - This is the URL the endpoint will connect to at the remote server.

## Adding custom REST endpoints

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

In the `services.json` file the properties for a custom REST endpoint are:

 * `id` - The ID of the endpoint.  This must be unique in the `services.json` file.
 * `name` - The name of the endpoint.
 * `description` - The description of this endpoint.
 * `virtual` - This array contains the set of virtual REST endpoints.  It can contain multiple entries.
	 * 	`response_function_name` - The name of the class and function that will be called when this endpoint is invoked.  In this case the middle tier will call a function called `get_custom_data` in the class `MyCustomResource`.
	 *  `function_source_uri` - Defines the path to the file containing the Python implementation of the endpoint.  If you created your custom endpoint in the `middle_tier/plugins/myendpoints` folder and named it `myendpoint.py` then the source URI would be `plugins.myendpoints.myendpoint`.  
	 *  `path` - This is the path of the endpoint within the space of this entry.  For this example our final URL would be `/api/custom/list`.  It is `api` because all REST endpoints end up under `api`, `custom` because that is the list path of this set of endpoints, and `list` because that is the path of this specific endpoint.
	 *  `method` - This defines the HTTP method of the REST endpoint.  This can be `GET`, `PUT`, `POST`, or `DELETE`.
 *  `list_path` - The listen path defines the path for the entire set of REST endpoints in entry.  In this case the REST endpoints would use the URL `/api/custom/<specific endpoint entry>`.

## Using security in the middle tier
 
 The middle tier has the ability to use Micro Focus OSP as a security provider.  This enables single sign on and validates tokens before calling custom REST endpoints.  In essence it makes sure that you always have a valid token before executing any code in custom REST endpoints. 
 
### Setting up the OSP configuration 
 
 The [token validation](../token-validation) sample project has an example of setting this up.  
 
 The first step to configuring security is to configure the `auth` section in the `services.json` file like this:
 
 ```
 "auth": [
    {
      "id": "osp",
      "type": "custom_key",
      "auth_header_name": "Authorization",
      "use_param": false,
      "param_name": null,
      "use_cookie": false,
      "cookie_name": null,
      "cache_time": 120,
      "data": {
        "response_function_name": "OSPProxy.check",
        "function_source_uri": "plugins.osp.osp_security_proxy",
        "username": "cx",
        "password": "secret",
        "app": "idm",
        "target_url": "http://192.168.0.76:8080"
      }
    }
  ]
```

The  first set of properties including the `id`, `type`, `auth_header_name`, `user_param`, `param_name`, `user_cookie`, and `cookie_name` properties are just added for supporting other authentication providers in a future release.  Right now the middle tier only supports Micro Focus OSP and you shouldn't change those properties.

 * `cache_time` - This property controls the length of the token cache.  This indicates how long the middle tier will consider a token valid until it queries OSP to re-validate the token.  The value is in seconds.  
 * `data` - This section defines the implementation of the security proxy.
	 * `response_function_name` - This property points to the default implementation of the OSP integration.  You should only change this if you want to use a custom implementation.
	 * `function_source_uri` - This property points to the file containing the default implementation of the OSP integration.  You should only change this if you want to use a custom implementation.
	 * `username` - This is the client ID of your SSO client.  You should change this to use an SSO client configured in your OSP server.
	 * `password` - This is the client secret of your SSO client.  You should change this to use an SSO client configured in your OSP server.
	 * `app` - This is the name of the SSO application configured in your OSP server
	 * `target_url` - This is the location of your OSP server.  

### Securing individual endpoints

Once you have configured the OSP connection you are ready to add security to individual endpoints.

From our previous example you can just add the `auth` property to the REST endpoint definition like this:

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
  },
  "auth": "osp"
}
```

This configuration will take the default OSP configuration to validate tokens.  
