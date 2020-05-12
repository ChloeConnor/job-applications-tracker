import React, { useState, useEffect } from "react";
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
import { StatusOptions } from "../components/StatusOptions";
import { InterviewDatePicker } from "../components/DateTimePicker";
import { Icon } from "react-native-elements";

function onSubmit(jobID, updatedFormValues, navigation) {
  if (jobID != undefined && jobID != "") {
    console.log("adding application:", JSON.stringify(updatedFormValues));
    AsyncStorage.setItem(jobID, JSON.stringify(updatedFormValues));
    Alert.alert("Added!");
    navigation.navigate("Applications");
  } else {
    Alert.alert("Invalid form");
  }
}

export const FormWithSubmit = ({ navigation }) => {
  const [formValues, setFormValues] = useState({});
  const [jobID, setJobID] = useState("");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setFormValues({ ...formValues, company: value });
            const id = value.toLowerCase().replace(" ", "");

            setJobID(id);
          }}
          placeholder="Company"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setFormValues({ ...formValues, role: value });
          }}
          placeholder="Role"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setFormValues({ ...formValues, salary: value });
          }}
          placeholder="Salary"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setFormValues({ ...formValues, company_size: value });
          }}
          placeholder="Company size"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setFormValues({ ...formValues, applied_via: value });
          }}
          placeholder="Applied via"
        ></TextInput>
        <Text></Text>
        <Text style={styles.text}>Stage</Text>
        <Picker
          style={styles.container}
          selectedValue={formValues.status}
          onValueChange={(itemValue, itemPosition) => {
            setFormValues({ ...formValues, status: itemValue });
          }}
        >
          <Picker.Item
            key={"Stage"}
            label="🔽 Select Stage"
            value={0}
            color={Colors.orange}
          >
            <Icon
              name="delete"
              size={25}
              color="black"
              style={{ height: 25, width: 25 }}
            ></Icon>
          </Picker.Item>
          {StatusOptions}
        </Picker>

        <Text></Text>
        <InterviewDatePicker
          setFormValues={setFormValues}
          formValues={formValues}
        ></InterviewDatePicker>

        <Text></Text>
        <Text></Text>
        <Text style={styles.text}>
          Interest level: {formValues["interest_level"] || 0}
        </Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={Colors.orange}
          maximumTrackTintColor={Colors.grey}
          onValueChange={(value) => {
            setFormValues({
              ...formValues,
              interest_level: value,
            });
          }}
          step={1}
        />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => onSubmit(jobID, formValues, navigation)}
          underlayColor="#dbdbdb"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
      <Text></Text>
    </ScrollView>
  );
};

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
    fontSize: 16,
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
