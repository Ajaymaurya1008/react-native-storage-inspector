import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Storage from './screens/Storage';

export type RootStackParamList = {
  Home: undefined;
  Storage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Storage"
          component={Storage}
          options={{ headerBackButtonDisplayMode: 'minimal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
