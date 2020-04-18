import * as React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import t from "tcomb-form-native";
import Colors from "../constants/Colors";

const Form = t.form.Form;

const Status = t.enums({
  applied: "Applied",
  phoneInterview: "Phone interview",
  second_interview: "Second Interview",
  final_interview: "Final Interview",
  take_home_test: "Take home test",
  offer: "Offer",
});

const Application = t.struct({
  company: t.String,
  role: t.String,
  salary: t.Integer,
  company_size: t.Integer,
  location: t.String,
  applied_via: t.String,
  status: Status,
  notes: t.String,
});

const options = {
  fields: {
    status: {
      options: [
        { value: "applied", text: "Applied" },
        { value: "phoneInterview", text: "Phone interview" },
        { value: "second_interview", text: "Second Interview" },
        { value: "final_interview", text: "Final Interview" },
        { value: "take_home_test", text: "Take home test" },
        { value: "offer", text: "Offer" },
      ],
    },
  },
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
      <View>
        <TouchableHighlight
          style={styles.button}
          onPress={onPress}
          underlayColor="#99d9f4"
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
      <View></View>
      <Text></Text>
    </ScrollView>
  );
}

const onPress = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
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
