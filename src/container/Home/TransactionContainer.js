import React, { useState } from 'react';
import TransactionComponent from '../../components/Home/TransactionComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData } from '../../services/rootService';
import {getToken} from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';

const TransactionContainer = (props) => {

    const navigation = useNavigation();
    const [isModal, setIsModal] = useState(true);
    const [isDetailModal, setIsDetailModal] = useState({visible:false,data:''});
    const [isBtnSelected, setIsBtnSelected] = useState('unSettled');
    // const [sTransactions, setSTransactions] = useState(props.sTransactions);
    // const [usTransactions, setUsTransactions] = useState(props.usTransactions);
    const [isRefreshing, setisRefreshing] = useState(false);
    const [totalAmount, setTotalAmount] = useState(props.totalAmount);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSTransactions, setFilterdSTransactions] = useState([]);
    const [filteredUSTransactions, setFilterdUSTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getTransactions=async()=>{
        const token = await getToken();
        let formData = new FormData();
        formData.append('staff_id', '');
        const response = await postData('api/app/coupon/transaction_settled',formData, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                return;
            }
            let allTransaction= response.settled_data.concat(response.notsettled_data);
            let totalAmount=0
            for (let i = 0; i < allTransaction.length; i++) {
                totalAmount=totalAmount+Number(allTransaction[i].amount_used);
            }
            props.updateTotalAmount(totalAmount);
            props.updatesTransactions(response.settled_data.reverse());
            props.updateusTransactions(response.notsettled_data.reverse());
            setisRefreshing(false)
        } else {
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
        }
    }

    const onClickBack = () => {
        navigation.goBack();
    }

    const onSearch = query => {
        setSearchQuery(query);
        // let allTransaction= props.sTransactions.concat(props.usTransactions);
        const searchResult = props.usTransactions.filter(function (item) {
          return ( item['bill_no'].includes(query) || 
          item["id"].toString().includes(query) || 
          item["amount_used"].includes(query)
          )
        });
        const searchResult1 = props.sTransactions.filter(function (item) {
            return ( item['bill_no'].includes(query) || 
            item["id"].toString().includes(query) || 
            item["amount_used"].includes(query)
            )
        });
        setFilterdUSTransactions(searchResult);
        setFilterdSTransactions(searchResult1);
      };

      const onClickMoveToSettled=async()=>{
        setIsDetailModal({visible:!isDetailModal.visible,data:''})
        setIsLoading(true)
        const token = await getToken();
        let formData = new FormData();
        formData.append('report_id', isDetailModal.data.id);
        formData.append('status', 1);
        const response = await postData('api/app/coupon/transaction_settled_status',formData, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setisRefreshing(true);
            getTransactions();
            setIsBtnSelected("settled");
        } else {
            setIsLoading(false);
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
        }
    }
    

    return (
        <TransactionComponent
            onClickBack={onClickBack}
            isModal={isModal}
            setIsModal={setIsModal}
            isDetailModal={isDetailModal}
            setIsDetailModal={setIsDetailModal}
            isBtnSelected={isBtnSelected}
            setIsBtnSelected={setIsBtnSelected}
            sTransactions={props.sTransactions}
            usTransactions={props.usTransactions}
            isRefreshing={isRefreshing}
            setisRefreshing={setisRefreshing}
            userData={props.userData}
            getTransactions={getTransactions}
            searchQuery={searchQuery}
            onSearch={onSearch}
            filteredSTransactions={filteredSTransactions}
            filteredUSTransactions={filteredUSTransactions}
            onClickMoveToSettled={onClickMoveToSettled}
            isLoading={isLoading}
        />
    );
}

// export default TransactionContainer;

const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    sTransactions: state.transactionsreducer.sTransactions,
    usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount
});

const mapDispatchToProps = dispatch => ({
    updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}}),
    updatesTransactions:(sTransactions) => dispatch({type: 'UPDATE_S_TRANSACTIONS', payload: {sTransactions:sTransactions}}),
    updateusTransactions:(usTransactions) => dispatch({type: 'UPDATE_US_TRANSACTIONS', payload: {usTransactions:usTransactions}}),
    updateTotalAmount:(totalAmount) => dispatch({type: 'UPDATE_TOTAL_AMOUNT', payload: {totalAmount:totalAmount}})
});


export default connect(mapStateToProps,mapDispatchToProps)(TransactionContainer)