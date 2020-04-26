import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ApplicationsScreen from "../screens/ApplicationsScreen";
import AddApplicationScreen from "../screens/AddApplicationScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Get Started",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-code-working" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Applications"
        style={styles.button}
        component={ApplicationsScreen}
        options={{
          title: "Applications",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-rocket" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add Application"
        component={AddApplicationScreen}
        options={{
          title: "Add Application",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add-circle" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "Home";
    case "Applications":
      return "My applications";
    case "Add Application":
      return "Add new application";
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
  },
});