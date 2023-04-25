import React from 'react';
import ForgetPasswordComponent from '../../components/Login/ForgetPasswordComponent';
import { useNavigation } from '@react-navigation/core';

const ForgetPasswordContainer = () => {

    const navigation = useNavigation();

    const onClickContinue = () => {
        navigation.navigate('ResetPasswordContainer');
    }

    return (
        <ForgetPasswordComponent
            onClickContinue={onClickContinue}
        />
    );
}

export default ForgetPasswordContainer;