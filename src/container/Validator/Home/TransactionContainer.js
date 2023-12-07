import React, { useState, useRef, useEffect } from 'react';
import TransactionComponent from '../../../screens/Validator/Home/TransactionComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { getData, postData, getNodeData } from '../../../services/rootService';
import { getToken, getNodeToken } from '../../../services/persistData';
import { showToast } from '../../../components/common/ShowToast';

const TransactionContainer = (props) => {

    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSTransactions, setFilterdSTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const refRBSheet = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [hasMorePages, setHasMorePages] = useState(true);

    const getTransactions = async (page = 1) => {
        try {
            setIsLoading(true);
            const nodeToken = await getNodeToken();
            const response = await getNodeData(`service/tickets_service/v1/tickets/action/user/${props.nodeUserData?.user}?page=${page}`, {}, nodeToken, { 'user': props.nodeUserData ? props.nodeUserData.user : "" });

            if (response.statusCode === 200) {
                if (response.errors) {
                    showToast(response.message);
                } else {
                    const data = response._payload;
                    const totalCount = data.reduce((acc, item) => acc + item.total_people, 0);

                    props.updateTransactions(page === 0 ? data : [...props.validationsTrasactions, ...data]);
                    props.updateTotalEntries(totalCount);

                    setCurrentPage(page);
                    setHasMorePages(page < response.totalPages);
                }
            } else {
                showToast(response.message ? response.message : 'Failed to load data.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadMore = () => {
        showToast("Extra data incoming!!!!!")
        if (hasMorePages && !isLoading ) {
            getTransactions(currentPage + 1);
        }
    };

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
            refRBSheet={refRBSheet}
            transactions={props.validationsTrasactions}
            nodeUserData={props.nodeUserData}
            selectedFilter={props.selectedFilter}
            isLoading={isLoading}
            getTransactions={loadMore}
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
    nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
    updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    updateStaffsList: (saffsList) => dispatch({ type: 'UPDATE_STFFS_LIST', payload: { saffsList: saffsList } }),
    updateSelectedFilter: (selectedFilter) => dispatch({ type: 'UPDATE_SELECTED_FILTER', payload: { selectedFilter: selectedFilter } }),
    updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
    updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
    logoutData: () => dispatch({ type: 'USER_LOGGED_OUT' })
});


export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer)