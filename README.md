# EC530_Final_Project
## Intro
This repository contains a fully-implemented sever and clent app of the previous Project_2 (the "patient connect" sever & front-end app). The front-end application is built using **React-NativeThe**. Final project also integrate Project_4, the sound to text sever. A functioning back-end sever has already been deployed for both of sever-end application (deployed on Google Cloud). User can download the android-app package and loging to the patient connect services.

 [Github Structure](#Github-Structure)
 
 [Setting up Back-end Sever](#Setting-up-Back-end-Sever)
 
 [About Front-end Client APP, User manual](#Client-UI-User-Manual)
 
 [----Intro to Client Application](#Setting-up-Back-end-Sever)
 
 [----Setting Up User Account](#Intro-to-Client-Application)
 
 [----Function Pages](#Function-Pages)
 
 [--------Administrative Module](#Administrative-Add-User)
 
 [--------Device Module](#Device-Add-Device)
 
 [--------Chat Module](#Chat-Create-Chat-Group)
 
 [About Sound To Text Sever, RESTful API & Request Formates](#Speech-To-Text-Functions-of-RESTful-API-and-Request-Formates)
 
 [----Post Speech File](#Post-Speech-File)
 
 [----Get Task State](#Get-Task-State)
 
 [----Get Task Result](#Get-Task-Result)
 
 [----Session Examples](#Session-Examples)
 
 [About Database Sever, RESTful API & Request Formates](#Database-Structure)
 
 [----Database Structure](#Database-Structure)
 
 [----Functions of RESTful API and Request Formates](#Database-Functions-of-RESTful-API-and-Request-Formates)
 
 [--------Login Request](#Login-Request)
 
 [--------Function Request](#Function-Request)
 
 [--------Administrative Module](#Administrative-Module)
 
 [--------Device Module](#Device-Module)
 
 [--------Chat Module](#Chat-Module)
 
 [-----Session Examples Database](#Session-Examples-Database)
 
 

## Github Structure
### Top Level
    - .github
    - **Client_Code (*The Main Body of the Project, contients the front-end application)**
    - **Sever (*The Main Body of the Project, contients the front-end application)**
    - **Sound2Text_Sever (*The Main Body of the Project, contients the front-end application)**
    - Flake8_Styles
    - Images
    - requirements.txt
    - README.md
#### Client_Code 
Client Code is built using React Native, the library of React Native is not uploaded to this repositry due to the size of the library. To built the app locally, download all the files under EC530FINAL/Client_Code/CodePart/, setting up a React Native project locally, down load all the package required listed in modules_added.txt, and paste all the files under EC530FINAL/Client_Code/CodePart/ to the local React Native project folder. A downloadable Android package is also included.

    - CodePart
      Main body of the React Native application, not including the system's library, needed to be pasted into a pre-built React Native project.
    - modules_added.txt
      Configuration of the React Native project, need to download all the packages required before building the project loaclly. 
          
#### Sever/Code
  This folder contains the main back-end application of the project. The sever is built using RESTful API and manage all the sever-end data base, including users' info, device info and all chat messages. New data base can be set-up running the **db_setup.py**.

    - main.py
      main.py contains the main function of the API. This file is used to launch the back-end server
     
    - db_info.py
      db_info.py contains the object managing database information & user information. 
  
    - db_setup.py
      db_setup.py would download a database framework of this project. This module is used in the back-end server setup process
  
    - module_func.py
      module_func.py implements functions users can call to interact with the database
     
    - project2_exceptions.py
      project2_exceptions.py contains the exceptions that would raise by the back-end server
  
    - DB
      Contains the data base file of the back-end application. Managing users' info, device info and all chat messages.
      
#### Sound2Text_Sever
This RESTful API is designed and powered uing google cloud sever. When posting http request with speech file, please encode the speech file as '.wav' with sample rate = 16000Hz and single track. Client application would activate local mic and upload a .wav file to this sever and recieve the converted text string.

    - main.py
          main.py contains the main function of the API. This file is used to launch the back-end server
    - app.yaml
          Config info for google cloud sever
    - requirements.txt
          Config info for google cloud sever
    - This_is_a_test.wav
          A test speech file
    - API_test.py
          A test session
  
## Setting up Back-end Sever
The back end severs are designed for google cloud. To set up the severs (Both database & sound2text), just run the following line in the Code folder (EC530FINAL/Sever/Code/ or EC530FINAL/Sound2Text_Sever/Code/):
        gcloud app deploy

The google cloud sever should have the following APIs enabled:

        google cloud speech to text API
        google-api-python-client
        google-cloud-tasks==2.7.1
        
## Client UI User Manual

### Intro to Client Application
This application is built using ReactNative and tested for Android. It provides users access to the database functions according to their account's role. There are three main modules: Administrative, Device and Chat. Different roles have different accessible functions, shown in the chart below:

      - Role: Admin
            Administrative:
                 1. Add User
                 2. Change User Role 
                 3. Delete User Info
                 4. Get User List
            Device:
                 1. Add Device
                 2. Add Device Parameter
                 3. Check Device Parameter
                 4. Assign Device 
                 5. Clear Device Parameter
                 6. Get Device List
            Chat: 
                 1. Create Chat Group
                 2. Add User to Chat Group
                 3. Remove User from Chat Group
                 4. Send Message
                 5. View Your Message
                 6. View Group Message
                 7. Get Group List

      - Role: Doctor
            Administrative:
                 1. Get User List
            Device:
                 1. Assign Device 
                 2. View Patient Test Records
                 3. Check Device Parameter
                 4. Upload Test Record
                 5. Get Device List
            Chat: 
                 1. Create Chat Group
                 2. Add User to Chat Group
                 3. Remove User from Chat Group
                 4. Send Message
                 5. View Your Message
                 6. View Group Message
                 7. Get Group List

      - Role: Patient
            Administrative:
                 1. Get User List
            Device:
                 1. Upload Test Record
                 2. View Your Test Records
                 3. Check Device Parameter
                 4. Get Device List
            Chat: 
                 1. Create Chat Group
                 2. Add User to Chat Group
                 3. Remove User from Chat Group
                 4. Send Message
                 5. View Your Message
                 6. View Group Message
                 7. Get Group List
                 
### Function Pages:
#### 1. Login Page
This page is the first page opened in the client APP. User can login using their user account & password. 
There is a default admin acount:

      user id: 1
      password: admin
      
All other account must be created by Admin account (accounts with role 'Admin', not necessary the acount with ID=1). Admin account can create account using the Add User function under the Administrative module and assign roles to new accounts using Change User Role function.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/1.PNG" width="30%" height="30%">

#### 2. Main Page
The following three page is the main pages corresponding to the 3 modules (Administrative/Device/Chat). Each page contains all the functions accessible by the current user (according to the user's role. Users can seek to different modules using the rendering box at the bottom of the page.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2.PNG" width="30%" height="30%">
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2_2.PNG" width="30%" height="30%">
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2_3.PNG" width="30%" height="30%">

#### 3. Search Page
The search page would be activated when the user click on "Search for User/Device/Group" buttons. Search result will be automatically filled when user click on the search tags. User can also call the search page through the function tag Get User/Device/Group List

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/Search.PNG" width="30%" height="30%">

#### 4. Administrative - Add User
This function is accessible only for users with 'Admin' role tag. All accounts (except ID=1) needed to be created through this function. New accounts initially have no role tag. To assign roles to new accounts, use Administrative - Change User Role.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/3.PNG" width="30%" height="30%">

#### 5. Administrative - Change User Role

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/4.PNG" width="30%" height="30%">

#### 6. Administrative - Delete User Info

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/5.PNG" width="30%" height="30%">

#### 7. Administrative - Get User List

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/Search.PNG" width="30%" height="30%">

#### 8. Device - Add Device
This function would create a new device. New device initially have no parameter. To assign parameters to devices, use Add Device Parameter / Device - Clear Device Parameter

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/6.PNG" width="30%" height="30%">

#### 9. Device - Get Device List

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/20.PNG" width="30%" height="30%">

#### 10. Device - Check Device Parameter
This page would return all avaliable parameters of a device.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/8.PNG" width="30%" height="30%">

#### 11. Device - Clear Device Parameter
This page would clear all the parameters current assigned to the device

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/10.PNG" width="30%" height="30%">

#### 12. Device - Add Device Parameter
This page would add a new paramter to the device, using parameter's name & unit

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/7.PNG" width="30%" height="30%">

#### 13. Device - Assign Device
This page would assign the device to a specific patient so that the patient can later upload thier test record refering this device.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/9.PNG" width="30%" height="30%">

#### 14. Device - Upload Test Record
This page is accessible both by Patient & Docter. *Patient can only upload test result for themselves, while Doctor accounts can upload result for any patient account. Test results can only refer to devices that are assigned to the current account (for Doctor account, the patient he/she is uploading result for should have access the device).

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/17.PNG" width="30%" height="30%">

#### 15. Device - View Patient Test Records
This page is accessible by Doctor. He/She can view any Patient's test results.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/19.PNG" width="30%" height="30%">

#### 16. Device - View Your Test Records
This page is accessible by Patient. Patients can only view their own test results.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/18.PNG" width="30%" height="30%">

#### 17. Chat - Create Chat Group
This page can create chat group using group ID & group name. The user who create the group would be the automatically added into the group as a initial member.

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/11.PNG" width="30%" height="30%">

#### 18. Chat - Add User to Chat Group
This page can add new user to the chat group. The user who add the other user must already be a member of the group

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/12.PNG" width="30%" height="30%">

#### 19. Chat - Remove User from Chat Group
This page can remove user from the chat group. The user who remove the other user must already be a member of the group

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/13.PNG" width="30%" height="30%">

#### 20. Chat - Send Message
This page can send individual chat message to other users (not group chat)

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/14.PNG" width="30%" height="30%">

#### 21. Chat - View Your Message
This page can view all the individual chat messages sent to the current account (not group chat)

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/15.PNG" width="30%" height="30%">

#### 22. Chat - View Group Message
This page show all the group chat messages. User can send / view messages in the chat groups which they have access to

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/21.PNG" width="30%" height="30%">

#### 23. Chat - Get Group List

<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/22.PNG" width="30%" height="30%">

## Speech To Text Functions of RESTful API and Request Formates
The following parts contain formates and functions that can be called from the front-end side using http requests. Users need to import the following python modules:

        import requests
        import json
        
### Post Speech File
The address to post the file is [http://'sever_address'/s2t/]. Posting a speech file can be done using the following request: 

        BASE = "http://ec530pj4.uk.r.appspot.com/"
        # speech file should have sample rate = 16000 and single track
        with open([Speech File Location], 'rb') as s_file: 
          response = requests.post(BASE + "s2t/" + '[any digit]', files={'file': s_file})
        
[response] containse a dictionary with key = {'task_id'}. task_id is the sever-side queued task id created for this post request, user can use task_id to track the completion states of the task and request for the task result.

### Get Task State
The address to get task state is [http://'sever_address'/task_state/].

        BASE = "http://ec530pj4.uk.r.appspot.com/"
        response = requests.get(BASE + "task_state/" + str([task_id]))
        
[response] containse a dictionary with key = {'task_id', 'task_state'}. task_state can have the following value, representing different states of the task:
        0: Free to start
        1: Working
        2: Completed
        
### Get Task Result
The address to get task result is [http://'sever_address'/s2t/[task_id]]. [task_id] is the queued task id of the previous post request:

        BASE = "http://ec530pj4.uk.r.appspot.com/"
        response = requests.get(BASE + "s2t/" + str([task_id]))
        
[response] containse a dictionary with key = {'result'}. [result] is converted text message.
                                                                                        
### Session Examples
The first step is to download the database framework using the module [db_setup.py], the downloaded framework is named [Example_db.db]. The example then sets up a local sever connected to []Example_db.db and open the default python http port :5000, the address of the sever is http://127.0.0.1:5000/
![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX1.PNG)

## Database Structure
#### users:
        Contains user_id, user's first/last name, birth date, account creating date
#### user_pw:
        Contains user_id, user's login password
#### roles:
        Contains the list of user's roles in this database, now supporting [Admin], [Doctor], [Nurse] and [Patient]
#### user_role:
        Contains user_id and the corresponding role name. A user can have more than 1 role.
#### modules:
        Contains module_id and module_name of the modules, now supporting [Administrative], [Device] and [Chat]
#### role_module:
        Log different roles' accessibility to each module 
#### role_module_func:
        Log different roles' accessibility to each function (functions implemented in S2022_EC530_Project2/Code/module_func.py)
#### device:
        Contains device_id, device_name, created date and maker information
#### device_maker:
        Contains device maker's information
#### device_parameter:
        Contains acceptable parameters of different devices (device can have more than 1 parameter)
#### device_user:
        Log user's accessibility to different device (match user_id & device_id)
#### record:
        Log user's device record (created date, device_id, user_id, special comments). Record entries/data are in another chart 
#### record_entries:
        Match record_id and record_entries (parameter_name, data & unit). Record may have more than 1 entries
#### chat_group:
        Contains users accessibility to different group chat (user_id & group_id)
#### chat_msg:
        Log chat messages (sender_user_id, receiver_user_id, receiver_group_id)
        
## Database - Functions of RESTful API and Request Formates
The following parts contain formates and functions that can be called from the front-end side using http requests. Users need to import the following python modules:

        import requests
        import json
        
### Login Request
Back-end RESTful API implimentation of the Login Request:

        login_args = reqparse.RequestParser()
        login_args.add_argument("u_id", type=int, help="Need user ID", required=True)
        login_args.add_argument("pw", type=str, help="Need password", required=True)

        class User_Login(Resource):
            def get(self):
                db_ac = DB_acc_info(db_addr)
                args = login_args.parse_args()
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
                        
        api.add_resource(User_Login, '/login')
                        
http login request can be done using the following request: 

        BASE = "http://127.0.0.1:5000/"
        response = requests.get(BASE + "login", {'u_id': [user_id], 'pw': [user_password]})
        
[response] containse the essential information for the front-end to intialize the local session, including user's first/last name, role, accessibility to modules and functions.

### Function Request
Back-end RESTful API implimentation of the function requests (interact with the Database):

        m_f_args = reqparse.RequestParser()
        m_f_args.add_argument("u_id", type=int, help="Need user ID", required=True)
        m_f_args.add_argument("pw", type=str, help="Need password", required=True)
        m_f_args.add_argument("para", help="Need module name", action="append")

        class Module_Function(Resource):
            def get(self, module_name, function_name):
                db_ac = DB_acc_info(db_addr)
                args = m_f_args.parse_args()
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

        api.add_resource(Module_Function, '/moduleFunction/<string:module_name>/<string:function_name>')

All the functions interact with the databse can use the following request formate:
 
        BASE = "http://127.0.0.1:5000/"
        response = requests.get(BASE + "moduleFunction/[module_name]/[function_name]", {'u_id': [user_id], 'pw': [user_password]
                                                                                        ,'para': [list_of_parameters_passed_to_function]})
                                                                                        
For example, to create a new user with name [First Last], birth date [1/1/1000] and password set to be ['PW1'], use the following request:

        response = requests.get(BASE + "moduleFunction/Administrative/Add User", {'u_id': 1, 'pw': 'admin'
                                                                                        ,'para': ['First', 'Last', 1000, 1, 1, 'PW1']})
                                                                                
To access the function [Add User] in module [Administrative], we need a user account with role [Admin], in the example I use the default admin account with user_id = 1, pw = 'admin'. 'para' contains the parameters passed to the function [Add User] and create a new account.

All the available functions are implemented in S2022_EC530_Project2/Code/module_func.py, fowlloing are the module/function names and the required parameters for each function. Accessibility of different roles to the functions can be modified using the [role_module_func] table in the database. 
                                              
### Administrative Module
#### 1. moduleFunction/Administrative/Add User
This function would create a new user account with the given parametes. The new account created would have no role information by default. To assign role information to the new account, use the function [moduleFunction/Administrative/Change User Role]. New account would be automatically assigned a user_id. To view the new user_id of the account created, use the function [moduleFunction/Administrative/Get User List].

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Administrative/Add User", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[New_First_name], [New_last_name], [New_birthdate_y], [New_birthdate_m], [New_birthdate_d], [New_pass_word]]})
                                                                                        
#### 2. moduleFunction/Administrative/Change User Role
This function would add a new role to an existing user account. Now supporting 4 possible roles: [Admin], [Doctor], [Nurse], [Patient]. 

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Administrative/Change User Role", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id_assigning], [role_name]]})
 
#### 3. moduleFunction/Administrative/Delete User Info
This function would delete an existing user account. All the related information including device record and user_id would be removed from the database (group messages would be kept)

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Administrative/Delete User Info", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id_deleting]]})

#### 4. moduleFunction/Administrative/Get User List
This function would return a list of users as response, including all the user_id and the corresponding first/last names and role information. Front-end can refer to the user list and implement a search function to look for specific user and his/her user_id. 

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Administrative/Get User List", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': []})
                                                                                        
                                                                                        
### Device Module
#### 1. moduleFunction/Device/Add Device
This function would create a new device information in the database. The created device would contains [device_id](auto-assigned), [device_name], [maker_name] and [state]. A new device would have no available parameter as default. To add parameter to the device, use the function [moduleFunction/Device/Add Device Parameter]. A device could have more than 1 parameter.

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Add Device", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[device_name], [maker_name], [state]]})
                                                                                        
#### 2. moduleFunction/Device/Get Device List
This function would return a list containing all the device_name and the corresponding device_id. Front-end can refer to the device list and implement a search function to look for specific device and it's device_id. 


Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Get Device List", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': []})   

#### 3. moduleFunction/Device/Add Device Parameter
This function would add a new parameter to an existing device in terms of [parameter_name] & [parameter_unit]. Each device may have more than 1 parameter 

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Add Device Parameter", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[parameter_name], [parameter_unit]]})  

#### 4. moduleFunction/Device/Check Device Parameter
This function would return the list of parameters and units corresponding a single device (refering to the device using [device_id]). Front-end could use the list of parameters to a generate report chart for the user to fill.

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Check Device Parameter", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[device_id]]})

#### 5. moduleFunction/Device/Clear Device Parameter
This function would clear all the parameters currently assigned to the device. User can clear all the current parameters and assign new ones to the device.

Accessible by the following roles:

        Admin
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Clear Device Parameter", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[device_id]]})

#### 6. moduleFunction/Device/Assign Device
This function would assign the device to a user. User can upload test report only with the devices they have access to. A User can be assigned more than 1 device and each device can be assigned to more than 1 user.

Accessible by the following roles:

        Admin
        Doctor
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Assign Device", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[device_id], [assigning_user_id], [text_comment]]})

#### 7. moduleFunction/Device/Upload Test Record
This function would upload a test record from a corresponding user and device. Each entry in the record contains [parameter_name], [data] and [parameter_unit]. This function would check the available parameters of the device and log only the appropriate parameters into the data base.

[record] is a python dictionary object and need to be dumped using jason.dumps(). Each entry in the record. Names of the parameter must match the available parameters of the device, or else the entry would be recognized as inappropriate and ignored

        record = json.dumps({parameter_1: data_1, parameter_2: data_2, ...})

Accessible by the following roles:

        Patient
        Doctor
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/Upload Test Record", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id], [device_id], [record], [text_comment]]})
                                                                                        
#### 8. moduleFunction/Device/View Patient Test Records
This function would return a list of test records corresponding to a [user_id]. Each record includes [device_id], [user_id], a list of record entries, and upload time. Each record entry contains [parameter_name], [data] and [parameter_unit].

Accessible by the following roles:

        Admin
        Doctor
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/View Patient Test Records", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[assigning_user_id]]})

#### 9. moduleFunction/Device/View Your Test Records
This function would return a list of test records corresponding to the current user. Each record includes [device_id], [user_id], a list of record entries, and upload time. Each record entry contains [parameter_name], [data] and [parameter_unit].

Accessible by the following roles:

        Patient
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Device/View Your Test Records", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': []})
                                                                                        
### Chat Module
#### 1. moduleFunction/Chat/Create Chat Group
This function would create a new chat group with specified [group_name] and [group_id] (group_id need to be unique). A new chat groupe would include only the current user (creater of the group). To add or remove users, use the function [moduleFunction/Chat/Add User to Chat Group] and [moduleFunction/Chat/Remove User from Chat Group]

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/Create Chat Group", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[group_name], [group_id]]})
                                                                                        
#### 2. moduleFunction/Chat/Add User to Chat Group
This function would assgin user access to a specific group. Only user who is currently in the group can add another user into the group (refered using [user_id] and [group_id]). Having access to a group means the user can send/receive message or add/remove users in the group.

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/Add User to Chat Group", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id_adding], [group_id]]})
                                                                                        
#### 3. moduleFunction/Chat/Remove User from Chat Group
This function would remove a specific user from the caht group. Only user who is currently in the group can remove user from the group (refered using [user_id] and [group_id]).

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/Remove User from Chat Group", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id_removing], [group_id]]})
                                                                                        
#### 4. moduleFunction/Chat/Send Message
This function would send text message to a chat group or a specific user (using [user_id] and [group_id]). If the user don't want this message being sent to any user (or any group), use [-1] for the [user_id] (or [group_id]). But there must be at least one valid receiver in [user_id] and [group_id]. If the message is sent to a group, the sender must be a member of that group.

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/Send Message", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[user_id_sending], [group_id_sending], [text_message]]})

#### 6. moduleFunction/Chat/View Your Message
This function would return a list of chat message sent to the current user (only the individual message, not group chat). Each message contains [sender_user_id], [receiver_user_id], [receiving_group_id], [time], [text_content]

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/View Your Message", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': []})
                                                                                        
#### 7. moduleFunction/Chat/View Group Message
This function would return a list of chat message sent to the specific group chat. Each message contains [sender_user_id], [receiver_user_id], [receiving_group_id], [time], [text_content]. Users must have access to the group before viewing group messages.

Accessible by the following roles:

        ALL ROLES
        
Request Formate:

        response = requests.get(BASE + "moduleFunction/Chat/View Group Message", {'u_id': [your_account_id], 'pw': [your_account_pw]
                                                                                        ,'para': [[group_id_viewing]]})
                                                                                        
### Session Examples Database
#### Back-end Setup
The first step is to download the database framework using the module [db_setup.py], the downloaded framework is named [Example_db.db]. The example then sets up a local sever connected to []Example_db.db and open the default python http port :5000, the address of the sever is http://127.0.0.1:5000/
![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX1.PNG)

 #### Login and Add New Users
 Login using the default admin account (user_id = 1, pw = admin). The response message would show the user's information and his accessibilty to each module/function. 
 ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX2.PNG)
 Add a new user (First name = 'First', Last name = 'Last', birth date = 1000/1/1, password = 'PW1'). Check the user list and login using the new account
 ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX2_2.PNG)
 
 #### Create Device and Assign Parameters
 Use the default admin account to create a new device (device name = 'Test_Device_01', maker name = 'Maker01',    state = 1(available)). Then check the device list.
  ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_3.PNG)
 Add 2 parameters to the new device (Weight:kg and Blood_Pressure:mmHg). Then check the available parameters of the new device.
   ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_3_2.PNG)
 #### Assign Device and Upload Records
 Use the default admin account to assign the new device to a patient (user_id = 2). User the patient's account to upload a test record with the new device (device_id = 1). Record entries are {Blood_Pressure: 100, Weight: 70}.
 ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_4.PNG)
 Use the patient account to view the newly uploaded record
 ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_4_2.PNG)
 #### Send Message to Groups and Individuals
 Use the patient account to create a new chatgroup (group name = 'New Group Chat', group id = 123). The add the default admin user to the group (user_id = 1). Use the patient account to send an 'Individual Msg' directly to admin user and send a 'Group Msg' to 'New Group Chat'.
 ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_5.PNG)
 Login as admin user and view both individual chat and group chat
  ![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX_5_2.PNG)

