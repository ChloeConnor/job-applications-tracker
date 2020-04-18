import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Picker,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { TextInput } from "react-native";
import { AsyncStorage } from "react-native";

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

const FormWithSubmit = () => {
  const [formValues, setFormValues] = useState({});
  const [keys, setKeys] = useState([]);
  const [applications, setApplications] = useState();

  function getApplications() {
    AsyncStorage.getAllKeys().then((key) => setKeys(key));
    AsyncStorage.multiGet(keys).then((job) => setApplications(job));
  }

  function onSubmit() {
    AsyncStorage.setItem("ID1", JSON.stringify(formValues));
  }

  function check() {
    getApplications();

    Object.entries(applications).forEach(([key, value]) => {
  
      const app = Object.entries(JSON.parse(value[1]));

      const company = app.filter(([key, value]) => key == "company")
      console.log(company[0][1]);
    });
  }

  const statusOptions = Object.entries(statusDict).map(([key, value]) => (
    <Picker.Item label={value} value={key} key={key} />
  ));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(event) => {
            setFormValues({ ...formValues, company: event });
          }}
        >
          Company
        </TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={(event) => {
            setFormValues({ ...formValues, role: event });
          }}
        >
          Role
        </TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={(event) => {
            setFormValues({ ...formValues, salary: event });
          }}
        >
          Salary
        </TextInput>
        <Picker
          style={styles.container}
          selectedValue={formValues.status}
          onValueChange={(itemValue, itemPosition) => {
            setFormValues({ ...formValues, status: itemValue });
          }}
        >
          {statusOptions}
        </Picker>
        <Text></Text>
        <Text></Text>
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmit}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={check}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Check</Text>
        </TouchableHighlight>
      </View>
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
