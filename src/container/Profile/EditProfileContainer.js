import React from 'react';
import EditProfileComponent from '../../components/Profile/EditProfileComponent';
import { useNavigation } from '@react-navigation/core';

const EditProfileContainer = () => {

    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    return (
        <EditProfileComponent
            onClickBack={onClickBack}
        />
    );
}

export default EditProfileContainer;