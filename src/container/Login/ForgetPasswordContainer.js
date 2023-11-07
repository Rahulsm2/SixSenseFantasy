import React, { useState,useEffect,useRef } from 'react';
import ForgetPasswordComponent from '../../components/Login/ForgetPasswordComponent';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../components/common/ShowToast';
import { persistToken } from '../../services/persistData';
import { postData } from '../../services/rootService';
import {CommonActions} from '@react-navigation/native';
import { connect } from 'react-redux';

const ForgetPasswordContainer = (props) => {
    
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [hideOtp, setHideOtp] = useState(true);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [response, setresponse] = useState('');
    const [timer, settimer] = useState(30);
    let resendOtpTimerInterval = useRef('');

    const navigation = useNavigation();

    useEffect(() => {
        if(isOtpSent){
          startResendOtpTimer();
        }else{
          settimer(30);
          clearInterval(resendOtpTimerInterval);
        }
    
        return () => {
          if (resendOtpTimerInterval) {
            clearInterval(resendOtpTimerInterval);
          }
        };
      }, [isOtpSent,timer]);
    
      const startResendOtpTimer = () => {
        if (resendOtpTimerInterval) {
          clearInterval(resendOtpTimerInterval);
        }
        resendOtpTimerInterval = setInterval(() => {
          if (timer <= 0) {
            clearInterval(resendOtpTimerInterval);
          } else {
            settimer(timer - 1);
          }
        }, 1000);
      };

    const onClickContinue = async () => {
        if (otp.length<4) {
            message = 'Enter valid OTP';
            showToast(message);
            return;
        } 
        // if (otp==response.otp) {
            // navigation.navigate('ResetPasswordContainer');
            // navigation.dispatch(
            //     CommonActions.reset({
            //         index: 0,
            //         routes: [
            //         {
            //             name: 'ResetPasswordContainer',
            //             params:{response:response,mobileNumber:mobileNumber}
            //         },
            //         ],
            //     }),
            // );
            setIsLoading(true)
          let formData = new FormData();
          formData.append('phone', mobileNumber);
          formData.append('code', otp);
          const response = await postData('api/app/otplogin', formData);
          console.log(response);
    
          if (response.statusCode === 200) {
            setIsLoading(false)
            if (response.errors) {
                showToast(response.message);
                return;
            }
            if(response.data.role=="Biller" || response.data.role=="Cashier" || response.data.role=="Manager"){
              props.updateuser(response.data)
              const isPersist = await persistToken(response.token.access_token);
              if(isPersist){
                  navigation.dispatch(
                      CommonActions.reset({
                          index: 0,
                          routes: [
                          {
                              name: 'SetMPINContainer',
                          },
                          ],
                      }),
                  );
              }
            }else{
              showToast("No Access");
              return;
            }
          } else {
            setIsLoading(false)
            response.message
              ? showToast(response.message)
              : showToast(
                  'Something went wrong, please try again later'
                );
          }
        // }else{
        //     message = 'Invalid OTP';
        //     showToast(message);
        //     return;
        // } 
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

    const onClickLoginWithPass=()=>{
      navigation.replace('LoginContainer');
    }

    return (
        <ForgetPasswordComponent
            onClickContinue={onClickContinue}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            otp={otp}
            setOtp={setOtp}
            hideOtp={hideOtp}
            setHideOtp={setHideOtp}
            isLoading={isLoading}
            isOtpSent={isOtpSent}
            setIsOtpSent={setIsOtpSent}
            onClickSendOTP={onClickSendOTP}
            timer={timer}
            onClickLoginWithPass={onClickLoginWithPass}
        />
    );
}

// export default ForgetPasswordContainer;
const mapStateToProps = state => ({
  userData: state.userreducer.userData,
});


const mapDispatchToProps = dispatch => ({
  updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}})
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)