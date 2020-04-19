import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Icon } from "react-native-elements";
import { AsyncStorage } from "react-native";
import Colors from "../constants/Colors";

function deleteApplication(jobID) {
  console.log("delete")
  console.log(jobID)
  // AsyncStorage.removeItem(jobID);
}

function applicationCards(applications) {
  return Object.entries(applications).map(([key, value]) => {
    console.log(value);
    const app = Object.entries(JSON.parse(value[1]));
    const id = value[0];

    const company = app.filter(([key, value]) => key == "company")[0][1];
    const role = app.filter(([key, value]) => key == "role")[0][1];
    const salary = app.filter(([key, value]) => key == "salary")[0][1];

    return (
      <Card
        containerStyle={styles.card}
        titleStyle={styles.cardTitle}
        title={company}
      >
        <Text style={styles.optionText}>{role}</Text>
        <Text style={styles.optionText}>{salary}</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={deleteApplication(id)}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
      </Card>
    );
  });
}

export default function ApplicationsScreen() {
  const [keys, setKeys] = useState([]);
  const [applications, setApplications] = useState({});

  function getApplications() {
    AsyncStorage.getAllKeys().then((key) => setKeys(key));
    AsyncStorage.multiGet(keys).then((job) => setApplications(job));
  }

  useEffect(() => {
    getApplications();
  }, [keys]);

  function check() {
    getApplications();
    console.log(applications);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {applicationCards(applications)}
      <Text></Text>
      <TouchableHighlight
        style={styles.button}
        onPress={check}
        underlayColor="#99d9f4"
      >
        <Text style={styles.buttonText}>CHECK</Text>
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
