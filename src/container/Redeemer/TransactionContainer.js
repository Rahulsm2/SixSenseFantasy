import React, { useState,useRef } from 'react';
import TransactionComponent from '../../screens/Redeemer/TransactionComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { getData, postData } from '../../services/rootService';
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
    const refRBSheet = useRef();
    const [isPopMenu, setIsPopMenu] = useState(false);
    const [onChangeStaffList, setonChangeStaffList] = useState(false);

    
    const getStaffs=async()=>{
        if(props.saffsList && props.saffsList.length==0){
            setIsLoading(true);
            const token = await getToken();
            const response = await getData('api/app/coupon/staff_list',null, token);
            if (response.statusCode == 200) {
                setIsLoading(false);
                if (response.errors) {
                    showToast(response.message);
                    return;
                }
                refRBSheet.current.open();
                let data=response.staffs;
                let selfdata={}
                if(props.userData && props.userData.role=="Biller"){
                    let index = data.findIndex(obj => obj.staff_id == props.userData.id);
                    selfdata=data[index];
                    data.splice(index,1);
                    data.unshift(selfdata);
                }
                for (let i = 0; i < data.length; i++) {
                    if(props.selectedFilter=='all'){
                        data[i].selected=true;
                    }else if(props.selectedFilter=='self'){
                        data[0].selected=true;
                    }else{
                        data[i].selected=false;
                    }
                }
                props.updateStaffsList(data);
            }else{
                setIsLoading(false);
                showToast(
                    response.message ? response.message : 'Something went wrong, try again',
                );
            }
        }else{
            let data=props.saffsList;
            for (let i = 0; i < data.length; i++) {
                if(props.selectedFilter=='all'){
                    data[i].selected=true;
                }else if(props.selectedFilter=='self'){
                    data[0].selected=true;
                }
            }
            props.updateStaffsList(data);
            refRBSheet.current.open()
        }
    }

    const getTransactions=async(selectedFilter=null)=>{
        const token = await getToken();
        let formData = new FormData();
        if(selectedFilter=='all'){
            formData.append('staff_id', '');
        }else if(selectedFilter=="self"){
            formData.append('staff_id', ""+props.userData.id);
        }else{
            formData.append('staff_id', '');
        }
        const response = await postData('api/app/coupon/transaction_settled',formData, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                setIsLoading(false);
                return;
            }
            let allTransaction= response.settled_data.concat(response.notsettled_data);
            let totalAmount=0
            for (let i = 0; i < allTransaction.length; i++) {
                totalAmount=totalAmount+Number(allTransaction[i].amount_used);
            }
            let freedrinksdata=response.freedrink_data;
            for (let i = 0; i < freedrinksdata.length; i++) {
                let freedrinkInfo = freedrinksdata[i].freedrink_info ? freedrinksdata[i].freedrink_info : [];
                let drinks="";
                for (let j = 0; j < freedrinkInfo.length; j++) {
                    let data=freedrinkInfo[j].split(":");
                    drinks=drinks+" "+data[0]+"("+data[1]+")"+",";
                }
                freedrinksdata[i].drinkslist=drinks.slice(0,-1);
            }
            // setTotalAmount(totalAmount)
            // setSTransactions(response.settled_data.reverse())
            // setUsTransactions(response.notsettled_data.reverse())
            props.updateTotalAmount(totalAmount);
            props.updatesTransactions(response.settled_data.reverse());
            props.updateusTransactions(response.notsettled_data.reverse());
            props.updateFreeDrinkTransactions(freedrinksdata.reverse());
            
            setIsLoading(false);
            setisRefreshing(false)
            console.log(allTransaction);
        } else {
            setIsLoading(false);
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Session might expired, please login again.'
            );
            // onClickForget();
        }
    }

    const onClickBack = () => {
        navigation.goBack();
    }

    const onSearch = query => {
        setSearchQuery(query);
        // let allTransaction= props.sTransactions.concat(props.usTransactions);
        const searchResult = props.usTransactions.filter(function (item) {
          return ( item['bill_no'].toString().includes(query) || 
          item["id"].toString().includes(query) || 
          item["amount_used"].toString().includes(query) || 
          item["distribute_id"].toString().includes(query) ||
          item["name"].toString().includes(query) ||
          item["first_name"].toString().includes(query)
          )
        });
        const searchResult1 = props.sTransactions.filter(function (item) {
            return ( item['bill_no'].toString().includes(query) || 
            item["id"].toString().includes(query) || 
            item["amount_used"].toString().includes(query)||
            item["distribute_id"].toString().includes(query) ||
            item["name"].toString().includes(query) ||
            item["first_name"].toString().includes(query)
            )
        });
        if(searchQuery.length<query.length && query.length>=3 && searchResult.length<=0 && searchResult1.length<=0){
            showToast("No result found..");
        }
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
            getTransactions(props.selectedFilter);
            // setIsBtnSelected("settled");
        } else {
            setIsLoading(false);
            showToast(
                response.message ? response.message : 'Something went wrong, try again',
            );
        }
    }

    const getCurrentSelectedCount=(data)=>{
        // let data = props.saffsList;
        let selectedCount=0;
        for (let i = 0; i < data.length; i++) {
            if(data[i].selected){
                selectedCount=selectedCount+1;
            }
        }
        return selectedCount;
    }

    const onChangeFilterData=(index)=>{
        let data = props.saffsList;
        if(index==-1){
            let selectedCount=getCurrentSelectedCount(data);
            if(selectedCount==data.length){
                // showToast("Please  atleast one.")
                for (let i = 0; i < data.length; i++) {
                    data[i].selected=false;
                }
                props.updateSelectedFilter('self');
                data[0].selected=true;
                setisRefreshing(true);
                getTransactions('self');
            }else{
                props.updateSelectedFilter('all')
                setisRefreshing(true);
                getTransactions('all');
                for (let i = 0; i < data.length; i++) {
                    data[i].selected=true;
                }
            }
        }else{
            let selectedCount=getCurrentSelectedCount(data);
            if(selectedCount-1==0 && data[index].selected){
                showToast("Please select atleast one.")
            }else{
                data[index].selected=!data[index].selected;
                let selectedCount=getCurrentSelectedCount(data);
                if(selectedCount==data.length){
                    props.updateSelectedFilter('all')
                    setisRefreshing(true);
                    getTransactions('all');
                }else if(selectedCount==1 && data[0].selected){
                    props.updateSelectedFilter('self')
                    setisRefreshing(true);
                    getTransactions('self');
                }else{
                    props.updateSelectedFilter('custom')
                    setisRefreshing(true);
                    getTransactions('custom');
                }
            }
        }
        setonChangeStaffList(!onChangeStaffList);
        props.updateStaffsList(data);
    }

    const setSelectedFilter=(val)=>{
        let data = props.saffsList;
        for (let i = 0; i < data.length; i++) {
            if(val=='all'){
                data[i].selected=true;
            }else if(val=='self' && i==0){
                data[i].selected=true;
            }else{
                data[i].selected=false;
            }
        }
        if(val=='all' || val=='self'){
            props.updateSelectedFilter(val);
        }else{
            getStaffs();
        }
        props.updateStaffsList(data);
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
            getTransactions={()=>getTransactions(props.selectedFilter)}
            searchQuery={searchQuery}
            onSearch={onSearch}
            filteredSTransactions={filteredSTransactions}
            filteredUSTransactions={filteredUSTransactions}
            onClickMoveToSettled={onClickMoveToSettled}
            isLoading={isLoading}
            refRBSheet={refRBSheet}
            getStaffs={getStaffs}
            saffsList={props.saffsList}
            selectedFilter={props.selectedFilter}
            isPopMenu={isPopMenu}
            setIsPopMenu={setIsPopMenu}
            setSelectedFilter={setSelectedFilter}
            onChangeFilterData={onChangeFilterData}
            onChangeStaffList={onChangeStaffList}
            freeDrinkTransactions={props.freeDrinkTransactions}
        />
    );
}

