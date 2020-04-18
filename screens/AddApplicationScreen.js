import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { FormLabel, FormInput, Input } from "react-native-elements";
import t from "tcomb-form-native";

const Form = t.form.Form;

const Status = t.enums({
  applied: "Applied",
  interview: "Interview",
  offer: "Offer"
 });
 
const Application = t.struct({
  company: t.String,
  role: t.String,
  salary: t.Integer,
  location: t.String,
  applied_via: t.String,
  status: Status,
  size: t.Integer,
  notes: t.String,
});

const options = {
  fields: {
    status: {
      options: [
        {value: 'Applied', text: 'Applied'},
        {value: 'Interview', text: 'Interview'},
        {value: 'Offer', text: 'Offer'}
      ]
    }
  }
};

export default function AddApplicationScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <Form type={Application} options={options} />
      </View>
    </ScrollView>
  );
}

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginRight: 25,
    marginLeft: 25,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fe6b01",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
    alignItems: "center",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputText: {
    color: "white",
  },
});
