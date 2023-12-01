import React, { useState,useEffect } from 'react';
import HomeComponent from '../../screens/Redeemer/HomeComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData } from '../../services/rootService';
import {CommonActions} from '@react-navigation/native';
import { removeMpin, removeToken,getToken } from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
import SpInAppUpdates, {
    IAUUpdateKind
  } from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(false); //isDebug

const HomeContainer = (props) => {

    const navigation = useNavigation();
    const [isModal, setIsModal] = useState(true);
    const [isBtnSelected, setIsBtnSelected] = useState('unSettled');
    const [isPopMenu, setIsPopMenu] = useState(false);
    const [isDetailModal, setIsDetailModal] = useState({visible:false,data:''});
    const [isLoading, setIsLoading] = useState(false);
    // const [sTransactions, setSTransactions] = useState(props.sTransactions);
    // const [usTransactions, setUsTransactions] = useState(props.usTransactions);
    const [isRefreshing, setisRefreshing] = useState(false);
    // const [totalAmount, setTotalAmount] = useState(props.totalAmount);
    // const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        // setIsLoading(true);
        getTransactions();
        inAppUpdates.checkNeedsUpdate().then((result) => {
            console.log(result);
            if (result.shouldUpdate) {
              let updateOptions = {};
              if (Platform.OS === 'android') {
                // android only, on iOS the user will be promped to go to your app store page
                updateOptions = {
                  updateType: IAUUpdateKind.FLEXIBLE,
                };
              }
              inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
            }
          });
        return () => {};
    }, []);

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
            let totalAmount=0;
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
            
            console.log(freedrinksdata);
            // setTotalAmount(totalAmount)
            // setSTransactions(response.settled_data.reverse())
            // setUsTransactions(response.notsettled_data.reverse())
            props.updateTotalAmount(totalAmount);
            props.updatesTransactions(response.settled_data.reverse());
            props.updateusTransactions(response.notsettled_data.reverse());
            props.updateFreeDrinkTransactions(freedrinksdata.reverse());
            console.log(totalAmount,allTransaction);
            setIsLoading(false);
            setisRefreshing(false)
        } else {
            setIsLoading(false);
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Session might expired, please login again.'
            );
            // onClickForget();
        }
    }

    const onClickForget = async () => {
        const token = await removeToken();
        const mpin = await removeMpin();
        if(token && mpin){
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                    {
                        name: 'ForgetPasswordContainer',
                    },
                    ],
                }),
            );
        }
    }

    const onClickViewAll = () => {
        navigation.navigate('TransactionContainer');
    }

    const onClickSearchIcon = () => {
        navigation.navigate('TransactionContainer');
    }

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

    const setSelectedFilter=(val)=>{
        props.updateSelectedFilter(val);
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
        props.updateStaffsList(data);
        setisRefreshing(true);
        getTransactions(val);
        // let array=[]
        // const searchResult = props.data.filter(function (item) {
        //     for (let index = 0; index < array.length; index++) {
        //         const element = array[index];
                
        //     }
        // });
    }

    return (
        <HomeComponent
            sTransactions={props.sTransactions}
            usTransactions={props.usTransactions}
            freeDrinkTransactions={props.freeDrinkTransactions}
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
            userData={props.userData}
            isLoading={isLoading}
            isRefreshing={isRefreshing}
            setisRefreshing={setisRefreshing}
            getTransactions={()=>getTransactions(props.selectedFilter)}
            totalAmount={props.totalAmount}
            onClickMoveToSettled={onClickMoveToSettled}
            selectedFilter={props.selectedFilter}
            setSelectedFilter={setSelectedFilter}
        />
    );
}

// export default HomeContainer;
const mapStateToProps = state => ({
    userData: state.userreducer.userData,
    sTransactions: state.transactionsreducer.sTransactions,
    usTransactions: state.transactionsreducer.usTransactions,
    totalAmount: state.transactionsreducer.totalAmount,
    selectedFilter: state.transactionsreducer.selectedFilter,
    saffsList: state.transactionsreducer.saffsList,
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


export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer)