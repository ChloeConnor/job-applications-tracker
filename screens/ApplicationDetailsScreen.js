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

const statusDict = {
  applied: "Applied",
  phoneInterview: "Phone interview",
  second_interview: "Second Interview",
  final_interview: "Final Interview",
  take_home_test: "Take home test",
  offer: "Offer",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

const statusOptions = Object.entries(statusDict).map(([key, value]) => (
  <Picker.Item label={value} value={key} key={key} />
));



export default function AddApplicationScreen() {
  return <FormWithSubmit
  formData={}></FormWithSubmit>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
  },
  contentContainer: {
    paddingTop: 15,
  },
  textInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    padding: 5,
  },
  text: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    padding: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.orange,
    padding: 15,
    marginRight: 100,
    marginLeft: 100,
  },
  buttonText: {
    color: "white",
  },
});
