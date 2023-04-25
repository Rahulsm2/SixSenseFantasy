import React from 'react';
import LoginComponent from '../../components/Login/LoginComponent';
import { useNavigation } from '@react-navigation/core';

const LoginContainer = () => {

    const navigation = useNavigation();

    const onClickLogin = () => {
        navigation.navigate('SetMPINContainer');
    }

    const onClickForget = () => {
        navigation.navigate('ForgetPasswordContainer');
    }

    return (
        <LoginComponent
            onClickLogin={onClickLogin}
            onClickForget={onClickForget}
        />
    );
}

export default LoginContainer;