import { AsyncStorage } from "react-native";

export function getApplications(setKeys, setApplications) {
  console.log("load all applications");
  AsyncStorage.getAllKeys().then((key) => setKeys(key));
  AsyncStorage.multiGet(keys).then((job) => setApplications(job));
}

export function deleteApplication(jobID) {
  console.log("delete ", jobID);
  console.log(jobID);
  AsyncStorage.removeItem(jobID);
}

export function getOneApplication(jobID) {
  console.log("getting application: ", jobID);
  AsyncStorage.getItem(jobID);
}
