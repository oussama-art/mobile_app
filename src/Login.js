import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

const Login = (props) => {
  const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://192.168.137.16:8085/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        setToken(data.token);
        props.navigation.navigate("MainContainer");
      } else {
        console.log(data.message || "Failed Login");
      }
    })
    .catch(error => console.log(error));
  }

  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.formContainer}>
        
          <TextInput
            style={styles.input}
            placeholder="Email / Username"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ForgotPassword")}
            style={styles.forgotPasswordButton}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#7C4CEC",
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "rgba(255,255,255,0.4)",
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 25,
    color: "grey",
    fontSize: 18,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#7C4CEC",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    
  },
  
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpLink: {
    color: "#7C4CEC",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Login;
