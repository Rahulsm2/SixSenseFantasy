import React from 'react';
import ProfileComponent from '../../components/Profile/ProfileComponent';
import { useNavigation } from '@react-navigation/core';
import {Alert} from 'react-native'
import { connect } from 'react-redux';
import { removeMpin, removeToken } from '../../services/persistData';
import {CommonActions} from '@react-navigation/native';

const ProfileContainer = (props) => {

    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    const onClickEditProf = () => {
        navigation.navigate('EditProfileContainer');
    }

    const loggingOut=async()=>{
        const token = await removeToken();
        const mpin = await removeMpin();
        if(token && mpin){
            props.logoutData();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    {
                        name: 'ForgetPasswordContainer',
                    },
                    ],
                }),
            );
        }
    }
    

    const onClickLogout=()=>{
        Alert.alert('Confirmation required', 'Do you really want to Log out ?', [
            {text: 'Cancel'},
            {text: 'Log out', onPress: () => loggingOut()},
          ]);
    }

    return (
        <ProfileComponent
            onClickBack={onClickBack}
            onClickEditProf={onClickEditProf}
            onClickLogout={onClickLogout}
            userData={props.userData}
        />
    );
}

// export default ProfileContainer;
const mapStateToProps = state => ({
    userData: state.userreducer.userData
  });
  
  
  const mapDispatchToProps = dispatch => ({
    logoutData:() => dispatch({type: 'USER_LOGGED_OUT'})
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)