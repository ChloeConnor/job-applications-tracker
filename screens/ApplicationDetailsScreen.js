import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Picker,
  Alert,
  Slider,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { TextInput } from "react-native";
import { AsyncStorage } from "react-native";
import {FormWithSubmit} from "../components/FormWithSubmit";


export default function ApplicationDetailsScreen() {
//   return <FormWithSubmit
//   formData={}></FormWithSubmit>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
  }
});
