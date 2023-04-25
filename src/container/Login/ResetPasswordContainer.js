import React from 'react';
import ResetPasswordComponent from '../../components/Login/ResetPasswordComponent';
import { useNavigation } from '@react-navigation/core';


const ResetPasswordContainer = () => {

    const navigation = useNavigation();

    const onClickSave = () => {
        navigation.navigate('TabNavigation');
    }

    return (
        <ResetPasswordComponent
            onClickSave={onClickSave}
        />
    );
}

export default ResetPasswordContainer;