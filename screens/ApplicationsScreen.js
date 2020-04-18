import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import {AsyncStorage} from 'react-native';

export default function ApplicationsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Card containerStyle={styles.card} titleStyle={styles.cardTitle} title="Google">
        <Text style={styles.optionText}> Software Developer</Text>
        <Text style={styles.optionText}> £80k</Text>
      </Card>
      <Card containerStyle={styles.card} titleStyle={styles.cardTitle} title="Facebook">
        <Text style={styles.optionText}> Software Engineer</Text>
        <Text style={styles.optionText}> £75k</Text>
      </Card>
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
    color: 'white'
  },
  card: {
    backgroundColor: "#fe6b01"
  },
  cardTitle: {
    color: "white"
  }
});
