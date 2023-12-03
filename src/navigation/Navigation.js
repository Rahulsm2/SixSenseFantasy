import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { app_Bg } from '../components/common/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginContainer from '../container/Common/Login/LoginContainer';
import ForgetPasswordContainer from '../container/Common/Login/ForgetPasswordContainer';
import MPINLoginContainer from '../container/Common/Login/MPINLoginContainer';
import ResetPasswordContainer from '../container/Common/Login/ResetPasswordContainer';
import SetMPINContainer from '../container/Common/Login/SetMPINContainer';
import EditProfileContainer from '../container/Common/Profile/EditProfileContainer';
import ValidatorTabNavigation from '../navigation/ValidatorTabNavigation';
import ChangeMpinContainer from '../container/Common/Profile/ChangeMpinContainer';

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
        screenOptions={{ headerShown: false, gestureEnabled:false }}>
        {/* common screens */}
        <Stack.Screen name="LoginContainer" component={LoginContainer} />
        <Stack.Screen name="ForgetPasswordContainer" component={ForgetPasswordContainer} />
        <Stack.Screen name="MPINLoginContainer" component={MPINLoginContainer} />
        <Stack.Screen name="ResetPasswordContainer" component={ResetPasswordContainer} />
        <Stack.Screen name="SetMPINContainer" component={SetMPINContainer} />
        <Stack.Screen name="EditProfileContainer" component={EditProfileContainer} />

        {/* Validators Screens */}
        <Stack.Screen name="ValidatorTabNavigation" component={ValidatorTabNavigation} />
        <Stack.Screen name='ChangeMpinContainer' component={ChangeMpinContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;