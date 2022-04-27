from email import message
from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from matplotlib.cbook import print_cycles
from numpy import require, size
from db_info import DB_acc_info
import copy
from project2_exceptions import Error
import sys
import json
import tempfile
import shutil
import os

app = Flask(__name__)
api = Api(app)

db_addr = './DB/Project_2.db'
temp_dir = '/tmp/Project_2'

src_f = open(db_addr, 'rb')
dst_f = open(temp_dir, 'wb')
content = src_f.read()
s_file_size = src_f.name
file_size = dst_f.write(content)
src_f.close()
dst_f.close()

db_ac = None

class User_Login(Resource):
    def get(self):
        args = request.args
        db_ac = DB_acc_info(temp_dir)
        try:
            db_ac.user_login(args['u_id'], args['pw'])
        except:
            return {'message':'Login failed!', 'size': file_size, 'src': s_file_size}, 400   
        user_name = db_ac.get_user_name()
        user_role = db_ac.get_user_role()
        user_module = db_ac.get_module_list()
        user_function = db_ac.get_func_dic()
        try:
            db_ac.user_logout()
        except:
            return {'message':'Login failed!', 'size': file_size}, 400   
        return {'message':'Loged in', 'user_name': user_name, 'user_role': user_role, 
                'user_module': user_module, 'user_function':user_function}, 200

class Module_Function(Resource):
    def get(self, module_name, function_name):
        args = request.args
        db_ac = DB_acc_info(temp_dir)
        try:
            db_ac.user_login(args['u_id'], args['pw'])
        except:
            return {'message':'Login failed!'}, 400
        f_para = args.getlist('para')
        try:
            result = db_ac.run_module_func(module_name, function_name, f_para)
        except Error as err:
            return {'message': err.msg()}, 400
        db_ac.user_logout()
        return result

    
api.add_resource(User_Login, '/login')
api.add_resource(Module_Function, '/moduleFunction/<string:module_name>/<string:function_name>')

if __name__ == "__main__":
    db_ac = DB_acc_info(temp_dir)
    app.run(debug=True)