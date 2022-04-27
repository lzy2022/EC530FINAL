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

    formatArgs( args )
    {
        var result = '';
        args.forEach(element => {
            result += '&para=' + encodeURIComponent(element)
        });
        return (result);
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

    async add_user(u_fn, u_ln, pw, year, month, date)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_fn, u_ln, year, month, date, pw];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Administrative/Add User' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'New User Added'){
                console.log('New User Added');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Add User Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async change_user_role(u_id, role)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id, role];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Administrative/Change User Role' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Role Changed'){
                console.log('Role Changed');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Change Role Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async delete_user(u_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Administrative/Delete User Info' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'User Deleted'){
                console.log('User Deleted');
                suc = true;
                response_state = true;
            }
            else{
                console.log('User Delete Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async add_device(d_name, m_name)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [d_name, m_name, 1];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Add Device' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Device Added'){
                console.log('New Device Added');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Add Device Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async add_device_para(device_id, p_name, unit)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [device_id, p_name, unit];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Add Device Parameter' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Parameter Added'){
                console.log('New Parameter Added');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Add Parameter Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async clear_device_para(device_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [device_id];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Clear Device Parameter' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Parameter Cleared'){
                console.log('Parameter Cleared');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Parameter Cleared Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async assign_device(device_id, user_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [device_id, user_id, 'Assign Device'];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Assign Device' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Device Assigned'){
                console.log('Device Assigned');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Device Assign Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async upload_record(device_id, user_id, record_str)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [user_id, device_id, record_str, 'New Record'];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Upload Test Record' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Record Added'){
                console.log('Record Added');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Record Upload Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_user_record(u_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id];
        var response_state = false;
        var suc = {};
        var xhr = new XMLHttpRequest();
        if (this.role == 'Doctor'){
            xhr.open('GET', this.sever_addr + 'moduleFunction/Device/View Patient Test Records' + this.formatParams(para) + this.formatArgs(args), true);
        } else {
            xhr.open('GET', this.sever_addr + 'moduleFunction/Device/View Your Test Records' + this.formatParams(para) + this.formatArgs(args), true);
        }
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response;
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_para_list(device_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [device_id];
        var response_state = false;
        var suc = {};
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Check Device Parameter' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response;
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_user_list()
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [];
        var response_state = false;
        var suc = null;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Administrative/Get User List' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response;
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_device_list()
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [];
        var response_state = false;
        var suc = null;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Device/Get Device List' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_group_list()
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [];
        var response_state = false;
        var suc = null;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/Get Group List' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async add_chat_group(g_id, g_name)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [g_name, g_id];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/Create Chat Group' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Chat Group Created'){
                console.log('Chat Group Created');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Group Created Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async add_user_group(g_id, u_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id, g_id];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/Add User to Chat Group' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Added User to the Chat Group'){
                console.log('Added User to the Chat Group');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Added User to the Group Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async remove_user_group(g_id, u_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id, g_id];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/Remove User from Chat Group' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Removed User from the Chat Group'){
                console.log('Removed User from the Chat Group');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Removed User from the Chat Group Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async send_msg(u_id_r, g_id, msg)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [u_id_r, g_id, msg];
        var response_state = false;
        var suc = false;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/Send Message' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            if (response['message'] == 'Message Sent'){
                console.log('Message Sent');
                suc = true;
                response_state = true;
            }
            else{
                console.log('Message Sent Failed');
                suc = false;
                response_state = true;
            }
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }
    
    async get_user_msg()
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [-1];
        var response_state = false;
        var suc = {};
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/View Your Message' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response;
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }

    async get_group_msg(g_id)
    {
        var para = {
            'u_id': this.user_id,
            'pw': this.pw,
        };
        var args = [g_id];
        var response_state = false;
        var suc = {};
        var xhr = new XMLHttpRequest();
        xhr.open('GET', this.sever_addr + 'moduleFunction/Chat/View Group Message' + this.formatParams(para) + this.formatArgs(args), true);
        xhr.onload = function () {
            var response = JSON.parse(this.responseText);
            console.log(response);
            suc = response;
            response_state = true;
        };
        xhr.send();
        while (response_state == false){
            await new Promise(r => setTimeout(r, 100));
        }
        return suc;
    }
}


