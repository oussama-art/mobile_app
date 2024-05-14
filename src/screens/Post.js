import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Post = ({ route }) => {
  // Access post data from route params
  return (
    <View style={styles.postContainer}>
      <Text style={[styles.username, styles.usernameTop]}>{post.username}</Text>
      <Image source={post.imagePost} style={styles.imagePost} />
      <View style={styles.postInfoContainer}>
        <TouchableOpacity style={styles.actionButton}>
          {/* Replace text with heart icon */}
          <Icon name="heart" color="#b0bec5" size={20} />
        </TouchableOpacity>
        <Text style={styles.likesCount}>{post.likes}</Text>
        <TouchableOpacity style={[styles.actionButton, styles.btnCmnt]}>
          {/* Replace text with comment icon */}
          <Icon name="comment" color="#b0bec5" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.usernameConten}>{post.username}</Text>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      <Text style={styles.datePosted}>Posted on {post.datePosted}</Text>
      <View style={styles.commentSection}>
        {/* Section to write a comment */}
        {/* You can add TextInput here for writing comments */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  username: {
    fontWeight: "bold",
    color: "black",
  },
  usernameTop: {
    marginBottom: 10,
  },
  imagePost: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  postInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  actionButton: {
    marginRight: 10,
  },
  likesCount: {
    marginRight: 10,
  },
  btnCmnt: {
    marginRight: 10,
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  usernameConten: {
    fontWeight: "bold",
    marginRight: 5,
    color: "black",
  },
  content: {
    color: "black",
  },
  datePosted: {
    color: "gray",
    marginBottom: 10,
  },
  commentSection: {
    // Style your comment section here
  },
});

export default Post;
