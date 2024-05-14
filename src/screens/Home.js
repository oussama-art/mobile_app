import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/EvilIcons";
import BottomPopup from "./BottomPopup";
import { MaterialCommunityIcons } from "react-native-vector-icons";


const { width } = Dimensions.get("window");

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState([]);

  const togglePopup = (comments) => {
    setSelectedPostComments(comments);
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  // Dummy data for posts
  const posts = [
    {
      id: 1,
      username: "JohnDoe",
      imagePost: require("./assests/post.jpg"), // Example image path
      content:
        "This is the content of the first post. It may be a long content that exceeds the screen size.",
      datePosted: "May 12, 2024",
      likes: 10,
      views: 100,
      comments: [
        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },
      ],
    },
    {
      id: 2,
      username: "JaneSmith",
      imagePost: require("./assests/post.jpg"), // Example image path
      content: "Another post content here.",
      datePosted: "May 13, 2024",
      likes: 20,
      views: 200,
      comments: [
        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },
      ],
    },
    {
      id: 3,
      username: "JaneSmith",
      imagePost: require("./assests/post.jpg"), // Example image path
      content: "Another post content here.",
      datePosted: "May 13, 2024",
      likes: 20,
      views: 150,
      comments: [
        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },
        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },        {
          id: 1,
          username: "JaneSmith",
          comment: "Nice post hhh!",
          datePosted: "May 13, 2024",
        },
        {
          id: 2,
          username: "JohnDoe",
          comment: "Thanks!",
          datePosted: "May 14, 2024",
        },
      ],
    },
    // Add more posts as needed
  ];

  return (
    <View style={styles.container}>
      {/* Header with search bar and search button */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts..."
            // Implement search functionality here
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" color="#b0bec5" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Map through the posts and render each post */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.username}>{post.username}</Text>
            <Image source={post.imagePost} style={styles.imagePost} />
            <View style={styles.postInfoContainer}>
              <TouchableOpacity style={styles.actionButton}>
                {/* Replace text with heart icon */}
                <Icon name="heart-o" color="#b0bec5" size={20} />
              </TouchableOpacity>
              <Text style={styles.likesCount}>{post.likes}</Text>
              <TouchableOpacity style={[styles.actionButton, styles.eyeButton]}>
                {/* Replace text with eye icon */}
                <MaterialCommunityIcons name="eye-outline" color="#b0bec5" size={25} />
              </TouchableOpacity>
              <Text style={styles.viewsCount}>{post.views}</Text>
              {/* Comment button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.commentButton]}
                onPress={() => togglePopup(post.comments)}
              >
                <Icons name="comment" color="#CED0CE" size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.content}>{post.content}</Text>
            </View>
            <Text style={styles.datePosted}>Posted on {post.datePosted}</Text>
          </View>
        ))}
      </ScrollView>
      {/* Popup for comments */}
      <BottomPopup
        title="Comments"
        visible={isPopupVisible}
        comments={selectedPostComments} // Changed prop name to "comments"
        onTouchOutside={closePopup}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
    marginTop: 80, // Adjust this value according to your header height
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#b0bec5",
    borderRadius: 20,
    marginBottom: 10,
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    marginBottom: 20,
    width: width - 40, // Set the width to screen width minus padding
    alignSelf: "center", // Center the post container horizontally
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
    marginBottom: 13,
  },
  content: {
    flex: 1,
    color: "black",
  },
  imagePost: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 9,
  },
  postInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeButton: {
    marginLeft: 10,
  },
  likesCount: {
    alignSelf: "center",
    marginLeft: 5,
    color: "#b0bec5",
  },
  viewsCount: {
    alignSelf: "center",
    marginLeft: 5,
    color: "#b0bec5",
  },
  datePosted: {
    fontStyle: "italic",
    marginBottom: 10,
    color: "#b0bec5",
  },
  commentButton: {
    marginLeft: 10,
  },
});

export default Home;
