import React, {useState, useEffect} from 'react';

import { BottomNavigation, List, Searchbar} from 'react-native-paper';
import { FlatList, ScrollView, TextInput, Button, VirtualizedList, Picker,} from 'react-native';


import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// Import Google Signin
import { Appbar } from 'react-native-paper';
import Client from './App_Client/client';


const App = () => {
  const [user_id, setUser_Id] = useState(null);
  const [password, setPassword] = useState(null);
  const [user_name_f, setUserNameF] = useState(null);
  const [user_name_l, setUserNameL] = useState(null);
  const [user_role, setUserRole] = useState(null);
  const [user_func, setUserFunc] = useState(null);
  const [client, setClient] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);
  const [login_state, setLoginState] = useState(false);
  const [runing_f, setRunningF] = useState('None');
  const [runing_m, setRunningM] = useState('None');
  const [searching_f, setSearchingF] = useState('None');
  const [add_user_fn, setAdd_User_Fn] = useState('None');
  const [add_user_ln, setAdd_User_Ln] = useState('None');
  const [add_user_pw, setAdd_User_Pw] = useState('None');
  const [add_user_y, setAdd_User_Y] = useState(0);
  const [add_user_m, setAdd_User_M] = useState(0);
  const [add_user_d, setAdd_User_D] = useState(0);
  const [user_list, setUser_List] = useState(null);
  const [select_user, SetSelect_User] = useState({id: -1, name: 'Default Name'});
  const [device_list, setDevice_List] = useState(null);
  const [select_device, SetSelect_Device] = useState({id: -1, name: 'Default Device'});
  const [group_list, setGroup_List] = useState(null);
  const [select_group, SetSelect_Group] = useState({id: -1, name: 'Default Group'});
  const [select_change_role, SetChange_Role] = useState('Patient');
  const [search_load, SetSearch_Load] = useState(false);
  const [search_text, SetSearch_Text] = useState(null);
  const [search_page_content, SetSearch_Page_Content] = useState(new Array());
  const [s_loading, SetS_Loading] = useState(true);
  const [create_d_name, SetCreate_D_Name] = useState('Default Name');
  const [create_p_name, SetCreate_P_Name] = useState('Default Name');
  const [add_para_name, SetAdd_Para_Name] = useState('Default Name');
  const [add_unit, SetAdd_Unit] = useState('Default Unit');
  const [current_device_para, SetCurrent_device_para] = useState({para1: 'unit1'});
  const [current_record, SetCurrent_Record] = useState([{comment:'Default Comment', record_id:-1, device_id:-1, user_id:-1, year:-1, month:-1, date:-1, entries:[['data',-1,'unit']]}]);
  const [add_g_name, setAdd_G_Name] = useState('Default name');
  const [add_g_id, setAdd_G_ID] = useState('Default ID');
  const [send_msg, setSend_MSG] = useState('');
  const [msg_list, setMSG_List] = useState([{from:-1, to:-1, group:-1, time:'0/0/0', content:'Default Content'}]);
  const [onSearch, setOnSearch] = useState(0); //0 not searching, 1 for day, 2 for food
  const [searchListItem, setSearchLishItem] = useState(null);
  const [showingMsg, setShowingMsg] = useState(false);
  const [itemShown, setItemShown] = useState(null);
  const [add_M, setAdd_M] = useState(0);
  const [add_F, setAdd_F] = useState(0);
  const [barcode, setBarcode] = useState(null);
  const [barcode_cache, setBarcode_cache] = useState(null);
  ///////////////////////////////////

  const _signIn = async () => {
    // It will prompt google Signin Widget
      
  };

  const _signOut = async () => {
    setGettingLoginStatus(false);
    // Remove user session from the device.
      // Removing user Info
    setClient(null);
    setLoginState(false);

  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'admin', title: 'Admin', icon: 'pencil' },
    { key: 'device', title: 'Device', icon: 'camera' },
    { key: 'chat', title: 'Chat', icon: "mail" },
  ]);

  renderScene = ({route}) => {
    switch (route.key) {
      case 'admin':
        return <AdminRoute/>;
      case 'device':
        return <DeviceRoute/>;
      case 'chat':
        return <ChatRoute/>;
    }
  }
  ///////////////////////////////////
  const Loading_Page = () =>{
    return(
    <><View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    </View></>
    )
  }
  /////////////////////////////////
  const onLoginPressed = async () =>{
    var temp_client = new Client();
    setGettingLoginStatus(true);
    var state = await temp_client.user_login(user_id, password);
    console.log(state);
    if ( state == true){
      var info = temp_client.get_user_info();
      setUser_Id(info['user_id']);
      setPassword(info['pw']);
      setUserNameF(info['user_name_f']);
      setUserNameL(info['user_name_l']);
      setUserRole(info['role']);
      setUserFunc(info['module_func']);
      setClient(temp_client);
      setLoginState(true);
      console.log('Loged in')
    }
    else{
      console.log('aaaaa')
      setLoginState(false);
    };
    setGettingLoginStatus(false);
  }
  const Login_Page = () =>{
    return (
      <>
        <Appbar style = {styles.appBarStyle}>
        <Appbar.Content title={'Patient Connect'} subtitle = {'EC530 Final Project'}/>
        <Appbar.Action icon = 'book'/>
        </Appbar>
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={{height:50, width: 150}}>
            <Text style={{fontSize: 35, textAlign: 'center', color: '#9a73ef', fontWeight: 'bold',}}>LOGIN</Text>
            </View>
            <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "User ID"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setUser_Id(text)}/>
            <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setPassword(text)}/>
            <Button mode="contained" onPress={onLoginPressed} title = 'Login'>
            </Button>
            </View>
            <Text style={styles.footerHeading}>
              by Zhiyuan
            </Text>
            <Text style={styles.footerText}>
              2022 April at Boston University
            </Text>
        </SafeAreaView>
      </>
    );
  }

  const Main_Page = () =>{
    //if(typeof backEnd !)
    return (
      <>
        <Appbar style = {styles.appBarStyle}>
        <Appbar.BackAction onPress = {_signOut} icon = "exit"/>
        <Appbar.Content title={'Hellow! ' + user_name_l} subtitle = {'Patient Connect'}/>
        </Appbar>
        
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </>
    );
  }
