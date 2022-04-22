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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import { Appbar } from 'react-native-paper';


const App = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userStorage, setUserStorage] = useState(null);
  const [backEnd, setBackEnd] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
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

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      webClientId: '618239383022-fogd500apr628f3ju41o47k96iuil6m9.apps.googleusercontent.com',
    });
    // Check if user is already signed in
  }, []);


  const _signIn = async () => {
    // It will prompt google Signin Widget
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
      // Removing user Info
    setUserInfo(null); 
    setUserStorage(null);
    setGettingLoginStatus(false);
    setBackEnd(null);
    setBackEndLoaded(false);
  };

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'edit', title: 'Edit', icon: 'pencil' },
    { key: 'camera', title: 'Camera', icon: 'camera' },
    { key: 'savedfile', title: 'Saved Files', icon: 'book' },
  ]);

  renderScene = ({route}) => {
    switch (route.key) {
      case 'edit':
        return <EditRoute/>;
      case 'camera':
        return <CameraRoute/>;
      case 'savedfile':
        return <SavedFileRoute/>;
    }
  }

  /////////////////////////////////
  const Login_Page = () =>{
    return (
      <>
        <Appbar style = {styles.appBarStyle}>
        <Appbar.Content title={'Personal Diate Manager'} subtitle = {'EC463 Mini Project'}/>
        <Appbar.Action icon = 'book'/>
        </Appbar>
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <GoogleSigninButton
                  style={{width: 312, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={_signIn}
                />
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
        <Appbar.Content title={'Hellow! ' + userInfo.user.name} subtitle = {'EC463 Mini Project'}/>
        <Appbar.Action icon = {{uri: userInfo.user.photo}}/>
        </Appbar>
        
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </>
    );
  }

  ////////////////////////////////
  if (gettingLoginStatus) {
    return (Loading_Page());
  } else if (userInfo == null){
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
