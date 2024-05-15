import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

const Tt = (props) => {
  const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const hh = () => {
    fetch("http://192.168.137.16:8085/api/Voyage", {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error));
  }

  return (
    <View>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        <Text>
            hello
        </Text>
        
        <Button onPress={hh} title="click">

        </Button>
    </View>
  );
};


export default Tt;
