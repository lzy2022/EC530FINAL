import FormData from 'form-data';
import XMLHttpRequest from 'xhr2';

export default class Client{
    constructor(){
        this.login_state = false
        this.user_name_f = 'default_f';
        this.user_name_l = 'default_l';
        this.module_func = {};
        this.role = 'default_role';
        this.user_id = -1;
        this.pw = 'default_pw'
        // this.sever_addr = 'http://127.0.0.1:5000/'
        this.sever_addr = 'https://ec530final.ue.r.appspot.com/';
    }

    formatParams( params )
    {
        return "?" + Object
              .keys(params)
              .map(function(key){
                return key+"="+encodeURIComponent(params[key])
              })
              .join("&")
    }

    async user_login(user_id, pw)
    {
        var para = {
            'u_id': user_id,
            'pw': pw,
        };
        var response_state = false;
        this.login_state = false;
        var _this = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'login' + this.formatParams(para), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Loged in'){
                _this.user_id = user_id;
                _this.user_name_f = response['user_name'][0];
                _this.user_name_l = response['user_name'][1];
                _this.role = response['user_role'];
                _this.module_func = response['user_function'];
                _this.login_state = true;
                _this.pw = pw;
                console.log('Login Success');
                response_state = true;
            }
            else{
                console.log('Login Failed');
                _this.login_state = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        console.log('now' + this.login_state)
        return this.login_state;
    }

    user_logout()
    {
        if (this.login_state == false){
            return true
        }
        else{
            this.user_id = -1;
            this.pw = 'default_pw';
            this.user_name_f = 'default_f';
            this.user_name_l = 'default_l';
            this.role = 'default_role';
            this.module_func = {};
            this.login_state = false;
            console.log('Logout Success');
            return true;
        };
        return true;
    }

    get_user_info()
    {
        info = {
            'user_id': this.user_id,
            'pw': this.pw,
            'user_name_f': this.user_name_f,
            'user_name_l': this.user_name_l,
            'role': this.role,
            'module_func': this.module_func,
            'login_state': this.login_state
        }
        return info
    }

}