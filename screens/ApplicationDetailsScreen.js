import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Picker,
  Slider,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import {
  getOneApplication,
  updateApplication,
} from "../storage/storageFunctions";
import { StatusOptions } from "../components/StatusOptions";


export default function ApplicationDetailsScreen({ route, navigation }) {
  const { jobIDInput } = route.params;
  const [application, setApplication] = useState("");
  const [updatedApplication, setUpdatedApplication] = useState({});

  useEffect(() => {
    getOneApplication(jobIDInput, setApplication);
  }, [jobIDInput]);

  const stage = application["status"];
  const interestLevel = application["interest_level"];
  const company = application["company"];
  const role = application["role"];
  const salary = application["salary"];
  const size = application["company_size"];
  const via = application["applied_via"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Application info</Text>
        <Text style={styles.textField}>Company: {company}</Text>
        <Text style={styles.textField}>Role: {role}</Text>
        <Text style={styles.textField}>Salary: {salary}</Text>
        <Text style={styles.textField}>Company size: {size}</Text>
        <Text style={styles.textField}>Applied via: {via}</Text>
        <Text></Text>

        <Text style={styles.header}>Stage & Interest</Text>
        <Picker
          style={styles.textField}
          selectedValue={updatedApplication["status"] || stage}
          onValueChange={(itemValue, itemPosition) => {
            setUpdatedApplication({ ...updatedApplication, status: itemValue });
          }}
        >
          <Picker.Item key={"Stage"} label={"Stage"} value={stage} />
          {StatusOptions}
        </Picker>

        <Text></Text>
        <Text style={styles.textField}>
          Interest level: {updatedApplication["interest_level"] || application["interest_level"]}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={Colors.orange}
          maximumTrackTintColor={Colors.grey}
          onValueChange={(value) => {
            setUpdatedApplication({
              ...updatedApplication,
              interest_level: value,
            });
          }}
          step={1}
          value={interestLevel}
        />
        <Text></Text>
        <Text></Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => updateApplication(jobIDInput, updatedApplication)}
          underlayColor="#dbdbdb"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
      <Text></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 10,
    marginLeft: 10,
  },
  slider: {
    width: 200,
    height: 40,
    fontSize: 16,
    marginRight: 20,
    marginLeft: 20,
  },
  textField: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
    fontSize: 16,
  },
  header: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
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
  contentContainer: {
    paddingTop: 15,
  },
});
