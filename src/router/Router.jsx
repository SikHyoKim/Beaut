import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CustomerRoute from "./CustomerRoute";
import CustomBottomTab from "../components/CustomBottomTab";
import Calendars from "../pages/calendars/Calendars";
import Sales from "../pages/sales/Sales";
import Inventory from "../pages/inventory/Inventory";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const renderTabBar = props => <CustomBottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}
      backBehavior="history">
      <Tab.Screen name="일정" component={Calendars} />
      <Tab.Screen name="고객" component={CustomerRoute} />
      <Tab.Screen name="매출" component={Sales} />
      <Tab.Screen name="재고" component={Inventory} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
}

export default Router;