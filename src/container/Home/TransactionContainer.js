import React, { useState } from 'react';
import TransactionComponent from '../../components/Home/TransactionComponent';
import { useNavigation } from '@react-navigation/core';

const TransactionContainer = () => {

    const navigation = useNavigation();
    const [isModal, setIsModal] = useState(true);
    const [isDetailModal, setIsDetailModal] = useState(false);
    const [isExipreModal, setIsExipreModal] = useState(false);
    const [isBtnSelected, setIsBtnSelected] = useState('unSettled');

    const onClickBack = () => {
        navigation.goBack();
    }

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

    return (
        <TransactionComponent
            transData={transData}
            onClickBack={onClickBack}
            isModal={isModal}
            setIsModal={setIsModal}
            isDetailModal={isDetailModal}
            setIsDetailModal={setIsDetailModal}
            isExipreModal={isExipreModal}
            setIsExipreModal={setIsExipreModal}
            isBtnSelected={isBtnSelected}
            setIsBtnSelected={setIsBtnSelected}
        />
    );
}

export default TransactionContainer;