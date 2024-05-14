import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Fields = (props) => {
  return( 
  <TextInput {...props} 
  placeholderTextColor={"grey"} style={styles.txt}>
  </TextInput>);
};

export default Fields;

const styles = StyleSheet.create({
  txt: {
    borderRadius: 100,
    color: "#7A81DC",
    paddingHorizontal: 30,
    width:'80%',
    backgroundColor:'rgba(0, 0, 0,0.1)',
    height:50,
    marginTop:20,
  },
});
