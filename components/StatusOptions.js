import React from "react";
import { Picker } from "react-native";

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

export const StatusOptions = Object.entries(statusDict).map(([key, value]) => (
  <Picker.Item label={value} value={key} key={key} />
));
