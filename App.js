import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, Button, SafeAreaView, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from "react-native";

import { DrawerContent } from "./screens/DrawerContent";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MainTabScreen from "./screens/MainTabScreen";
import SettingsScreen from "./screens/SettingsScreen";

import { AuthContext } from "./components/context.js"

import RootStackScreen from "./screens/RootStackScreen";
import { useEffect } from "react";

const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case "RETRIEVE_TOKEN":
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return{
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return{
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return{
          ...prevState,
          userName: action.id,
          userToken: action.taken,
          isLoading: false,
        };

    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: (userName, password)=> {
      // setUserToken("fgkj");
      // setIsLoading(false);
      let userToken;
      userName = null;
      if(userName == "user" && password == "pass") {
        userToken= "dfgfg"
      }
      dispatch({type: "LOGIN", id: userName, token: userToken})
    },
    signOut: ()=> {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: ()=> {
      setUserToken("fgkj");
      setIsLoading(false);
    }
  }), []);

  useEffect(() => {
    setTimeout(() => {
      // setIsLoading(false);
      dispatch({type: "REGISTER", token: "dfklj"})

    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        { loginState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent { ...props} /> } initialRouteName="Home">
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          </Drawer.Navigator>
        )
        :
          <RootStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;