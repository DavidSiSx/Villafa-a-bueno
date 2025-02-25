// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import GuestSearchScreen from './screens/GuestSearchScreen';
import GuestDetailScreen from './screens/GuestDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{ title: 'Bienvenido' }}
        />
        <Stack.Screen
          name="GuestSearch"
          component={GuestSearchScreen}
          options={{ title: 'Buscar Invitado' }}
        />
        <Stack.Screen
          name="GuestDetail"
          component={GuestDetailScreen}
          options={{ title: 'Detalles Invitado' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
