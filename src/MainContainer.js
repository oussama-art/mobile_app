import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Home from './screens/Home';
import List_resrvation from './screens/list_resrvation';
import Profile from './screens/Profile';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

const Tab = createMaterialBottomTabNavigator();
const gettoken = async()=>{
  return await SecureStore.getItemAsync('secure_token');
}
          gettoken()
          .then(token => {
            console.log(token); // daba rah tiji token 
          });
const MainContainer = () => {
  const Header = () => (
      <View style={styles.header}>
        <Text style={styles.headerText}>Voyage</Text>
      </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="white"
        inactiveColor="white"
        barStyle={{backgroundColor:'blue'}}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="home" color={focused ? "black" : "white"} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="reservation"
          component={List_resrvation} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="plus-circle" color={focused ? "black" : "white"} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account" color={focused ? "black" : "white"} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',

  },
  headerContainer: {

  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 27,
    fontWeight: 'bold',
    paddingTop:20,
    paddingBottom:20,
  },
});

export default MainContainer;
