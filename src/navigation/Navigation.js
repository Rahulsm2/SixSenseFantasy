import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { app_Bg } from '../components/common/Constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginContainer from '../container/Common/Login/LoginContainer';
import ForgetPasswordContainer from '../container/Common/Login/ForgetPasswordContainer';
import MPINLoginContainer from '../container/Common/Login/MPINLoginContainer';
import ResetPasswordContainer from '../container/Common/Login/ResetPasswordContainer';
import SetMPINContainer from '../container/Common/Login/SetMPINContainer';
import HomeContainer from '../container/Validator/HomeContainer';
import ValidatorTabNavigation from './ValidatorTabNavigation';
import ChangeMpinContainer from '../container/Common/Profile/ChangeMpinContainer';
import RedeemerTabNavigation from './RedeemerTabNavigation';
import TransactionContainer from '../container/Redeemer/TransactionContainer';
// import EditProfileContainer from '../container/Profile/EditProfileContainer';

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
        <Stack.Screen name="RedeemerTabNavigation" component={RedeemerTabNavigation} />
        <Stack.Screen name="ValidatorTabNavigation" component={ValidatorTabNavigation} />
        <Stack.Screen name="HomeContainer" component={HomeContainer} />
        <Stack.Screen name="TransactionContainer" component={TransactionContainer} />
        <Stack.Screen name='ChangeMpinContainer' component={ChangeMpinContainer} />
        {/* <Stack.Screen name="EditProfileContainer" component={EditProfileContainer} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;