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
          Main body of the React Native application, not including the system's library, needed to be               pasted into a pre-built React Native project.
    - modules_added.txt
          Configuration of the React Native project, need to download all the packages required before               building the project loaclly. 
  
## Setting up Back-end Sever
This project is designed for google cloud. To set up the sever, just run the following line in the Code folder:
        gcloud app deploy

The google cloud sever should have the following APIs enabled:

        google cloud speech to text API
        google-api-python-client
        google-cloud-tasks==2.7.1
        
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
