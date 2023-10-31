import LoginComponent from '../../components/Login/LoginComponent';
import React, { useState,useEffect,useRef } from 'react';
import { useNavigation,useRoute } from '@react-navigation/core';
import { showToast } from '../../components/common/ShowToast';
import { persistToken } from '../../services/persistData';
import { postData } from '../../services/rootService';
import {CommonActions} from '@react-navigation/native';
import { connect } from 'react-redux';

const LoginContainer = (props) => {    
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onClickForget = () => {
        navigation.navigate('ForgetPasswordContainer');
    }

    const onClickLogin = async () => {
        let message = '';
        if (mobileNumber.length<10 || !password.trim()) {
          if (mobileNumber.length<10) {
            message = 'Enter valid Mobile Number';
          } else if (!password.trim()) {
            message = 'Enter valid Password';
          }
          showToast(message);
        } else {
            setIsLoading(true)
          let formData = new FormData();
          formData.append('phone', mobileNumber);
          formData.append('password', password);
          const response = await postData('api/app/logins', formData);
          console.log(response);
    
          if (response.statusCode === 200) {
            setIsLoading(false)
            if (response.errors) {
                showToast(response.message);
                return;
            }
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
  userData: state.userreducer.userData,
});


const mapDispatchToProps = dispatch => ({
  updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}})
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)