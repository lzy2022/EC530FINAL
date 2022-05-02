# EC530_Final_Project
## Intro
This repository contains a fully-implemented sever and clent app of the previous Project_2 (the "patient connect" sever & front-end app). The front-end application is built using **React-NativeThe**. Final project also integrate Project_4, the sound to text sever. A functioning back-end sever has already been deployed for both of sever-end application (deployed on Google Cloud). User can download the android-app package and loging to the patient connect services.

 [Github Structure](#Github-Structure)
 
 [Setting up Back-end Sever](#Setting-up-Back-end-Sever)
 
 [About Front-end Client APP, User manual](#Setting-up-Back-end-Sever)
 
 [----Code Structure](#Setting-up-Back-end-Sever)
 
 [----Setting Up User Account](#Post-Speech-File)
 
 [----Module](#Get-Task-State)
 
 [----Module](#Get-Task-Result)
 
 [----Module](#Get-Task-Result)
 
 [----Session Examples](#Session-Examples)
 
 [About Back-end Database Sever, RESTful API & Request Formates](#Functions-of-RESTful-API-and-Request-Formates)
 
 [----Post Speech File](#Post-Speech-File)
 
 [----Get Task State](#Get-Task-State)
 
 [----Get Task Result](#Get-Task-Result)
 
 [----Session Examples](#Session-Examples)
 
 [About Sound To Text Sever, RESTful API & Request Formates](#Functions-of-RESTful-API-and-Request-Formates)
 
 [----Post Speech File](#Post-Speech-File)
 
 [----Get Task State](#Get-Task-State)
 
 [----Get Task Result](#Get-Task-Result)
 
 [-----Session Examples](#Session-Examples)
 
 

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
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/1.PNG" width="30%" height="30%">
#### 2. Main Page
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2.PNG" width="30%" height="30%">
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2_2.PNG" width="30%" height="30%">
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/2_3.PNG" width="30%" height="30%">
#### 3. Search Page
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/Search.PNG" width="30%" height="30%">
#### 4. Administrative - Add User
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/3.PNG" width="30%" height="30%">
#### 5. Administrative - Change User Role
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/4.PNG" width="30%" height="30%">
#### 6. Administrative - Delete User Info
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/5.PNG" width="30%" height="30%">
#### 7. Administrative - Get User List
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/Search.PNG" width="30%" height="30%">
#### 8. Device - Add Device
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/6.PNG" width="30%" height="30%">
#### 9. Device - Get Device List
#### 10. Device - Check Device Parameter
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/8.PNG" width="30%" height="30%">
#### 11. Device - Clear Device Parameter
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/10.PNG" width="30%" height="30%">
#### 12. Device - Add Device Parameter
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/7.PNG" width="30%" height="30%">
#### 13. Device - Assign Device
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/9.PNG" width="30%" height="30%">
#### 14. Device - Upload Test Record
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/17.PNG" width="30%" height="30%">
#### 15. Device - View Patient Test Records
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/19.PNG" width="30%" height="30%">
#### 16. Device - View Your Test Records
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/18.PNG" width="30%" height="30%">
#### 17. Chat - Create Chat Group
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/11.PNG" width="30%" height="30%">
#### 18. Chat - Add User to Chat Group
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/12.PNG" width="30%" height="30%">
#### 19. Chat - Remove User from Chat Group
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/13.PNG" width="30%" height="30%">
#### 20. Chat - Send Message
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/14.PNG" width="30%" height="30%">
#### 21. Chat - View Your Message
<img src="https://github.com/lzy2022/EC530FINAL/raw/main/Images/15.PNG" width="30%" height="30%">
#### 22. Chat - View Group Message
#### 23. Chat - Get Group List

## Functions of RESTful API and Request Formates
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
                                                                                        
## Session Examples
The first step is to download the database framework using the module [db_setup.py], the downloaded framework is named [Example_db.db]. The example then sets up a local sever connected to []Example_db.db and open the default python http port :5000, the address of the sever is http://127.0.0.1:5000/
![alt text](https://github.com/lzy2022/S2022_EC530_Project2/raw/main/Images/EX1.PNG)
