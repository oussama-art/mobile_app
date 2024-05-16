import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { BASE_URL } from "../Config";
import * as SecureStore from 'expo-secure-store';

const VoyageDetailsScreen = ({ navigation, route }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const { voyage } = route.params;

  const getToken = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('secure_token');
      if (storedToken) {
        setToken(storedToken);
        return storedToken;
      } else {
        navigation.navigate('Login');
        return null;
      }
    } catch (error) {
      console.error('Failed to get token', error);
      throw error;
    }
  };

  const getUser = async (token) => {
    try {
      const response = await fetch(BASE_URL + "/users/mycompte", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleReservation = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      Alert.alert('Loading', 'Please wait while we process your reservation.');
      const user = await getUser(token);
      if (user) {
        const response = await fetch(BASE_URL + "/reservation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            'User': user.id,
            'voyage': voyage.id
          }),
        });
        const data = await response.json();
        if (data) {
          Alert.alert('Success', 'Reservation made successfully!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', data.message || "Failed to make reservation");
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while making the reservation.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/images/${voyage.image}` }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{voyage.name}</Text>
          <Text style={styles.description}>{voyage.description}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Start Date:</Text>
            <Text style={styles.date}>{voyage.date_debut}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>End Date:</Text>
            <Text style={styles.date}>{voyage.date_fin}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>nombre de personne:</Text>
            <Text style={styles.date}>{voyage.nbr_reseve}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Ville:</Text>
            <Text style={styles.date}>{voyage.ville}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Prix:</Text>
            <Text style={styles.date}>{voyage.prix}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>transport:</Text>
            <Text style={styles.date}>{voyage.transport}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Make Reservation"
          onPress={handleReservation}
          color="#007bff"
        />
        <Button
          title="Go back to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default VoyageDetailsScreen;
