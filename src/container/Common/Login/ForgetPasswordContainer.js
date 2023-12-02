import React, { useState, useEffect, useRef } from 'react';
import ForgetPasswordComponent from '../../../screens/Common/Login/ForgetPasswordComponent';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../../components/common/ShowToast';
import { persistToken, persistNodeToken, persistNodeUser } from '../../../services/persistData';
import { getNodeData, postData, postNodeData } from '../../../services/rootService';
import { CommonActions } from '@react-navigation/native';
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
    if (isOtpSent) {
      startResendOtpTimer();
    } else {
      settimer(30);
      clearInterval(resendOtpTimerInterval);
    }

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [isOtpSent, timer]);

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
    if (otp.length < 4) {
      message = 'Enter valid OTP';
      showToast(message);
      return;
    }
    setIsLoading(true)
    let data = {
      'user': mobileNumber,
      'otp': otp
    }
    const response = await postNodeData('system/users/sign-in', data);
    console.log(response);

    if (response.statusCode === 200) {
        setIsLoading(false)
        console.log("node response", response);
        if (response.errors) {
          showToast( response.message);
          return;
        }
        props.updatenodeuser(response.payload)
        console.log("nodeuserdata", response.payload)
        var isPersistNode = await persistNodeToken(response.payload.token);
        var isPersistNodeuser = await persistNodeUser(JSON.stringify(response.payload));

      if (isPersistNode && isPersistNodeuser) {
        {
          Platform.OS === 'android' ? (navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'SetMPINContainer'
                },
              ],
            }),
          )) : (navigation.navigate('SetMPINContainer'))
        }
      }
    } else {
      setIsLoading(false)
      response.message
        ? showToast(response.message)
        : showToast(
          'Something went wrong, please try again later'
        );
    }
  }

  const onClickSendOTP = async () => {
    settimer(30);
    if (mobileNumber.length < 10) {
      message = 'Enter valid Mobile Number';
      showToast(message);
      return;
    }

    setIsLoading(true)
    let data = {
      'user': mobileNumber
    }
    const response = await getNodeData('system/users/check', data);
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
  const onClickLoginWithPass = () => {
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
  // userData: state.userreducer.userData,
  nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
  // updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
  updatenodeuser: (nodeUserData) => dispatch({ type: 'UPDATE_NODE_USERDATA', payload: { nodeUserData: nodeUserData } })
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer)