import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Navigation from './navigation/Navigation';
import {getMpin,getToken} from './services/persistData';
import { connect } from 'react-redux';

const Main = () => {

    const [route, setRoute] = useState('Splash');

    useEffect(() => {
        changeRoute();
    }, []);

    const changeRoute = async () => {
        const token = await getToken();
        const mpin = await getMpin();
        if(token && mpin){
            setTimeout(() => {
                setRoute('MPINLoginContainer');
            }, 2000);
        }else if (token && !mpin){
            setTimeout(() => {
                setRoute('SetMPINContainer');
            }, 2000);
        }else{
            setTimeout(() => {
                setRoute('ForgetPasswordContainer');   //ForgetPasswordContainer
            }, 2000);
        }
    }

    return route == 'Splash' ? (<Splash />) : (<Navigation initialScreen={route} />);
}

export default Main;