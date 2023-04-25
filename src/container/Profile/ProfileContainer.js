import React from 'react';
import ProfileComponent from '../../components/Profile/ProfileComponent';
import { useNavigation } from '@react-navigation/core';

const ProfileContainer = () => {

    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    const onClickEditProf = () => {
        navigation.navigate('EditProfileContainer');
    }

    return (
        <ProfileComponent
            onClickBack={onClickBack}
            onClickEditProf={onClickEditProf}
        />
    );
}

export default ProfileContainer;