import LoginComponent from '../../../screens/Common/Login/LoginComponent';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { showToast } from '../../../components/common/ShowToast';
import { persistNodeToken } from '../../../services/persistData';
import { postNodeData } from '../../../services/rootService';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';


const LoginContainer = (props) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const onClickForget = () => {
    navigation.navigate('ResetPasswordContainer');
  }

  const onClickLogin = async () => {
    let message = '';
    if (mobileNumber.length < 10 || !password.trim()) {
      if (mobileNumber.length < 10) {
        message = 'Enter valid Mobile Number';
      } else if (!password.trim()) {
        message = 'Enter valid Password';
      }
      showToast(message);
    } else {
      setIsLoading(true)
      let data={
        'phone': mobileNumber,
        'password': password
      }
      const response = await postNodeData('service/accounts_service/v1/no_auth/mobile-sign-in', data);
      console.log("hi",response);

      if (response.statusCode === 200) {
        setIsLoading(false)
        if (response.errors) {
          showToast(response.message);
          return;
        }
        if(response.node && !response.node.errors){
          let nodadata=response.node;
          let nodeuserdata=nodadata.partner;
          nodeuserdata.role=nodadata.role;
          nodeuserdata.user=nodadata.user;
          props.updatenodeuser(nodeuserdata)
          console.log("hiiiiiii", nodadata)
          var isPersistNode = await persistNodeToken(response.node.token);
        }
        // const isPersistNode = await persistNodeToken(response.token.access_token);
        // if (isPersist || isPersistNode) {
        if (isPersistNode) {

          {Platform.OS === 'android' ? (navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'SetMPINContainer',
                    },
                ],
            }),
        )) : (navigation.navigate('SetMPINContainer')) }
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
  };
  const onClickLoginWithOtp=()=>{
    navigation.replace('ForgetPasswordContainer');
  }

  return (
    <LoginComponent
      onClickLogin={onClickLogin}
      onClickForget={onClickForget}
      mobileNumber={mobileNumber}
      setMobileNumber={setMobileNumber}
      password={password}
      setPassword={setPassword}
      hidePassword={hidePassword}
      setHidePassword={setHidePassword}
      isLoading={isLoading}
      onClickLoginWithOtp={onClickLoginWithOtp}
    />
  );
}

// export default LoginContainer;
const mapStateToProps = state => ({
  // userData: state.userreducer.userData,
  nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
  // updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
  updatenodeuser: (nodeUserData) => dispatch({ type: 'UPDATE_NODE_USERDATA', payload: { nodeUserData: nodeUserData } })
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)