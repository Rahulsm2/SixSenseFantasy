import React from 'react';
import ProfileComponent from '../../../screens/Common/Profile/ProfileComponent';
import { useNavigation } from '@react-navigation/core';
import { Alert, Share, Linking } from 'react-native'
import { connect } from 'react-redux';
import { removeMpin, removeToken, removeNodeToken } from '../../../services/persistData';
import { CommonActions } from '@react-navigation/native';
import { showToast } from '../../../components/common/ShowToast';

const ProfileContainer = (props) => {

    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    const onClickEditProf = () => {
        navigation.navigate('EditProfileContainer');
    }

    onClickChangeMpin = () => {
        navigation.navigate('ChangeMpinContainer');
    }

    // Hey there! Discover Ticketsque Insider, the ultimate solution for guest management, digital coupon distribution, verification, and redemption. Simplify operations, boost efficiency, and enhance the customer experience. Get it now on the Google Play Store: 

    const onClickShareApp = async () => {
        try {
            const result = await Share.share({
                title: 'Share Ticketsque Insider',
                message: 'Hey there! Discover Ticketsque Insider, the ultimate solution for guest management, digital coupon distribution, verification, and redemption. Simplify operations, boost efficiency, and enhance the customer experience. Get it now on the Google Play Store: https://play.google.com/store/apps/details?id=com.ticketsque.insider',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {

        }
    }

    const loggingOut = async () => {
        const token = await removeToken();
        const mpin = await removeMpin();
        const nodetoke = await removeNodeToken();
        if (token && mpin && nodetoke) {
            props.logoutData();
            {Platform.OS === 'android' ? (navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'ForgetPasswordContainer',
                        },
                    ],
                }),
            )) : (navigation.navigate('ForgetPasswordContainer')) 
            }
        }
    }


    const onClickLogout = () => {
        Alert.alert('Confirmation required', 'Do you really want to Log out ?', [
            { text: 'Cancel' },
            { text: 'Log out', onPress: () => loggingOut() },
        ]);
    }

    const onClickContact = () => {
        // let data = props.appConfigs;
        let phonedata = props.nodeUserData.partner.parent.mobile;
        // for (let i = 0; i < data.length; i++) {
        //     if (data[i].config_name == "contact_us") {
        //         phonedata = data[i].version;
        //     }
        // }
        Linking.openURL('tel:' + phonedata);
    }

    return (
        <ProfileComponent
            onClickBack={onClickBack}
            onClickEditProf={onClickEditProf}
            onClickLogout={onClickLogout}
            nodeUserData={props.nodeUserData}
            onClickShareApp={onClickShareApp}
            onClickContact={onClickContact}
            onClickChangeMpin={onClickChangeMpin}
        />
    );
}

// export default ProfileContainer;
const mapStateToProps = state => ({
    // userData: state.userreducer.userData,
    appConfigs: state.userreducer.appConfigs,
    nodeUserData: state.userreducer.nodeUserData
});


const mapDispatchToProps = dispatch => ({
    updatenodeuser: (nodeUserData) => dispatch({ type: 'UPDATE_NODE_USERDATA', payload: { nodeUserData: nodeUserData } }),
    logoutData: () => dispatch({ type: 'USER_LOGGED_OUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)