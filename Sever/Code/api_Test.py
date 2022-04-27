import requests
import json

BASE = "http://127.0.0.1:5000/"

response = requests.get(BASE + "login", {'u_id': 1, 'pw': 'admin'
                                                                                ,'para': [111]})

response = requests.get(BASE + "moduleFunction/Administrative/Add User", {'u_id': 1, 'pw': 'admin'
                                                                                ,'para': ['ddd', 'aaaa', 0, 0, 0, 'pw']})
print(response.json())