// export default TransactionContainer;

const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    sTransactions: state.transactionsreducer.sTransactions,
    usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount,
    saffsList: state.transactionsreducer.saffsList,
    selectedFilter: state.transactionsreducer.selectedFilter,
    freeDrinkTransactions: state.transactionsreducer.freeDrinkTransactions
});

const mapDispatchToProps = dispatch => ({
    updateuser:(userData) => dispatch({type: 'UPDATE_USERDATA', payload: {userData:userData}}),
    updatesTransactions:(sTransactions) => dispatch({type: 'UPDATE_S_TRANSACTIONS', payload: {sTransactions:sTransactions}}),
    updateusTransactions:(usTransactions) => dispatch({type: 'UPDATE_US_TRANSACTIONS', payload: {usTransactions:usTransactions}}),
    updateTotalAmount:(totalAmount) => dispatch({type: 'UPDATE_TOTAL_AMOUNT', payload: {totalAmount:totalAmount}}),
    updateStaffsList:(saffsList) => dispatch({type: 'UPDATE_STFFS_LIST', payload: {saffsList:saffsList}}),
    updateSelectedFilter:(selectedFilter) => dispatch({type: 'UPDATE_SELECTED_FILTER', payload: {selectedFilter:selectedFilter}}),
    updateFreeDrinkTransactions:(freeDrinkTransactions) => dispatch({type: 'UPDATE_FREE_DRINK_TRANSACTIONS', payload: {freeDrinkTransactions:freeDrinkTransactions}}),
});


export default connect(mapStateToProps,mapDispatchToProps)(TransactionContainer)