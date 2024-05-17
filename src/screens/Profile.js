import React, { useState ,useEffect} from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/EvilIcons";
import { Picker } from "@react-native-picker/picker";
import BottomPopup from "./BottomPopup"; // Corrected import
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState("edit");
  const deleteToken = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    navigation.navigate("Login"); // Navigate to login screen
  };
  const togglePopup = (post) => {
    setSelectedPost(post);
    setPopupVisible(!popupVisible);
  };

  const handleEditAction = () => {
    // Implement edit post functionality
    setPickerVisible(false);
  };

  const handleDeleteAction = () => {
    // Implement delete post functionality
    setPickerVisible(false);
  };
  
 
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  

                
 
                
  useEffect(() => {
    const getToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync('secure_token');
        if (storedToken) {
          setToken(storedToken);
          
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (error) {
        console.error('Failed to get token', error);
      } finally {
        setLoading(false);
      }
    };

    getToken();
  }, [navigation]);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return null; // or a loading spinner
  }
  const user_info = () => {
    fetch("http://192.168.1.5:8085/api/users/mycompte", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("User Info:", data);
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };
  user_info();

  

  
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnlog} onPress={deleteToken}>
          <Text style={styles.textbtnlog}>Log out</Text>
        </TouchableOpacity>
        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{userInfo.email}</Text>
            <Text style={styles.userInfoLabel}>First Name:</Text>
            <Text style={styles.userInfoText}>{userInfo.first_name}</Text>
            <Text style={styles.userInfoLabel}>Last Name:</Text>  
            <Text style={styles.userInfoText}>{userInfo.last_name}</Text>
            <Text style={styles.userInfoLabel}>Role:</Text>
            <Text style={styles.userInfoText}>{userInfo.role}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  cardContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // For shadow on iOS
    shadowOpacity: 0.25, // For shadow on iOS
    shadowRadius: 3.84, // For shadow on iOS
  },
  btnlog: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  textbtnlog: {
    color: '#fff',
    fontSize: 20,
  },
  userInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userInfoLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    fontSize: 18,
  },
  userInfoText: {
    fontSize: 20,
    marginBottom: 10,
    color: '#444',
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoIcon: {
    marginRight: 10,
    color: '#666',
  },
  userInfoValue: {
    fontSize: 18,
    color: '#444',
  },
});

export default Profile;
