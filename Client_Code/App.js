import React, {useState, useEffect} from 'react';

import { BottomNavigation, List, Searchbar} from 'react-native-paper';
import { FlatList, ScrollView, TextInput, Button} from 'react-native';


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
  const [backEndLoaded, setBackEndLoaded] = useState(false);
  const [editingItem, setEditingItem] = useState(false);
  const [nowEditing, setNowEditing] = useState(null);
  const [editName, setEditName] = useState(null);
  const [editServingSize, SetEditServingSize] = useState(null);
  const [editCalorie, SetEditCalorie] = useState(null);
  const [editCarbo, SetEditCarbo] = useState(null);
  const [editProtein, SetEditProtein] = useState(null);
  const [editFat, SetEditFat] = useState(null);
  const [edit_M, setEdit_M] = useState(0);
  const [edit_F, setEdit_F] = useState(0);
  const [editType, setEditType] = useState(0); //1 for day 2 for meal 3 for food
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
    { key: 'chat', title: 'Chat', icon: 'book' },
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
        <Appbar.Content title={'Personal Diate Manager'} subtitle = {'EC463 Mini Project'}/>
        <Appbar.Action icon = 'book'/>
        </Appbar>
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "User ID"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText={(text) => setUser_Id(text)}/>
            <TextInput style = {styles.input}
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
        <Appbar.Content title={'Hellow! ' + user_name_l} subtitle = {'EC463 Mini Project'}/>
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
const AdminRoute = () => {return(
  <>
    <Text>Admin</Text>
  </>
);};

const DeviceRoute = () => {return(
  <>
    <Text>Device</Text>
  </>
);};

const ChatRoute = () => {return(
  <>
    <Text>Chat</Text>
  </>
);};

  ////////////////////////////////
  if (gettingLoginStatus) {
    return (Loading_Page());
  } else if (login_state == false){
    return (Login_Page());
  } else if (editingItem == true)
  {
    return (ItemEdit_Page());
  } else if (showingMsg == true)
  {
    return (Summary_Page());
  } else if (onSearch != 0)
  {
    return (Search_Page());
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
