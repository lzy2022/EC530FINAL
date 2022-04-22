import requests
import json

BASE = "https://ec530final.ue.r.appspot.com/"

response = requests.get(BASE + "moduleFunction/Chat/View Your Message", {'u_id': 1, 'pw': 'admin'
                                                                                ,'para': [111]})
print(response.json())

response = requests.get(BASE + "moduleFunction/Chat/View Group Message", {'u_id': 1, 'pw': 'admin'
                                                                                ,'para': [123]})
print(response.json())

