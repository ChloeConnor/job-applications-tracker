import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import { AsyncStorage } from "react-native";
import Colors from "../constants/Colors";
import {
  getApplications,
  getOneApplication,
  deleteApplication,
} from "../storage/storageFunctions";

function moreDetails(jobID) {
  const applicationInfo = getOneApplication(jobID);
  navigation.navigate('Details')
}

function getValue(application, field) {
  return (application.filter(([key, value]) => key == field)[0] || [
    field,
    "Unknown",
  ])[1];
}

const Delete = ({ jobID }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => deleteApplication(jobID)}
    underlayColor="#dbdbdb"
  >
    <Text style={styles.buttonText}>Delete</Text>
  </TouchableHighlight>
);

const Details = ({ jobID }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => moreDetails(jobID)}
    underlayColor="#dbdbdb"
  >
    <Text style={styles.buttonText}>Details</Text>
  </TouchableHighlight>
);

function ApplicationCards(applications) {
  if (
    applications != undefined &&
    applications.length &&
    applications != null
  ) {
    return Object.entries(applications).map(([key, value]) => {
      const app = Object.entries(JSON.parse(value[1]));
      const jobID = value[0];

      const company = app.filter(([key, value]) => key == "company")[0][1];
      const role = getValue(app, "role");
      const salary = getValue(app, "salary");
      const stage = getValue(app, "stage");
      const interestLevel = getValue(app, "interest_level");
      const appliedVia = getValue(app, "applied_via");
      const companySize = getValue(app, "company_size");

      return (
        <Card
          containerStyle={styles.card}
          titleStyle={styles.cardTitle}
          title={company}
        >
          <Text style={styles.optionText}>Stage: {stage}</Text>
          <Text style={styles.optionText}>Role: {role}</Text>
          <Text style={styles.optionText}>Salary: {salary}</Text>
          <Text style={styles.optionText}>Applied Via: {appliedVia}</Text>
          <Text style={styles.optionText}>Company size: {companySize}</Text>
          <Text style={styles.optionText}>Interest level: {interestLevel}</Text>
          <Details jobID={jobID}></Details>
          <Delete jobID={jobID}></Delete>
        </Card>
      );
    });
  }
}

export default function ApplicationsScreen() {
  const [keys, setKeys] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    getApplications();
  }, []);

  // hack becayse useEffect doesn't work
  function check() {
    getApplications();
    console.log(applications);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {ApplicationCards(applications)}
      <Text></Text>
      <TouchableHighlight
        style={styles.button}
        onPress={check}
        underlayColor="#dbdbdb"
      >
        <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
    color: "white",
  },
  card: {
    backgroundColor: Colors.orange,
  },
  cardTitle: {
    color: "white",
  },
  button: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.orange,
    padding: 15,
    marginRight: 100,
    marginLeft: 100,
  },
});
