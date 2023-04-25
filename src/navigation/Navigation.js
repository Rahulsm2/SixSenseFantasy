import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { app_Bg } from '../components/common/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginContainer from '../container/Login/LoginContainer';
import ForgetPasswordContainer from '../container/Login/ForgetPasswordContainer';
import MPINLoginContainer from '../container/Login/MPINLoginContainer';
import ResetPasswordContainer from '../container/Login/ResetPasswordContainer';
import SetMPINContainer from '../container/Login/SetMPINContainer';
import HomeContainer from '../container/Home/HomeContainer';
import TabNavigation from './TabNavigation';
import TransactionContainer from '../container/Home/TransactionContainer';
import EditProfileContainer from '../container/Profile/EditProfileContainer';

const Stack = createNativeStackNavigator();

const Navigation = (props) => {

  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={app_Bg}
        animated={true}
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName={props.initialScreen}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginContainer" component={LoginContainer} />
        <Stack.Screen name="ForgetPasswordContainer" component={ForgetPasswordContainer} />
        <Stack.Screen name="MPINLoginContainer" component={MPINLoginContainer} />
        <Stack.Screen name="ResetPasswordContainer" component={ResetPasswordContainer} />
        <Stack.Screen name="SetMPINContainer" component={SetMPINContainer} />
        <Stack.Screen name="HomeContainer" component={HomeContainer} />
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="TransactionContainer" component={TransactionContainer} />
        <Stack.Screen name="EditProfileContainer" component={EditProfileContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;