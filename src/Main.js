import React, { useState, useEffect } from 'react';
import Splash from './Splash';
import Navigation from './navigation/Navigation';

const Main = () => {
    const [route, setRoute] = useState('Splash');

    useEffect(() => {
        changeRoute();
    }, []);

    const changeRoute = async () => {
        setTimeout(() => {
            setRoute('HomeContainer');
        }, 2500);
    };

    return route === 'Splash' ? <Splash /> : <Navigation initialScreen={route} />;
};

export default Main;
