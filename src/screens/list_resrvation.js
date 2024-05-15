import React, { useState } from "react";
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

const List_resrvation = () => {
  const [postName, setPostName] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageLink, setImageLink] = useState("");

  // Define your list of categories
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    // Add more categories as needed
  ];

  const handleAddPost = () => {
    console.log("Post name:", postName);
    console.log("Post content:", postContent);
    console.log("Post tags:", postTags);
    console.log("Selected category:", selectedCategory);
    console.log("Image link:", imageLink);
  };

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
        {/* Dropdown list of categories */}
        <Picker
          selectedValue={selectedCategory}
          style={styles.categoryPicker}
          onValueChange={(itemValue, itemIndex) =>
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
          start={{ x: 0, y: 0 }} // From left
          end={{ x: 1, y: 0 }} // To right
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
    color: "red",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "gray",
  },
  categoryPicker: {
    borderWidth: 1,
    borderColor: "balck",
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
    fontWeight:'bold',
    fontSize:20,
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

export default List_resrvation;
