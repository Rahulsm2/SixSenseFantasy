import React, { useState,useEffect,useRef } from 'react';
import MPINLoginComponent from '../../components/Login/MPINLoginComponent';
import { useNavigation } from '@react-navigation/core';
import { removeMpin, removeToken,getMpin } from '../../services/persistData';
import {CommonActions} from '@react-navigation/native';
import { showToast } from '../../components/common/ShowToast';
import { connect } from 'react-redux';
import { getData, postData } from '../../services/rootService';
import {getToken} from '../../services/persistData';

const MPINLoginContainer = (props) => {

    const navigation = useNavigation();
    const [hideMpin, setHideMpin] = useState(true);
    const [mpin, setMpin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onClickContinue = async () => {
        const cmpin = await getMpin();
        if(mpin.length<4){
            message = 'Enter valid MPIN';
            showToast(message);
            return;
        }
        if(cmpin==mpin){
            setIsLoading(true);
            // const isResponce = await getTransactions();
            const isResponce1 = await getProfile();
            const isResponce2 = await getConfigs();
            if(isResponce1 && isResponce2 && (isResponce1.role=="Biller" || isResponce1.role=="Cashier" || isResponce1.role=="Manager")){
                setIsLoading(false)
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                        {
                            name: 'TabNavigation',
                        },
                        ],
                    }),
                );
            }else{
                setIsLoading(false);
                showToast("No Access");
                return;
            }
        }else{
            message = 'Invalid MPIN';
            showToast(message);
            return;
        }
    }

    const getTransactions=async()=>{
        const token = await getToken();
        let formData = new FormData();
        formData.append('staff_id', '');
        const response = await postData('api/app/coupon/transaction_settled',formData, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                return false;
            }
            let allTransaction= response.settled_data.concat(response.notsettled_data);
            let totalAmount=0
            for (let i = 0; i < allTransaction.length; i++) {
                totalAmount=totalAmount+Number(allTransaction[i].amount_used);
            }
            props.updateTotalAmount(totalAmount);
            props.updatesTransactions(response.settled_data.reverse());
            props.updateusTransactions(response.notsettled_data.reverse());
            return true;
        } else {
            onClickForget();
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
            return false;
        }
    }

    const getProfile=async()=>{
        const token = await getToken();
        const response = await getData('api/app/coupon/user_profile',null, token);
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

    const getConfigs=async()=>{
        const token = await getToken();
        const response = await getData('api/app/appconfig',null, token);
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

    const onClickForget = async () => {
        const token = await removeToken();
        const mpin = await removeMpin();
        if(token && mpin){
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

    return (
        <MPINLoginComponent
            onClickContinue={onClickContinue}
            onClickForget={onClickForget}
            mpin={mpin}
            setMpin={setMpin}
            hideMpin={hideMpin}
            setHideMpin={setHideMpin}
            isLoading={isLoading}
        />
    );
}

// export default MPINLoginContainer;
const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    sTransactions: state.transactionsreducer.sTransactions,
    usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount
  });
  
  
  const mapDispatchToProps = dispatch => ({
    updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}}),
    updatesTransactions:(sTransactions) => dispatch({type: 'UPDATE_S_TRANSACTIONS', payload: {sTransactions:sTransactions}}),
    updateusTransactions:(usTransactions) => dispatch({type: 'UPDATE_US_TRANSACTIONS', payload: {usTransactions:usTransactions}}),
    updateTotalAmount:(totalAmount) => dispatch({type: 'UPDATE_TOTAL_AMOUNT', payload: {totalAmount:totalAmount}}),
    updateconfigs:(appConfigs) => dispatch({type: 'UPDATE_APP_CONFIGS', payload: {appConfigs:appConfigs}})
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(MPINLoginContainer)