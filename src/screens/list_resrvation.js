import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook
import { BASE_URL } from "../Config";

const List_reservation = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Use isFocused hook to determine if the component is focused

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
      console.log("reservations", reservations)

      // Fetch details of associated voyages for each reservation
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
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) { // Refetch reservations data when the component is focused
      fetchData();
    }
  }, [isFocused]); // Add isFocused to the dependency array

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>List of Reservations</Text>
        {/* Display reservations and associated voyage details */}
        {reservations.map((reservation) => (
          <View key={reservation.id}>
            <Text>Voyage: {reservation.voyage.name}</Text>
            {/* Display other reservation details as needed */}
          </View>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default List_reservation;
