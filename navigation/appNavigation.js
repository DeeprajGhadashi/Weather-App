import * as React from 'react';
import { View, Text, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
    'Non-serialization value were found in the navigation state',
]);

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator  >
        <Stack.Screen name="Home" options={{headerShown:false}}  component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;