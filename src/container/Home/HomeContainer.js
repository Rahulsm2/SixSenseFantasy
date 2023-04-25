import React, { useState } from 'react';
import HomeComponent from '../../components/Home/HomeComponent';
import { useNavigation } from '@react-navigation/core';

const HomeContainer = () => {

    const navigation = useNavigation();
    const [isModal, setIsModal] = useState(true);
    const [isBtnSelected, setIsBtnSelected] = useState('unSettled');
    const [isPopMenu, setIsPopMenu] = useState(false);
    const [isDetailModal, setIsDetailModal] = useState(false);

    const transData = [
        {
            id: 0
        },
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        }
    ];

    const onClickViewAll = () => {
        navigation.navigate('TransactionContainer');
    }

    const onClickSearchIcon = () => {
        navigation.navigate('TransactionContainer');
    }

    return (
        <HomeComponent
            transData={transData}
            isModal={isModal}
            setIsModal={setIsModal}
            onClickViewAll={onClickViewAll}
            onClickSearchIcon={onClickSearchIcon}
            isBtnSelected={isBtnSelected}
            setIsBtnSelected={setIsBtnSelected}
            isPopMenu={isPopMenu}
            setIsPopMenu={setIsPopMenu}
            isDetailModal={isDetailModal}
            setIsDetailModal={setIsDetailModal}
        />
    );
}

export default HomeContainer;