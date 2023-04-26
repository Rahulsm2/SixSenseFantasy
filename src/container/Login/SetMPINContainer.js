import React, { useState,useEffect,useRef } from 'react';
import SetMPINComponent from '../../components/Login/SetMPINComponent';
import { useNavigation } from '@react-navigation/core';
import { showToast } from '../../components/common/ShowToast';
import { persistMpin } from '../../services/persistData';
import {CommonActions} from '@react-navigation/native';
import {removeToken,removeMpin} from '../../services/persistData';

const SetMPINContainer = () => {
    const [mpin, setMpin] = useState('');
    const [confirmMpin, setConfirmMpin] = useState('');
    const [hideMpin, setHideMpin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const onClickContinue = async () => {
        if (mpin.length<4 || mpin!==confirmMpin) {
            message = 'Enter valid MPIN';
            showToast(message);
            return;
        }
        const isPersist = await persistMpin(mpin);
        if(isPersist){
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    {
                        name: 'MPINLoginContainer',
                    },
                    ],
                }),
            );
        }
    }

    return (
        <SetMPINComponent
            onClickContinue={onClickContinue}
            mpin={mpin}
            setMpin={setMpin}
            confirmMpin={confirmMpin}
            setConfirmMpin={setConfirmMpin}
            hideMpin={hideMpin}
            setHideMpin={setHideMpin}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
        />
    );
}

export default SetMPINContainer;