//////////////////////////////////////////
const run_func = (module, func_name) =>{
  setRunningM(module);
  setRunningF(func_name);
  console.log('running'+func_name);
}

const render_function = (module, func) =>{
  func_name = func.item.func_name
  return(
    <List.Item
    title = {func_name}
    onPress={() => run_func(module, func.item.func_name)}
    >
    </List.Item>
  )
}
////////////////////////////////////
const render_search = (item) => {
  if(item.name.startsWith(search_text)){
    return(
      <List.Item
        title = {'<ID' + item.id + '>: ' + item.name}
        onPress={() => {if(searching_f=='User'){SetSelect_User(item);}
                        else if(searching_f=='Device'){SetSelect_Device(item);}
                        else if(searching_f=='Group'){SetSelect_Group(item);};
                        setSearchingF('None')}}>
      </List.Item>
      )
  }
}

const search_loading = async (s_f) => {
  var response = null;
  var content_list = new Array();
  if (s_f == 'User'){
    response = await client.get_user_list();
    response.forEach(element => content_list.push({name: element['first_name'].toString() + ' ' + element['last_name'].toString(), id: element['user_id']}));
  } else if (s_f == 'Device'){
    response = await client.get_device_list();
    response.forEach(element => content_list.push({name: element['device_name'].toString(), id: element['device_id']}));
  } else if (s_f == 'Group'){
    response = await client.get_group_list();
    response.forEach(element => content_list.push({name: element['g_name'].toString(), id: element['g_id']}));
  };
  SetSearch_Page_Content(content_list);
  SetS_Loading(false);
}

const Searching_Page = () => {
  if (s_loading == false){
    return (<>
      <Appbar>
        <Appbar.BackAction onPress = {()=>{setSearchingF('None')}}/>
        <Appbar.Content title={'Searching ' + searching_f}/>
      </Appbar>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => SetSearch_Text(query)}
      />
      <FlatList
        data={search_page_content}
        renderItem={(item) => render_search(item.item)}
        keyExtractor = {item => item.id}
      />
    </>);
  }
  else{
  return (
    <><View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    </View></>)
  }
}

