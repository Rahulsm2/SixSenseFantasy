import React from 'react';
import MPINLoginComponent from '../../components/Login/MPINLoginComponent';
import { useNavigation } from '@react-navigation/core';

const MPINLoginContainer = () => {

    const navigation = useNavigation();

    const onClickContinue = () => {
        navigation.navigate('TabNavigation');
    }

    const onClickForget = () => {
        navigation.navigate('LoginContainer');
    }

    return (
        <MPINLoginComponent
            onClickContinue={onClickContinue}
            onClickForget={onClickForget}
        />
    );
}

export default MPINLoginContainer;