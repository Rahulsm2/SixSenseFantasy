import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Navigation from './navigation/Navigation';

const Main = () => {

    const [route, setRoute] = useState('Splash');

    useEffect(() => {
        changeRoute();
    }, []);

    const changeRoute = () => {
        setTimeout(() => {
            setRoute('LoginContainer');
        }, 3000);
    }

    return route == 'Splash' ? (<Splash />) : (<Navigation initialScreen={route} />);
}

export default Main;