import React from "react";
import { useState } from 'react'; 
import { Button } from 'react-native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { ImagePicker } from 'expo-image-picker';

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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      if (image) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('photo', {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch("http://192.168.1.5:8085/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.token) {
        await setToken(data.token);
        console.log(await getToken());
        // Navigate to MainContainer
        props.navigation.navigate("MainContainer");
      } else {
        console.log(data.message || "Registration failed");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <View style={styles.c2}>
        <Text style={styles.txtW}>Register</Text>
        <View style={styles.c3}>
          <Text style={styles.txtV}>Create an Account</Text>
          <Text style={styles.txtG}>Please fill in the details below</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
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
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick Image</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
            <Text style={styles.txtNoAcc}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text style={styles.txtGoSignup}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
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
  txtW: {
    fontSize: 55,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 30,
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
    alignSelf: "flex-end",
    marginRight: "10%",
    marginBottom: 160,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    borderRadius: 50,
    color: "grey",
    fontSize: 20,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
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
    fontWeight: "bold",
    fontSize: 20,
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


const handleSubmit = async () => {

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstname', firstName);
      formData.append('lastname', lastName);
      if (image) {
        const uriParts = image.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('photo', {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch("http://192.168.1.5:8085/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const data = await response.json();
      if (data.token) {
        await setToken(data.token);
        console.log(await getToken());
        // Navigate to MainContainer
        props.navigation.navigate("MainContainer");
      } else {
        console.log(data.message || "Registration failed");
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

 

};

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };