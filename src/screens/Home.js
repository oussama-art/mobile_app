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
  

  
};



export default Home;
