import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { TextInput } from "react-native";

const Status = {
  applied: "Applied",
  phoneInterview: "Phone interview",
  second_interview: "Second Interview",
  final_interview: "Final Interview",
  take_home_test: "Take home test",
  offer: "Offer",
  rejected: "Rejected",
  cancelled: "Cancelled",
};

const FormWithSubmit = () => {
  const [formValues, setFormValues] = useState({});

  function onSubmit() {
    console.log(formValues);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <TextInput
          onChangeText={(value) =>
            setFormValues({ company: value, ...formValues })
          }
        >
          Company
        </TextInput>
        <TextInput
          onChangeText={(value) =>
            setFormValues({ role: value, ...formValues })
          }
        >
          Role
        </TextInput>
        <TextInput
          onChangeText={(value) => {
            console.log(value)
            setFormValues({ salary: value, ...formValues })
          }}
        >
          Salary
        </TextInput>
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmit}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
      <View></View>
      <Text></Text>
    </ScrollView>
  );
};

export default function AddApplicationScreen() {
  return <FormWithSubmit></FormWithSubmit>;
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
  button: {
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
