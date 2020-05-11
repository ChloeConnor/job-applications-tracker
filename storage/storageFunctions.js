import { AsyncStorage } from "react-native";

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
  //doesn't remove from array just removes value
}

export function getOneApplication(jobID, setApp) {
  console.log("getting application:", jobID);
  AsyncStorage.getItem(jobID).then(app => setApp(JSON.parse(app)));
}
