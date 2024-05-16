import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from "../Config";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const deleteToken = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    navigation.navigate("Login"); // Navigate to login screen
  };

  const getUserInfo = () => {
    if (token) {
      fetch(BASE_URL + "/users/mycompte", {
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
          if (data) {
            setUser(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
      }
    };

    getToken();
  }, [navigation]);

  useEffect(() => {
    if (token) {
      getUserInfo();
    }
  }, [token]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!token || !user) {
    return null; // or a loading spinner
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          {user.image!="" ? (
            <Image source={{ uri: user.image }} style={styles.profileImage} />
          ) : (
            <View style={styles.defaultProfileContainer}>
              <AntDesignIcon name="user" color="rgba(0,0,0,0.5)" size={120} style={styles.defaultProfileImage} />
            </View>
          )}
          <Text style={styles.username}>{user.first_name + " " + user.last_name}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{user.email}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Nom:</Text>
            <Text style={styles.userInfoText}>{user.first_name}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Prenom:</Text>
            <Text style={styles.userInfoText}>{user.last_name}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoLabel}>Role:</Text>
            <Text style={styles.userInfoText}>{user.role}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnlog} onPress={deleteToken}>
          <Text style={styles.textbtnlog}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profileInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  defaultProfileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  defaultProfileImage: {
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  userInfoLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  userInfoText: {
    flex: 1,
  },
  btnlog: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  textbtnlog: {
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Profile;
