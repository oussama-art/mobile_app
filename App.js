import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainContainer from "./src/MainContainer";
import Register from "./src/Register";
import Login from "./src/Login";
import Tt from "./src/tt"

const Stack = createNativeStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login" // or "Signup" based on your flow
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
