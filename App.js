import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text, Button, SafeAreaView, StyleSheet, StatusBar, ScrollView } from "react-native";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MainTabScreen from "./components/MainTabScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;