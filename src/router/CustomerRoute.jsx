import React from 'react';
import Customer from '../pages/Customer/Customer.jsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const CustomerRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Customer" component={Customer} />
    </Stack.Navigator>
  );
};

export default CustomerRoute;
