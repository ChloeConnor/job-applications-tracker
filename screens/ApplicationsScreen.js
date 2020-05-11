import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import Colors from "../constants/Colors";
import {
  getApplications,
  deleteApplication,
  getKeys,
} from "../storage/storageFunctions";
import { Icon } from "react-native-elements";
import { statusDict } from "../components/StatusOptions";

function moreDetails(jobID, navigation) {
  navigation.navigate("Details", {
    jobIDInput: jobID,
  });
}

function getValue(application, field) {
  return (application.filter(([key, value]) => key == field)[0] || [
    field,
    "Unknown",
  ])[1];
}

const Delete = ({ jobID }) => (
  <TouchableHighlight
    style={styles.buttonDelete}
    onPress={() => deleteApplication(jobID)}
    underlayColor="#dbdbdb"
  >
    <Icon
      name="delete"
      size={25}
      color="white"
      style={{ height: 25, width: 25 }}
    />
  </TouchableHighlight>
);

const Details = ({ jobID, navigation }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={() => moreDetails(jobID, navigation)}
    underlayColor="#dbdbdb"
  >
    <Icon
      name="arrow-forward"
      size={25}
      color="white"
      style={{ height: 25, width: 25 }}
    />
  </TouchableHighlight>
);

function ApplicationCards(applications, navigation) {
  console.log("applications", applications);

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
      const stage = statusDict[getValue(app, "status")];

      return (
        <Card
          containerStyle={styles.card}
          titleStyle={styles.cardTitle}
          title={company}
          key={jobID}
        >
          <Text style={styles.optionText}>Role: {role}</Text>
          <Text style={styles.optionText}>Stage: {stage}</Text>
          <Text></Text>
          <View styles={styles.buttonContainer}>
            <Details jobID={jobID} navigation={navigation}></Details>
            <Delete jobID={jobID}></Delete>
          </View>
        </Card>
      );
    });
  }
}

export default function ApplicationsScreen({ navigation }) {
  const [keys, setKeys] = useState([]);
  const [applications, setApplications] = useState({});

  useEffect(() => {
    getKeys(setKeys);
    getApplications(keys, setApplications);
  }, []);

  // hack because useEffect doesn't work
  function check() {
    getKeys(setKeys);
    getApplications(keys, setApplications);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {ApplicationCards(applications, navigation)}
      <Text></Text>
      <TouchableHighlight
        style={styles.updateButton}
        onPress={check}
        underlayColor="#dbdbdb"
      >
        <Text style={styles.buttonText}>UPDATE</Text>
      </TouchableHighlight>
      <Text></Text>
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
  icon: {
    marginRight: 12,
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: Colors.orange,
  },
  cardTitle: {
    color: "white",
  },
  button: {
    flex: 1,
    backgroundColor: Colors.orange,
    padding: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginRight: 10,
    marginLeft: 10,
  },
  buttonDelete: {
    flex: 1,
    backgroundColor: Colors.orange,
    padding: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
  },
  updateButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.orange,
    padding: 10,
    marginRight: 100,
    marginLeft: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
