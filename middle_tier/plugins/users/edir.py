import json

import logging
from ldap3 import Server, Connection

from proxy.response import Response
from resources.base import Resource


log = logging.getLogger(__name__)

class EDirUsersResource(Resource):
    def __init__(self, service):
        super().__init__(service)

    def create_user(self, request):
        log.info("Create user body:{}".format(request.data))
        data = json.loads(request.data)
        username = data["name"]
        print('username: ' + username)
        
        server = Server('10.120.46.80')
        conn = Connection(server, "cn=zgrossbart,ou=services,o=corp", "N0v3ll123")
        conn.bind()
        attrs = {}
        attrs['cn'] = 'zacktest'
        attrs['sn'] = 'Zack\'s test user'
#        attrs['userPassword'] = 'aDifferentSecret'
        attrs['fullName'] = 'A test user from Zack'
        attrs['givenName'] = 'Zack'
#        attrs['Language'] = 'ENGLISH'
        attrs['description'] = 'This is a user Zack created from Python'
#        attrs['passwordAllowChange'] = 'TRUE'
        dn = "cn=zacktest,ou=SA,ou=CanadaLife,o=corp"
        result = conn.add(dn, ','.join(['inetOrgPerson']), attrs)
        
        if result:
            return Response(json.dumps({"result": True}), headers={'Content-type': 'application/json'})
            
        log.error('Failed to add user: {}'.format(conn.result))
        return Response(json.dumps({"result": False, "error": conn.result}),
                        headers={'Content-type': 'application/json'}, status_code=500)
