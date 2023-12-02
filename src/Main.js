import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Navigation from './navigation/Navigation';
import {getMpin,getNodeToken} from './services/persistData';
import { connect } from 'react-redux';

const Main = () => {

    const [route, setRoute] = useState('Splash');

    useEffect(() => {
        changeRoute();
    }, []);

    const changeRoute = async () => {
        const nodeToken = await getNodeToken();
        const mpin = await getMpin();
        if(nodeToken && mpin){
            setTimeout(() => {
                setRoute('MPINLoginContainer');
            }, 2000);
        }else if (nodeToken && !mpin){
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