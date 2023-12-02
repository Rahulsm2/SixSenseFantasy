import React, { useState, useEffect } from 'react';
import HomeComponent from '../../../screens/Validator/Home/HomeComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { getData, getNodeData, postData } from '../../../services/rootService';
import { getNodeToken,removeNodeToken,removeMpin,removeToken } from '../../../services/persistData';
import { showToast } from '../../../components/common/ShowToast';
import { CommonActions } from '@react-navigation/native';

const HomeContainer = (props) => {
    
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        getTransactions();
        return () => { };
    }, []);


    const getTransactions = async () => {
        const nodeToken = await getNodeToken();
        const response = await getNodeData(`service/tickets_service/v1/tickets/action/user/${props.nodeUserData?.user}`, {}, nodeToken, 
        { 'user': props.nodeUserData ? props.nodeUserData.user : "" });
        console.log("getnodedata", response,response.statusCode)
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setisRefreshing(false);
            props.updateTransactions(response._payload);
            let data=response._payload;
            let totalCount=0;
            for (let i = 0; i < data.length; i++) {
                totalCount=totalCount+data[i].total_people;
            }
            props.updateTotalEntries(totalCount);
        } else {
            setIsLoading(false);
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Session might expired, please login again.'
            );
            if(response=="Unauthorized request"){
                loggingOut();
            }
        }
    }

    const loggingOut = async () => {
        const token = await removeToken();
        const mpin = await removeMpin();
        const nodetoke = await removeNodeToken();
        if (token && mpin && nodetoke) {
            props.logoutData();
            {Platform.OS === 'android' ? (navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'ForgetPasswordContainer',
                        },
                    ],
                }),
            )) : (navigation.navigate('ForgetPasswordContainer')) 
            }
        }
    }

    return (
        <HomeComponent
            isRefreshing={isRefreshing}
            setisRefreshing={setisRefreshing}
            transactions={props.validationsTrasactions}
            nodeUserData={props.nodeUserData}
            selectedFilter={props.selectedFilter}
            getTransactions={getTransactions}
            isLoading={isLoading}
            totalEntries={props.totalvalidationsEntries}
        />
    );
}

// export default HomeContainer;
const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    selectedFilter: state.transactionsreducer.selectedFilter,
    saffsList: state.transactionsreducer.saffsList,
    validationsTrasactions: state.transactionsreducer.validationsTrasactions,
    totalvalidationsEntries :  state.transactionsreducer.totalvalidationsEntries,
    nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
    updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    updateStaffsList: (saffsList) => dispatch({ type: 'UPDATE_STFFS_LIST', payload: { saffsList: saffsList } }),
    updateSelectedFilter: (selectedFilter) => dispatch({ type: 'UPDATE_SELECTED_FILTER', payload: { selectedFilter: selectedFilter } }),
    updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
    updateTotalEntries: (totalvalidationsEntries) => dispatch({ type: 'UPDATE_TOTAL_ENTRIES', payload: { totalvalidationsEntries: totalvalidationsEntries } }),
    logoutData: () => dispatch({ type: 'USER_LOGGED_OUT' })
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)