import React, { useState, useRef } from 'react';
import TransactionComponent from '../../../screens/Validator/Home/TransactionComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { getData, postData } from '../../../services/rootService';
import { getToken } from '../../../services/persistData';
import { showToast } from '../../../components/common/ShowToast';

const TransactionContainer = (props) => {

    const navigation = useNavigation();
    const [isBtnSelected, setIsBtnSelected] = useState('unSettled');
    const [isRefreshing, setisRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSTransactions, setFilterdSTransactions] = useState([]);
    const [filteredUSTransactions, setFilterdUSTransactions] = useState([]);
    const [filteredFreeDrinkTransactions, setFilterdFreeDrinkTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const refRBSheet = useRef();
    const [isPopMenu, setIsPopMenu] = useState(false);

    const getTransactions = async () => {
        const nodeToken = await getNodeToken();
        const response = await getNodeData(`service/tickets_service/v1/tickets/action/user/${props.nodeUserData?.user}`, {}, nodeToken,
            { 'user': props.nodeUserData ? props.nodeUserData.user : "" });
        console.log("getnodedata", response, response.statusCode)
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setisRefreshing(false);
            props.updateTransactions(response._payload);
            console.log('response', response)
            let data = response._payload;
            let totalCount = 0;
            for (let i = 0; i < data.length; i++) {
                totalCount = totalCount + data[i].total_people;
            }
            props.updateTotalEntries(totalCount);
        } else {
            setIsLoading(false);
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Session might expired, please login again.'
            );
            if (response == "Unauthorized request") {
                loggingOut();
            }
        }
    }

    const onClickBack = () => {
        navigation.goBack();
    }

    const onSearch = query => {
        setSearchQuery(query);
        console.log("onsearch", query);
        const searchResult = props.validationsTrasactions.filter(function (item) {
            return (item["ticket_tracking_id"].toString().includes(query) ||
                item["total_people"].toString().includes(query) ||
                item["customer_name"].toString().includes(query)
            )
        });
        setFilterdSTransactions(searchResult);
        if (searchQuery.length < query.length && query.length >= 3 && searchResult.length <= 0) {
            showToast("No result found..");
        }
    };

    return (
        <TransactionComponent
            onClickBack={onClickBack}
            searchQuery={searchQuery}
            onSearch={onSearch}
            filteredSTransactions={filteredSTransactions}
            filteredFreeDrinkTransactions={filteredFreeDrinkTransactions}
            refRBSheet={refRBSheet}
            isPopMenu={isPopMenu}
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

// export default TransactionContainer;

const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    selectedFilter: state.transactionsreducer.selectedFilter,
    saffsList: state.transactionsreducer.saffsList,
    validationsTrasactions: state.transactionsreducer.validationsTrasactions,
    Transactions: state.transactionsreducer.Transactions,
    totalvalidationsEntries: state.transactionsreducer.totalvalidationsEntries,
    nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
    updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    updateStaffsList: (saffsList) => dispatch({ type: 'UPDATE_STFFS_LIST', payload: { saffsList: saffsList } }),
    updateSelectedFilter: (selectedFilter) => dispatch({ type: 'UPDATE_SELECTED_FILTER', payload: { selectedFilter: selectedFilter } }),
    updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
    updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
    updateTotalEntries: (totalvalidationsEntries) => dispatch({ type: 'UPDATE_TOTAL_ENTRIES', payload: { totalvalidationsEntries: totalvalidationsEntries } }),
    logoutData: () => dispatch({ type: 'USER_LOGGED_OUT' })
});


export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer)