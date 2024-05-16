import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default function Signup(props) {
  const navigation = useNavigation();

  const savetoken = async (token )=>{
    await SecureStore.setItemAsync('secure_token', token);
  }
  
  const gettoken = async()=>{
    return await SecureStore.getItemAsync('secure_token');
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log("ImagePicker result:", result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log("Image URI:", result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
     
    fetch("http://192.168.1.5:8085/api/auth/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.token) {
          savetoken(data.token);
          props.navigation.navigate("MainContainer");
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
  const home=()=>{
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainContainer' }],
    });
  }
  return (
    <LinearGradient colors={["#7C4CEC", "#FFFFFF"]} style={styles.container}>
      <KeyboardAvoidingView
        style={styles.c2}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >

        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.back} onPress={home}>
      <AntDesignIcon name="home" color="white" size={45} />
      </TouchableOpacity>
          <Text style={styles.txtW}>R
          egister</Text>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
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
    flex: 1,
    width: "100%",
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
    width: "100%",
    borderTopRightRadius: 110,
    paddingTop: 100,
    alignItems: "center",
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
  back:{
    position:'absolute',
    left:10,
    top:40,
    backgroundColor:'rgba(0, 0, 25, 0.2)',
    borderRadius:10,
    padding:10
  }
});
