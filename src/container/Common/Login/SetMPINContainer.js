import React, { useState, useEffect, useRef } from 'react';
import SetMPINComponent from '../../../screens/Common/Login/SetMPINComponent';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../../components/common/ShowToast';
import { persistMpin } from '../../../services/persistData';
import { CommonActions } from '@react-navigation/native';
import { removeToken, removeMpin, getToken } from '../../../services/persistData';
import { getData, postData } from '../../../services/rootService';
import { connect } from 'react-redux';

const SetMPINContainer = (props) => {
    const [mpin, setMpin] = useState('');
    const [confirmMpin, setConfirmMpin] = useState('');
    const [hideMpin, setHideMpin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onClickContinueSetMin = async () => {
        // const cmpin = await getMpin();
        // if(mpin.length<4){
        //     message = 'Enter valid MPIN';
        //     showToast(message);
        //     return;
        // }
        // if(cmpin==mpin){
        setIsLoading(true);
        // const isResponce = await getTransactions();
        const isResponce1 = await getProfile();
        const isResponce2 = await getConfigs();
        if (isResponce1 && isResponce2) {
            console.log("isResponce1", isResponce1);
            let rootingName = "";
            // if(isResponce1.role=="Manager") {
            //     rootingName = "ManagerHomeComponent";
            // } else 
            if (isResponce1.role == isResponce1.role == "Biller" || isResponce1.role == "Cashier" ) {
                rootingName = "RedeemerTabNavigation";
            } else if (isResponce1.role == "Validator" ) {
                rootingName = "ValidatorTabNavigation";
            } else {
                // rootingName = "DistributorTabNavigation";
                showToast("Access denied.")
            }
            setIsLoading(false)
            {rootingName && (Platform.OS === 'android' ? (navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: rootingName,
                        },
                    ],
                }),
            )) : (navigation.navigate(rootingName)) )}
        } else {
            setIsLoading(false);
        }
        // }else{
        //     message = 'Invalid MPIN';
        //     showToast(message);
        //     return;
        // }
    }

    const getProfile = async () => {
        const token = await getToken();
        const response = await getData('api/app/coupon/user_profile', null, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                return false;
            }
            props.updateuser(response.data);
            return response.data;
        } else {
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
            return false;
        }
    }

    const getConfigs = async () => {
        const token = await getToken();
        const response = await getData('api/app/appconfig', null, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                return false;
            }
            props.updateconfigs(response.data);
            return true;
        } else {
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
            return false;
        }
    }

    const onClickContinue = async () => {
        if (mpin.length < 4 || mpin !== confirmMpin) {
            message = 'Enter valid MPIN';
            showToast(message);
            return;
        }
        const isPersist = await persistMpin(mpin);
        if (isPersist) {
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [
            //         {
            //             name: 'MPINLoginContainer',
            //         },
            //         ],
            //     }),
            // );
            onClickContinueSetMin();
        }
    }

    return (
        <SetMPINComponent
            onClickContinue={onClickContinue}
            mpin={mpin}
            setMpin={setMpin}
            confirmMpin={confirmMpin}
            setConfirmMpin={setConfirmMpin}
            hideMpin={hideMpin}
            setHideMpin={setHideMpin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
}

// export default ;
const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    sTransactions: state.transactionsreducer.sTransactions,
    usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount
});


const mapDispatchToProps = dispatch => ({
    updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
    updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
    updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } }),
    updateconfigs: (appConfigs) => dispatch({ type: 'UPDATE_APP_CONFIGS', payload: { appConfigs: appConfigs } })
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMPINContainer)