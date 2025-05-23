import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Submit from './src/screen/form/form';
import Ticket from './src/screen/ticket';


// Define your navigation types
export type RootStackParamList = {
  Submit: undefined;
  Tickets: undefined; // Changed from 'Dashboard' to 'Tickets' to match your code
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Submit">
        <Stack.Screen 
          name="Submit" 
          component={Submit} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Tickets" 
          component={Ticket} 
          options={{ title: 'Tickets' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;