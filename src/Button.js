import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Button({bgColor,txtColor,btnLabel,prs}) {
    return (
        <TouchableOpacity
        onPress={prs}
          style={{
            backgroundColor: bgColor,
            borderRadius: 100,
            alignItems: "center",
            paddingVertical: 5,
            width:'80%',
            marginVertical:10,
            height:50,
            marginTop:20,
          }}
        >
          <Text style={{ color: txtColor, fontSize: 25, fontWeight: "bold" }}>
            {btnLabel}
          </Text>
        </TouchableOpacity>
    )
}