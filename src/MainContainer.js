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
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.headerContainer}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Blog</Text>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="white"
        inactiveColor="white"
        barStyle={{paddingLeft:30,paddingRight:30,marginBottom:10,marginTop:10,marginLeft:10,marginRight:10,backgroundColor:'#7C4CEC', borderRadius:30}}
      >
        <Tab.Screen
          name="Home"
          component={Home}

          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="home" color={focused ? "#7C4CEC" : "white"} size={26} />
            ),
            tabBarStyle: { backgroundColor: 'blue' },
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPost}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="plus-circle" color={focused ? "#7C4CEC" : "white"} size={26} />
            ),
            tabBarStyle: { backgroundColor: 'blue' },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons name="account" color={focused ? "#7C4CEC" : "white"} size={26} />
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
    backgroundColor:'white',

  },
  headerContainer: {

  },
  header: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
  },
  headerText: {
    color: '#7C4CEC',
    fontSize: 27,
    fontWeight: 'bold',
    paddingTop:20,
    paddingBottom:20,
  },
});

export default MainContainer;
