from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from matplotlib.cbook import print_cycles
from numpy import require
from db_info import DB_acc_info
import copy
from project2_exceptions import Error
import sys
import json

app = Flask(__name__)
api = Api(app)

db_addr = './DB/Project_2.db'

db_ac = None

class User_Login(Resource):
    def get(self):
        args = request.args
        db_ac = DB_acc_info(db_addr)
        try:
            db_ac.user_login(args['u_id'], args['pw'])
        except:
            return {'message':'Login failed!'}, 400
        user_name = db_ac.get_user_name()
        user_role = db_ac.get_user_role()
        user_module = db_ac.get_module_list()
        user_function = db_ac.get_func_dic()
        db_ac.user_logout()
        return {'message':'Loged in', 'user_name': user_name, 'user_role': user_role, 
                'user_module': user_module, 'user_function':user_function}, 200

class Module_Function(Resource):
    def get(self, module_name, function_name):
        args = request.args
        db_ac = DB_acc_info(db_addr)
        try:
            db_ac.user_login(args['u_id'], args['pw'])
        except:
            return {'message':'Login failed!'}, 400
        f_para = copy.deepcopy(args['para'])
        try:
            result = db_ac.run_module_func(module_name, function_name, f_para)
        except Error as err:
            return {'message': err.msg()}, 400
        db_ac.user_logout()
        return result

    
api.add_resource(User_Login, '/login')
api.add_resource(Module_Function, '/moduleFunction/<string:module_name>/<string:function_name>')

if __name__ == "__main__":
    if len(sys.argv) > 1:
        db_addr = sys.argv[1]
    db_ac = DB_acc_info(db_addr)
    app.run(debug=True)