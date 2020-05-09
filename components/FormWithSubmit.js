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
import { getOneApplication } from "../storage/storageFunctions";

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

// const CompanyField = () => (
//   <TextInput
//     style={styles.textInput}
//     defaultValue={jobID}
//     onChangeText={(value) => {
//       setUpdatedFormValues({ ...updatedFormValues, company: value });
//       const id = value.toLowerCase().replace(" ", "");
//       if (jobID == null) {
//         setJobID(id);
//       }
//     }}
//   ></TextInput>
// );

function onSubmit(jobID, updatedFormValues) {
  if (jobID != undefined && jobID != "") {
    AsyncStorage.setItem(jobID, JSON.stringify(updatedFormValues));
    Alert.alert("Added!");
    // navigation.navigate("Applications");
  } else {
    Alert.alert("Invalid form");
  }
}

export const FormWithSubmit = ({ jobIDInput }) => {
  const [updatedFormValues, setUpdatedFormValues] = useState({});
  const [jobID, setJobID] = useState(jobIDInput || {});
  const [interestLevel, setInterestLevel] = useState(0);

  console.log("jobid input: ", jobIDInput);

  useEffect(() => {
    if (jobIDInput != undefined) {
      getOneApplication(jobIDInput, setUpdatedFormValues);
    }
  }, [jobIDInput]);

  console.log("values:", updatedFormValues);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setUpdatedFormValues({ ...updatedFormValues, company: value });
            const id = value.toLowerCase().replace(" ", "");
            if (jobID == null) {
              setJobID(id);
            }
          }}
          placeholder="Company"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setUpdatedFormValues({ ...updatedFormValues, role: value });
          }}
          placeholder="Role"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setUpdatedFormValues({ ...updatedFormValues, salary: value });
          }}
          placeholder="Salary"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setUpdatedFormValues({ ...updatedFormValues, company_size: value });
          }}
          placeholder="Company size"
        ></TextInput>

        <TextInput
          style={styles.textInput}
          onChangeText={(value) => {
            setUpdatedFormValues({ ...updatedFormValues, applied_via: value });
          }}
          placeholder="Applied via"
        ></TextInput>

        <Picker
          style={styles.container}
          selectedValue={updatedFormValues.status}
          onValueChange={(itemValue, itemPosition) => {
            setUpdatedFormValues({ ...updatedFormValues, status: itemValue });
          }}
        >
          <Picker.Item key={"Stage"} label={"Stage"} value={0} />
          {statusOptions}
        </Picker>

        <Text></Text>
        <Text style={styles.text}>Interest level: {interestLevel}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={Colors.orange}
          maximumTrackTintColor={Colors.grey}
          onValueChange={(value) => {
            setUpdatedFormValues({
              ...updatedFormValues,
              interest_level: value,
            });
            setInterestLevel(value);
          }}
          step={1}
        />
        <Text></Text>
        <Text></Text>
        <TouchableHighlight
          style={styles.button}
          onPress={onSubmit(jobID, updatedFormValues)}
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
