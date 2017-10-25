import json

import logging
from ldap3 import Server, Connection, ALL

from proxy.response import Response
from resources.base import Resource


log = logging.getLogger(__name__)

"""
This service is a temporary stop gap for creating users in eDirectory.  It
connects to one specific eDirectory and creates a single user.  This service
is just a proof of concept and shouldn't be used in production.
"""
class EDirUsersResource(Resource):
    def __init__(self, service):
        super().__init__(service)

    def create_user(self, request):
        log.info("Create user body:{}".format(request.data))
        data = json.loads(request.data)        
        
        server = Server('10.120.46.80')
        conn = Connection(server, "cn=zgrossbart,ou=services,o=corp", "N0v3ll123")
        conn.bind()
        
        cn = data["fName"].replace(" ", "").lower() + data["sName"].lower()[0]
        attrs = {}
        attrs['cn'] = cn
        attrs['sn'] = data["sName"]
        attrs['userPassword'] = data["password"]
        attrs['clDoB'] = data["birthDate"]
        attrs['mail'] = data["email"]
        attrs['postalCode'] = data["postalCode"]
        attrs['fullName'] = data["fName"] + ' ' + data["sName"]
        attrs['givenName'] = data["fName"]
        attrs['description'] = data["description"]
        dn = "cn=" + cn + ",ou=SA,ou=cx,o=corp"
        result = conn.add(dn, ['User', 'clCustomer'], attrs)
        
        if result:
            return Response(json.dumps({"result": True}), headers={'Content-type': 'application/json'})
            
        log.error('Failed to add user: {}'.format(conn.result))
        return Response(json.dumps({"result": False, "error": conn.result}),
                        headers={'Content-type': 'application/json'}, status_code=500)
                        
    def read_users(self, request):
        server = Server('coalmine.qalab.cam.novell.com', get_info=ALL)
        conn = Connection(server, "cn=admin,ou=sa,o=system", "test", auto_bind=True)
        
        conn.search('ou=users,o=data', '(objectClass=Person)', attributes=['dn', 'cn', 'givenName', 'sn'])
        
        data = []
        for entry in conn.entries:            
            user = {}
            user['cn'] = '{}'.format(entry['cn'])
            user['sn'] = '{}'.format(entry['sn'])
            user['givenName'] = '{}'.format(entry['givenName'])
            data.append(user)
            
        return Response(json.dumps(data), headers={'Content-type': 'application/json'})

        
        
        
