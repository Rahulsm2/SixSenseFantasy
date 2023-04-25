import React from 'react';
import SetMPINComponent from '../../components/Login/SetMPINComponent';
import { useNavigation } from '@react-navigation/core';

const SetMPINContainer = () => {

    const navigation = useNavigation();

    const onClickContinue = () => {
        navigation.navigate('MPINLoginContainer');
    }

    return (
        <SetMPINComponent
            onClickContinue={onClickContinue}
        />
    );
}

export default SetMPINContainer;