import { AsyncStorage } from "react-native";
import { Alert } from "react-native";

export function getKeys(setKeys) {
  AsyncStorage.getAllKeys().then((key) => setKeys(key));
}
export function getApplications(keys, setApplications) {
  console.log("load all applications");
  AsyncStorage.multiGet(keys).then((job) => setApplications(job));
}

export function deleteApplication(jobID) {
  console.log("delete:", jobID);
  AsyncStorage.removeItem(jobID);
  Alert.alert("Deleted!");
}

export function getOneApplication(jobID, setApp) {
  console.log("getting application:", jobID);
  AsyncStorage.getItem(jobID).then((app) => setApp(JSON.parse(app)));
}

export function updateApplication(jobID, updatedApp) {
  console.log("updated app", updatedApp);
  AsyncStorage.mergeItem(jobID, JSON.stringify(updatedApp));
  Alert.alert("Updated!");
}
