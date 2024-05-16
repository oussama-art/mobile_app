import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Button,
  RefreshControl,
} from "react-native";
import { BASE_URL } from "../Config";

const { width } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const [voyages, setVoyages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchVoyages = useCallback(() => {
    fetch(BASE_URL + "/Voyage")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((voyage) => ({
          ...voyage,
          date_debut: formatDate(voyage.date_debut),
          date_fin: formatDate(voyage.date_fin),
        }));
        setVoyages(formattedData);
      })
      .catch((error) => console.error("Error fetching voyages: ", error));
  }, []);

  useEffect(() => {
    fetchVoyages();
  }, [fetchVoyages]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVoyages();
    setRefreshing(false);
  };

  // Function to format date in "year-month-day" format
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to handle navigation to voyage details screen
  const handleSelectVoyage = (voyage) => {
    navigation.navigate("VoyageDetailsScreen", { voyage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Voyages</Text>
      <FlatList
        data={voyages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.voyageItemContainer}>
            <TouchableOpacity
              style={styles.voyageItem}
              onPress={() => handleSelectVoyage(item)}
            >
              <Text style={styles.voyageName}>{item.name}</Text>
              <Image
                source={{ uri: `${BASE_URL}/images/${item.image}` }}
                style={styles.image}
              />
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.label}>Start Date:</Text>
              <Text style={styles.date}>{item.date_debut}</Text>
              <Text style={styles.label}>End Date:</Text>
              <Text style={styles.date}>{item.date_fin}</Text>
            </TouchableOpacity>
            <Button
              title="View Details"
              onPress={() => handleSelectVoyage(item)}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  voyageItemContainer: {
    marginBottom: 20,
  },
  voyageItem: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
  },
  voyageName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Home;
