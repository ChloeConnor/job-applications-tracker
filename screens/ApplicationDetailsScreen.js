import React from "react";
import { StyleSheet } from "react-native";
import { FormWithSubmit } from "../components/FormWithSubmit";

export default function ApplicationDetailsScreen({ navigation }) {
  return (
    <FormWithSubmit jobIDInput="kroo" navigation={navigation}></FormWithSubmit>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
  },
});
