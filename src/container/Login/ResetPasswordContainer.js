import React, { useState,useEffect,useRef } from 'react';
import ResetPasswordComponent from '../../components/Login/ResetPasswordComponent';
import { useNavigation,useRoute } from '@react-navigation/core';
import { showToast } from '../../components/common/ShowToast';
import { persistToken } from '../../services/persistData';
import { postData } from '../../services/rootService';
import {CommonActions} from '@react-navigation/native';


const ResetPasswordContainer = () => {
    
    const route = useRoute();
    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [responses, setresponse] = useState(route.params.response);
    const [mobileNumber, setmobileNumber] = useState(route.params.mobileNumber);

    const navigation = useNavigation();

    const onClickSave = async () => {
        if(password!=confPassword){
            message = 'Password not matching.';
            showToast(message);
            return;
        }else{
            setIsLoading(true)
            let formData = new FormData();
            formData.append('phone', mobileNumber);
            formData.append('otp', responses.otp);
            formData.append('password', password);
            const response = await postData('api/app/reset_password', formData);
            console.log(response);
        
            if (response.statusCode === 200) {
                setIsLoading(false)
                if (response.errors) {
                    showToast(response.message);
                    return;
                }
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                        {
                            name: 'LoginContainer',
                        },
                        ],
                    }),
                );
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
        />
    );
}

export default ResetPasswordContainer;