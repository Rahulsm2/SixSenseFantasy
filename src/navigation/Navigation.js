import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from '../container/HomeContainer';
import FinalTeam from '../screens/FinalTeam';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeContainer"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
        }}
      >
        <Stack.Screen
          name="HomeContainer"
          component={HomeContainer}
        />
        <Stack.Screen
          name="FinalTeam"
          component={FinalTeam}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