//////////////////////////////
const on_create_user = async () => {
  var state = await client.add_user(add_user_fn, add_user_ln, add_user_pw, add_user_y, add_user_m, add_user_d);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Add_User_Page = () => {
  return(
    <>
    <View style={[styles.container, {flexDirection: "row"}]}>
    <TextInput style = {[styles.input, { flex: 1, width: 50}]}
               underlineColorAndroid = "transparent"
               placeholder = "First Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_Fn(text)}
               />
    <TextInput style = {[styles.input, { flex: 2, width: 50}]}
               underlineColorAndroid = "transparent"
               placeholder = "Last Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_Ln(text)}
               />
    </View>
    <TextInput style = {[styles.input, { flex: 1}]}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_Pw(text)}
               />
    <View style={[styles.container, {flexDirection: "row"}]}>
    <TextInput style = {[styles.input, { flex: 1, width: 50}]}
               underlineColorAndroid = "transparent"
               placeholder = "Year"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_Y(parseInt(text, 10))}
               />
    <TextInput style = {[styles.input, { flex: 2, width: 50}]}
               underlineColorAndroid = "transparent"
               placeholder = "Month"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_M(parseInt(text, 10))}
               />
    <TextInput style = {[styles.input, { flex: 3, width: 50}]}
               underlineColorAndroid = "transparent"
               placeholder = "Date"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_User_D(parseInt(text, 10))}
               />
    </View>
    <Button mode="contained" onPress={on_create_user} title = 'Create New User'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_change_user_role = async () => {
  var state = await client.change_user_role(select_user.id, select_change_role);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Change_Role_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Now Editing User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <View style={[styles.container]}>
    <Picker
        selectedValue={select_change_role}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => SetChange_Role(itemValue)}
      >
        <Picker.Item label="Patient" value="Patient" />
        <Picker.Item label="Nurses" value="Nurese" />
        <Picker.Item label="Doctor" value="Doctor" />
        <Picker.Item label="Admin" value="Admin" />
      </Picker>
    </View>
    <Button mode="contained" onPress={on_change_user_role} title = 'Change Role'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
