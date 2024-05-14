import React, { useState } from "react";
import { Modal, View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import Icons from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const { height } = Dimensions.get("window");

const BottomPopup = ({ visible, onTouchOutside, title, comments }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  const handlePressOut = (event) => {
    if (!isScrolling) {
      onTouchOutside(event);
    }
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onTouchOutside}
      style={{ height: height }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "flex-end",
          marginTop: 29,
        }}
        activeOpacity={1}
        onPressOut={handlePressOut}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
          <ScrollView
            style={{ maxHeight: 200, marginTop: 10 }}
            onTouchStart={handleScrollBegin}
            onTouchEnd={handleScrollEnd}
            onScrollBeginDrag={handleScrollBegin}
            onScrollEndDrag={handleScrollEnd}
          >
            {comments && comments.map((comment, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{comment.username}</Text>
                <Text style={styles.comment}>{comment.comment}</Text>
                <Text style={{ color: "#888", fontSize: 12 }}>
                  {comment.datePosted}
                </Text>
              </View>
            ))}
          </ScrollView>
          {/* Input for adding a comment */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "#b0bec5",
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              placeholder="Add a comment..."
              // Implement comment input functionality here
            />
            <TouchableOpacity style={{ marginLeft: 10 }}>
              <Icons name="rightcircle" color="#7A81DC" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  commentsList: {
    maxHeight: 200,
  },
  commentContainer: {
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  comment: {
    marginLeft: 20,
  },
  datePosted: {
    fontStyle: "italic",
    color: "#b0bec5",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#b0bec5",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomPopup;
