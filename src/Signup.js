import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome6'; // Import FontAwesome5 icon
import axios from 'axios'; // Import Axios for making HTTP requests

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = () => {
    // Perform registration logic here
    axios.post('http://localhost:8080/Signup', {
      username,
      email,
      password
    })
    .then(response => {
      console.log(response.data); // Log response data
      alert("Successful Registration!");
      navigation.navigate("Login"); // Navigate to login screen after successful registration
    })
    .catch(error => {
      console.error('Registration failed:', error); // Log any errors
      alert("Registration failed. Please try again.");
    });
  };

  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <View style={styles.c2}>
        <FontAwesome5 name="user-check" size={150} color="rgba(255,255,255,0.1)" style={styles.iconBackground} />
        <FontAwesome5 name="user-check" size={90} color="white" style={styles.iconBackground1} />
        <Text style={styles.txtW}></Text>
        <View style={styles.c3}>
        <Text style={styles.txtWW}>Register</Text>

          <TextInput
            style={styles.input}
            placeholder="Email / Username"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegistration}>
            <LinearGradient
              colors={["#54B5F4", "#7C4CEC"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }} // From left
              end={{ x: 1, y: 0 }} // To right
            >
              <Text style={styles.buttonText}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.vNoAcc}>
            <Text style={styles.txtNoAcc}>Already have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.txtGoSignup}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  c2: {
    alignItems: 'center',
    width: '100%', 
    flex: 1,
    justifyContent: 'center',
  },
  iconBackground: {
    position: 'absolute',
    top: 90,
    left: 145,
  },
  iconBackground1: {
    position: 'absolute',
    top: 130,
    left: 170,
  },
  txtW: {
    color: 'white',
    fontSize: 55,
    fontWeight: 'bold',
    marginVertical: 20,
    marginBottom:100,
    marginTop:30,
  },
  txtWW:{
    color: '#7C4CEC',
    fontSize: 55,
    fontWeight: 'bold',
    marginBottom:50,
    marginTop:30,
  },
  c3: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 110,
    marginTop:50,
    alignItems:'center'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderRadius: 50,
    color:'grey',
    fontSize:20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    height: 50,
    width:'95%'
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
  vNoAcc:{
    flexDirection:'row',
    justifyContent:'center'
  },
  txtGoSignup:{
    color:'#7C4CEC',
    fontWeight:'bold',
    fontSize:16,
  },
  txtNoAcc:{
    color:'grey',
    fontWeight:'bold',
    fontSize:16,
  },
  iconBottom: {
    marginTop: 20,
  }
});