///////////////////////////////////////////////
const on_delete_user = async () => {
  var state = await client.delete_user(select_user.id);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Delete_User_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Delete User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <View style={[styles.container]}>
    <Button mode="contained" onPress={on_delete_user} title = 'Delete User'>
    </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////

//////////////////////////////
const on_create_device = async () => {
  var state = await client.add_device(create_d_name, create_p_name);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Add_Device_Page = () => {
  return(
    <>
    <View style={[styles.container]}>
    <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "Device Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => SetCreate_D_Name(text)}
               />
    <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "Manufactor"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => SetCreate_P_Name(text)}
               />
    </View>
    <Button mode="contained" onPress={on_create_device} title = 'Create New Device'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_add_para = async () => {
  var state = await client.add_device_para(select_device.id, add_para_name, add_unit);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Add_Para_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Adding Parameter to Device ID {select_device.id}: {select_device.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Device');setSearchingF('Device')}} title = 'Select A Device'>
    </Button>
    <View style={[styles.container]}>
    <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "Parameter Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => SetAdd_Para_Name(text)}
               />
    <TextInput style = {[styles.input, { width: 150, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = "Unit"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => SetAdd_Unit(text)}
               />
    </View>
    <Button mode="contained" onPress={on_add_para} title = 'Add New Parameter'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_clear_para = async () => {
  var state = await client.clear_device_para(select_device.id);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Clear_Para_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Clearing Parameter of Device ID {select_device.id}: {select_device.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Device');setSearchingF('Device')}} title = 'Select A Device'>
    </Button>
    <Button mode="contained" onPress={on_clear_para} title = 'Clear All Parameter'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_view_para = async () => {
  var para = await client.get_para_list(select_device.id);
  console.log(para);
  SetCurrent_device_para(para);
}

const render_para = (item) => {
  return(
    <List.Item
      title = {'<' + item + '>: unit = ' + current_device_para[item]}>
    </List.Item>
    )
}

const View_Para_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Viewing Parameters of Device ID {select_device.id}: {select_device.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Device');setSearchingF('Device')}} title = 'Select A Device'>
    </Button>
    <FlatList
        data={Object.keys(current_device_para)}
        renderItem={(item) => render_para(item.item)}
        keyExtractor = {item => {item}}
        height={350}
      />
    <Button mode="contained" onPress={on_view_para} title = 'View All Parameters'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_assign_device = async () => {
  var state = await client.assign_device(select_device.id, select_user.id);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Assign_Device_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Assigning Device ID {select_device.id}: {select_device.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Device');setSearchingF('Device')}} title = 'Select A Device'>
    </Button>
    <Text style={{textAlign: 'center'}}>To User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <View style={[styles.container]}>
    <Button mode="contained" onPress={on_assign_device} title = 'Assign Device To User'>
    </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////
const on_upload_record = async () => {
  var record_str = JSON.stringify(current_device_para);
  var record_uid = user_id;
  if (user_role == 'Doctor'){
    record_uid = select_user.id;
  }
  var state = await client.upload_record(select_device.id, record_uid, record_str);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const render_record_edit = (item) => {
  return(
    <View style={[styles.container, {flexDirection: "row"}]}>
    <Text style={{flex: 1, textAlign: 'right'}}>{item}: </Text>
    <TextInput style = {[styles.input, { flex: 2, width: 130, textAlign: 'center'}]}
               underlineColorAndroid = "transparent"
               placeholder = {current_device_para[item]}
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => {
                 var temp = current_device_para;
                 temp[item] = text;
                 SetCurrent_device_para(temp);
               }}
               />
    </View>
    )
}

const Doctor_Selection = () => {
  if(user_role == 'Doctor'){
    return(
      <>
        <Text style={{textAlign: 'center'}}>Uploading Record For User ID {select_user.id}: {select_user.name} </Text>
        <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
        </Button>
      </>
    );}
  else{return(<></>)};
}

const Upload_Record_Page = () => {
  var Doctor_Content = Doctor_Selection();
  return(
    <>
    {Doctor_Content}
    <Text style={{textAlign: 'center'}}>Uploading Record Using Device ID {select_device.id}: {select_device.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Device');setSearchingF('Device')}} title = 'Select A Device'>
    </Button>
    <Button mode="contained" onPress={on_view_para} title = 'Reload a Record Form'>
    </Button>
    <FlatList
        data={Object.keys(current_device_para)}
        renderItem={(item) => render_record_edit(item.item)}
        keyExtractor = {item => {item}}
        height={350}
      />
    <Button mode="contained" onPress={on_upload_record} title = 'Upload Record'>
    </Button>
    </>
  );
}
///////////////////////////////////////////////
const on_view_record = async () => {
  var record_uid = user_id;
  if (user_role == 'Doctor'){
    record_uid = select_user.id;
  }
  var state = await client.get_user_record(record_uid);
  SetCurrent_Record(state);
}

const render_record_entries = (item) => {
  return(
    <View style={[styles.container]}>
      <Text style={{textAlign: 'center'}}>
        - {item[0]}: {item[1]} {item[2]} -{"\n"}
      </Text>
    </View>
    )
}

const render_record_view = (item) => {
  return(
    <View style={[styles.container]}>
    <Text style={{textAlign: 'center'}}>
      ========================={"\n"}
      Record ID: {item.record_id}{"\n"}
      User ID: {item.user_id}{"\n"}
      Device ID: {item.device_id}{"\n"}
      Date: {item.year}/{item.month}/{item.date}{"\n"}
      Comment: {item.comment}{"\n"}
      Entires:{"\n"}
      <FlatList
        data={item.entries}
        renderItem={(item) => render_record_entries(item.item)}
      />
       </Text>
    </View>
    )
}

const Doctor_Selection_View = () => {
  if(user_role == 'Doctor'){
    return(
      <>
        <Text style={{textAlign: 'center'}}>View Record of User ID {select_user.id}: {select_user.name} </Text>
        <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
        </Button>
      </>
    );}
  else{return(<></>)};
}

const View_Record_Page = () => {
  var Doctor_Content = Doctor_Selection_View();
  return(
    <>
    {Doctor_Content}
    <FlatList
        data={current_record}
        renderItem={(item) => render_record_view(item.item)}
        keyExtractor = {item => {item.record_id}}
        height={400}
      />
    <Button mode="contained" onPress={on_view_record} title = 'Reload Records'>
    </Button>
    
    </>
  );
}
///////////////////////////////////////////////
const on_create_group = async () => {
  var state = await client.add_chat_group(add_g_id, add_g_name);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Add_Group_Page = () => {
  return(
    <>
    <View style={[styles.container]}>
    <TextInput style = {[styles.input, { width: 150}]}
               underlineColorAndroid = "transparent"
               placeholder = "Group ID"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_G_ID(text)}
               />
    <TextInput style = {[styles.input, { width: 150}]}
               underlineColorAndroid = "transparent"
               placeholder = "Group Name"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setAdd_G_Name(text)}
               />
    </View>
    <Button mode="contained" onPress={on_create_group} title = 'Create New Chat Group'>
    </Button>
    </>
  );
}
///////////////////////////////////
const on_add_user_group = async () => {
  var state = await client.add_user_group(select_group.id, select_user.id);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Add_User_Group_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Adding User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <Text style={{textAlign: 'center'}}>To Group ID {select_group.id}: {select_group.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Group');setSearchingF('Group')}} title = 'Select A Group'>
    </Button>
    <View style={[styles.container]}>
    <Button mode="contained" onPress={on_add_user_group} title = 'Adding User To Group'>
    </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////
const on_remove_user_group = async () => {
  var state = await client.remove_user_group(select_group.id, select_user.id);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Remove_User_Group_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Removing User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <Text style={{textAlign: 'center'}}>From Group ID {select_group.id}: {select_group.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Group');setSearchingF('Group')}} title = 'Select A Group'>
    </Button>
    <View style={[styles.container]}>
    <Button mode="contained" onPress={on_remove_user_group} title = 'Removing User From Group'>
    </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////
const on_send_msg = async () => {
  var state = await client.send_msg(select_user.id, -1, send_msg);
  if (state == true){
    setRunningM('None');
    setRunningF('None');
  }
}

const Send_MSG_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Sending To User ID {select_user.id}: {select_user.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('User');setSearchingF('User')}} title = 'Select A User'>
    </Button>
    <View style={[styles.container]}>
      <TextInput
        editable
        maxLength={200}
        multiline
        numberOfLines={6}
        onChangeText={text => setSend_MSG(text)}
        value={send_msg}
        style={[{ margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: 325}]}
      />
    </View>
    <View style={[styles.container]}>
      <Button mode="contained" onPress={on_send_msg} title = 'Send'>
      </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////
const on_refresh_msg = async () => {
  var msg = await client.get_user_msg();
  setMSG_List(msg);
}

const render_message = (item) => {
  return(
    <View style={[styles.container]}>
    <Text style={{textAlign: 'center'}}>
      ========================={"\n"}
      Sender ID: {item.from}{"\n"}
      Reciver ID: {item.to}{"\n"}
      Group ID: {item.group}{"\n"}
      Time: {item.time}{"\n"}
      Content: {item.content}{"\n"}
       </Text>
    </View>
    )
}

const View_MSG_Page = () => {
  return(
    <>
    <FlatList
        data={msg_list}
        renderItem={(item) => render_message(item.item)}
        height={300}
      />
    <View style={[styles.container]}>
      <Button mode="contained" onPress={on_refresh_msg} title = 'Reload Messages'>
      </Button>
    </View>
    </>
  );
}
///////////////////////////////////////////////
const on_refresh_group_msg = async () => {
  var msg = await client.get_group_msg(select_group.id);
  setMSG_List(msg);
}

const on_send_group_msg = async () => {
  var state = await client.send_msg(-1, select_group.id, send_msg);
}

const View_Group_MSG_Page = () => {
  return(
    <>
    <Text style={{textAlign: 'center'}}>Viewing Group ID {select_group.id}: {select_group.name} </Text>
    <Button mode="contained" onPress={()=>{search_loading('Group');setSearchingF('Group')}} title = 'Select A Group'>
    </Button>
    <FlatList
        data={msg_list}
        renderItem={(item) => render_message(item.item)}
        height={300}
      />
    <SafeAreaView style={styles.container}>
    <View style={[styles.container]}>
      <Button mode="contained" onPress={on_refresh_group_msg} title = 'Reload Messages'>
      </Button>
      <TextInput
        editable
        maxLength={50}
        multiline
        numberOfLines={2}
        onChangeText={text => setSend_MSG(text)}
        value={send_msg}
        style={[{ margin: 12,
                  borderWidth: 1,
                  padding: 10,
                  width: 325}]}
      />
      <Button mode="contained" onPress={on_send_group_msg} title = 'Send'>
      </Button>
    </View>
    </SafeAreaView>
    </>
  );
}
///////////////////////////////////////////////

const Function_Page = () => {
  var page_content = null;
  if (runing_f == 'Add User'){
    page_content = Add_User_Page();
  } else if (runing_f == 'Change User Role'){
    page_content = Change_Role_Page();
  } else if (runing_f == 'Delete User Info'){
    page_content = Delete_User_Page();
  } else if (runing_f == 'Add Device'){
    page_content = Add_Device_Page();
  } else if (runing_f == 'Add Device Parameter'){
    page_content = Add_Para_Page();
  } else if (runing_f == 'Clear Device Parameter'){
    page_content = Clear_Para_Page();
  } else if (runing_f == 'Check Device Parameter'){
    page_content = View_Para_Page();
  } else if (runing_f == 'Assign Device'){
    page_content = Assign_Device_Page();
  } else if (runing_f == 'Upload Test Record'){
    page_content =Upload_Record_Page();
  } else if (runing_f == 'View Patient Test Records' || runing_f == 'View Your Test Records'){
    page_content =View_Record_Page();
  } else if (runing_f == 'Create Chat Group'){
    page_content =Add_Group_Page();
  } else if (runing_f == 'Add User to Chat Group'){
    page_content =Add_User_Group_Page();
  } else if (runing_f == 'Remove User from Chat Group'){
    page_content =Remove_User_Group_Page();
  } else if (runing_f == 'Send Message'){
    page_content =Send_MSG_Page();
  } else if (runing_f == 'View Your Message'){
    page_content =View_MSG_Page();
  } else if (runing_f == 'View Group Message'){
    page_content =View_Group_MSG_Page();
  } else if (runing_f == 'Get User List'){
    setRunningF('None');
    setRunningM('None');
    console.log('loading');
    search_loading('User');
    setSearchingF('User');
  } else if (runing_f == 'Get Device List'){
    setRunningF('None');
    setRunningM('None');
    console.log('loading');
    search_loading('Device');
    setSearchingF('Device');
  } else if (runing_f == 'Get Group List'){
    setRunningF('None');
    setRunningM('None');
    console.log('loading');
    search_loading('Group');
    setSearchingF('Group');
  };

  if (runing_f == 'None' || runing_m == 'None'){ return <><Text>No Function</Text></>}
  else{
    return (<>
      <Appbar>
        <Appbar.BackAction onPress = {()=>{setRunningF('None'); setRunningM('None');}}/>
        <Appbar.Content title={runing_f}/>
      </Appbar>
        {page_content}
    </>);
  }
}
/////////////////////////////////////////
const AdminRoute = () => {
  var func_list = []
  user_func['Administrative'].forEach(element => func_list.push({func_name: element.toString()}));
  return(
  <>
    <Appbar.Header style={{backgroundColor: "#CBCBFA", height: 30}}>
          <Appbar.Content title={"Administrative"}/>
          <Appbar.Action icon = "pencil"/>
          </Appbar.Header>
    <FlatList
      data={func_list}
      renderItem={(item) => render_function('Administrative', item)}
      keyExtractor = {item => item.func_name}
    />
  </>
);};

const DeviceRoute = () => {
  var func_list = []
  user_func['Device'].forEach(element => func_list.push({func_name: element.toString()}));
  return(
  <>
    <Appbar.Header style={{backgroundColor: "#CBCBFA", height: 30}}>
          <Appbar.Content title={"Device"}/>
          <Appbar.Action icon = "camera"/>
          </Appbar.Header>
    <FlatList
      data={func_list}
      renderItem={(item) => render_function('Device', item)}
      keyExtractor = {item => item.func_name}
    />
  </>
);};

const ChatRoute = () => {
  var func_list = []
  user_func['Chat'].forEach(element => func_list.push({func_name: element.toString()}));
  return(
  <>
    <Appbar.Header style={{backgroundColor: "#CBCBFA", height: 30}}>
          <Appbar.Content title={"Chat"}/>
          <Appbar.Action icon = "mail"/>
          </Appbar.Header>
    <FlatList
      data={func_list}
      renderItem={(item) => render_function('Chat', item)}
      keyExtractor = {item => item.func_name}
    />
  </>
);};

  ////////////////////////////////
  if (gettingLoginStatus) {
    return (Loading_Page());
  } else if (login_state == false){
    return (Login_Page());
  } else if (searching_f != 'None')
  {
    return (Searching_Page());
  } else if (runing_f != 'None')
  {
    return (Function_Page());
  } else {
    return (Main_Page());
  }
}

export default App;

const styles = StyleSheet.create({
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'skyblue',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  ToolBarStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  appBarStyle: {
    fontSize: 25,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  mealText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
  EditText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
