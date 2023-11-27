import React, { useState, useEffect, useRef } from 'react';
import ResetPasswordComponent from '../../../screens/Common/Login/ResetPasswordComponent';
import { useNavigation, useRoute } from '@react-navigation/core';
import { showToast } from '../../../components/common/ShowToast';
import { persistToken } from '../../../services/persistData';
import { postData } from '../../../services/rootService';
import { CommonActions } from '@react-navigation/native';


const ResetPasswordContainer = () => {

    const route = useRoute();
    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responses, setresponse] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [hideOtp, setHideOtp] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, settimer] = useState(30);
    let resendOtpTimerInterval = useRef('');

    const navigation = useNavigation();

    const onClickSave = async () => {
        if (password != confPassword) {
            message = 'Password not matching.';
            showToast(message);
            return;
        } else {
            setIsLoading(true)
            let formData = new FormData();
            formData.append('phone', mobileNumber);
            formData.append('otp', otp);
            formData.append('password', password);
            const response = await postData('api/app/reset_password', formData);
            console.log(response);

            if (response.statusCode === 200) {
                setIsLoading(false)
                if (response.errors) {
                    showToast(response.message);
                    return;
                }
                {Platform.OS === 'android' ? (navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'LoginContainer',
                            },
                        ],
                    }),
                )) : (navigation.navigate('LoginContainer')) }
            } else {
                setIsLoading(false)
                response.message
                    ? showToast(response.message)
                    : showToast(
                        'Something went wrong, please try again later'
                    );
            }
        }
    }
    const onClickSendOTP= async ()=>{
        settimer(30);
        if (mobileNumber.length<10) {
            message = 'Enter valid Mobile Number';
            showToast(message);
            return;
        } 
        setIsLoading(true)
        let formData = new FormData();
        formData.append('phone', mobileNumber);
        const response = await postData('api/app/otp', formData);
        console.log(response);
        if (response.statusCode === 200) {
            setIsLoading(false)
            if (response.errors) {
                showToast(response.message);
                return;
            }
            setresponse(response)
            setIsOtpSent(true);
        } else {
            setIsLoading(false)
            response.message
            ? showToast(response.message)
            : showToast(
                'Something went wrong, please try again later'
            );
        }
    }

    return (
        <ResetPasswordComponent
            onClickSave={onClickSave}
            hidePassword={hidePassword}
            setHidePassword={setHidePassword}
            password={password}
            setPassword={setPassword}
            confPassword={confPassword}
            setConfPassword={setConfPassword}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            hideOtp={hideOtp}
            setHideOtp={setHideOtp}
            isOtpSent={isOtpSent}
            setIsOtpSent={setIsOtpSent}
            onClickSendOTP={onClickSendOTP}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            otp={otp}
            setOtp={setOtp}
            timer={timer}
        />
    );
}

export default ResetPasswordContainer;