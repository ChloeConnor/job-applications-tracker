import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

export const InterviewDatePicker = ({ setFormValues, formValues }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [interviewDate, setInterviewDate] = useState(new Date());
  const [interviewTime, setInterviewTime] = useState(new Date());

  const [showInterviewDate, setShowInterviewDate] = useState(false);

  useEffect(() => {
    if (
      ["phone_interview", "second_interview", "final_interview"].includes(
        formValues["status"]
      )
    ) {
      setShowInterviewDate(true);
    }
  }, [formValues]);

  var date =
    formValues != null && interviewDate & interviewTime
      ? new Date(interviewDate + (interviewTime - new Date()))
      : new Date();

  useEffect(() => {
    setFormValues({ ...formValues, interview_date: date });
  }, [interviewDate, interviewTime]);

  if (showInterviewDate) {
    return (
      <View>
        <Text style={styles.text}>Interview date:</Text>
        <Text style={styles.text}>{date.toString()}</Text>
        <Text></Text>
        <View>
          <Button
            color={Colors.orange}
            onPress={() => setShowDatePicker(true)}
            title="Set interview date"
          />
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setInterviewDate(selectedDate.getTime());
              setShowTimePicker(true);
              setShowDatePicker(false);
            }}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) => {
              setInterviewTime(selectedTime.getTime());
              setShowTimePicker(false);
            }}
          />
        )}
      </View>
    );
  } else {
    return <Text style={styles.text}>No interview to schedule</Text>;
  }
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    height: 40,
    padding: 5,
    fontSize: 16,
  },
});
