import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';

import { violet } from "./Constant";
import MainContainer from "./MainContainer";

const Login = (props) => {
  const setToken = (token) => {
    return SecureStore.setItemAsync('secure_token', token);
};

const getToken = () => {
    return SecureStore.getItemAsync('secure_token');
};
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
//   function handleSubmit(e) {
//     e.preventDefault();

//     fetch("http://24.10.0.209:8085/api/auth/authenticate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "email": email,
//       "password": password,
//     }),
// })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.token) {
//           setToken(data.token);
//             console.log(getToken());
//             // Navigate to MainContainer
//             props.navigation.navigate("MainContainer");
        
//         } else {
//           console.log(data.message);
//         }
//       })
//       .catch((error) => console.log(error));
//   }


  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <View style={styles.c2}>
        <Text style={styles.txtW}>Login</Text>
        <View style={styles.c3}>
          <Text style={styles.txtV}>Welcome Back</Text>
          <Text style={styles.txtG}>Login to your account</Text>
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
            style={styles.forgotPswdContainer}
          >
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.txtForgotPswd}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <LinearGradient
              colors={["#54B5F4", "#7C4CEC"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }} // From left
              end={{ x: 1, y: 0 }} // To right
            >
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.vNoAcc}>
            <Text style={styles.txtNoAcc}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text style={styles.txtGoSignup}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  c2: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
  loginTextGradient: {
    marginBottom: 25,
  },
  txtW: {
    fontSize: 55,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
    
    // Set text color to white for better contrast
    color: "white",
  },
  txtV: {
    fontSize: 40,
    color: "#7C4CEC",
    fontWeight: "bold",
  },
  txtG: {
    color: "#253660",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  c3: {
    backgroundColor: "rgba(255,255,255,0.4)",
    flex: 1,
    width: "100%",
    borderTopRightRadius: 110,
    paddingTop: 100,
    alignItems: "center",
  },
  txtForgotPswd: {
    color: "#7A81DC",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPswdContainer: {
    alignSelf: "flex-end", // Align to the right
    marginRight: "10%", // Add some margin to the right
    marginBottom: 160,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 50,
    color:'grey',
    fontSize:20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    height: 50,
    width: "95%",
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 20,
    fontWeight:'bold',
    fontSize:20,
    height: 50,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  vNoAcc: {
    flexDirection: "row",
    justifyContent: "center",
  },
  txtGoSignup: {
    color: "#7C4CEC",
    fontWeight: "bold",
    fontSize: 16,
  },
  txtNoAcc: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 16,
  },
});
