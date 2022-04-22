import requests
import json

BASE = "http://127.0.0.1:5000/"

response = requests.get(BASE + "login", {'u_id': 1, 'pw': 'aadmin'
                                                                                ,'para': [111, 123123]})
print(response.json())


