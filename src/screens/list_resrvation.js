import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { BASE_URL } from "../Config";

const List_reservation = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync('secure_token');
      if (!storedToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return;
      }
      setToken(storedToken);

      const res = await fetch(`${BASE_URL}/reservation/my`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const reservationsData = await res.json();
      setReservations(reservationsData);

      const voyagesPromises = reservationsData.map(async (reservation) => {
        const voyageRes = await fetch(`${BASE_URL}/Voyage/${reservation.voyage}`);
        if (!voyageRes.ok) {
          throw new Error(`Failed to fetch voyage ${reservation.voyage}`);
        }
        const voyageData = await voyageRes.json();
        return { ...reservation, voyage: voyageData };
      });
      const resolvedVoyages = await Promise.all(voyagesPromises);
      setReservations(resolvedVoyages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Button title="Retry" onPress={fetchData} />
      </View>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>List of Reservations</Text>
        {reservations.map((reservation) => (
          <View key={reservation.id}>
            <Text style={styles.reservationTitle}>Reservation Date: {new Date(reservation.date[0], reservation.date[1] - 1, reservation.date[2], reservation.date[3], reservation.date[4], reservation.date[5]).toLocaleDateString()}</Text>
            <Text style={styles.reservationTitle}>Voyage: {reservation.voyage.name}</Text>
            <Text style={styles.voyagePrice}>Price: {reservation.voyage.prix}</Text>
            
</View>
          
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reservationTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reservationContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reservationText: {
    fontSize: 18,
  },
});

export default List_reservation;
