import React, { useState } from 'react';
import ValCouponComponent from '../../components/Home/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';

const ValCouponContainer = () => {

    const [isFlash, setIsFlash] = useState(false);
    const navigation = useNavigation();

    const onClickBack = () => {
        navigation.goBack();
    }

    return (
        <ValCouponComponent
            isFlash={isFlash}
            setIsFlash={setIsFlash}
            onClickBack={onClickBack}
        />
    );
}

export default ValCouponContainer;