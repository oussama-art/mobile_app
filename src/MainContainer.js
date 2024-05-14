import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Home from './screens/Home';
import AddPost from './screens/AddPost';
import Profile from './screens/Profile';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const Tab = createMaterialBottomTabNavigator();

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
        barStyle={{backgroundColor:'gray'}}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="home" color={focused ? "white" : "white"} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="reservation"
          component={AddPost} 
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="plus-circle" color={focused ? "white" : "white"} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account" color={focused ? "white" : "white"} size={26} />
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
    backgroundColor:'gray',

  },
  headerContainer: {

  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    paddingTop:20,
    paddingBottom:20,
  },
});

export default MainContainer;
