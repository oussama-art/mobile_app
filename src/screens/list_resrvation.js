import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const List_reservation = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const navigation = useNavigation();

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

  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
  ];

  const handleAddPost = () => {
    console.log("Post name:", postName);
    console.log("Post content:", postContent);
    console.log("Post tags:", postTags);
    console.log("Selected category:", selectedCategory);
    console.log("Image link:", imageLink);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return null; // or a loading spinner
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Post Name"
        value={postName}
        onChangeText={setPostName}
      />
      <TextInput
        style={styles.input}
        placeholder="Write your post here..."
        multiline
        value={postContent}
        onChangeText={setPostContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Add tags (optional)"
        value={postTags}
        onChangeText={setPostTags}
      />
      <TextInput
        style={styles.input}
        placeholder="Image Link"
        value={imageLink}
        onChangeText={setImageLink}
      />
      <View style={styles.categoryContainer}>
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.categoryPicker}
          onValueChange={(itemValue) =>
            setSelectedCategory(itemValue)
          }
        >
          {categories.map((category, index) => (
            <Picker.Item label={category} value={category} key={index} />
          ))}
        </Picker>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPost}>
        <LinearGradient
          colors={["#54B5F4", "#7C4CEC"]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.addButtonLabel}>Add Post</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    padding: 10,
    marginBottom: 20,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "gray",
  },
  categoryPicker: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "white",
    color: "gray",
  },
  addButton: {
    borderRadius: 25,
    height: 100,
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    width: "100%",
  },
  addButtonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default List_reservation;
