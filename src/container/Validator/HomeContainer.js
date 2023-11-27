import React, { useState, useEffect } from 'react';
import HomeComponent from '../../screens/Validator/Home/HomeComponent';
import { connect } from 'react-redux';
import { getData, postData } from '../../services/rootService';
import { getToken } from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
// import SpInAppUpdates, {
//     NeedsUpdateResponse,
//     IAUUpdateKind,
//     StartUpdateOptions,
// } from 'sp-react-native-in-app-updates';

// const inAppUpdates = new SpInAppUpdates(false); //isDebug

const HomeContainer = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setisRefreshing] = useState(false);

    useEffect(() => {
        // setIsLoading(true);
        getTransactions();
        // inAppUpdates.checkNeedsUpdate().then((result) => {
        //     console.log(result);
        //     if (result.shouldUpdate) {
        //         let updateOptions = {};
        //         if (Platform.OS === 'android') {
        //             // android only, on iOS the user will be promped to go to your app store page
        //             updateOptions = {
        //                 updateType: IAUUpdateKind.FLEXIBLE,
        //             };
        //         }
        //         inAppUpdates.startUpdate(updateOptions); 
        //     }
        // });
        return () => { };
    }, []);


    const getTransactions = async () => {
        const token = await getToken();
        const response = await getData('api/app/coupon/validator_transactions', {}, token);
        if (response.statusCode == 200) {
            if (response.errors) {
                showToast(response.message);
                setIsLoading(false);
                return;
            }
            setIsLoading(false);
            setisRefreshing(false);
            let count=0
            for (let i = 0; i < response.data.length; i++) {
                count=count+response.data[i].type_counts.Couple + response.data[i].type_counts.Ladies + response.data[i].type_counts.Single;
            }
            props.updateTotalEntries(count);
            props.updateTransactions(response.data)
        } else {
            setIsLoading(false);
            setisRefreshing(false)
            showToast(
                response.message ? response.message : 'Session might expired, please login again.'
            );
        }
    }

    return (
        <HomeComponent
            isRefreshing={isRefreshing}
            setisRefreshing={setisRefreshing}
            transactions={props.validationsTrasactions}
            userData={props.userData}
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
});

const mapDispatchToProps = dispatch => ({
    updateuser: (userData) => dispatch({ type: 'UPDATE_USERDATA', payload: { userData: userData } }),
    updateStaffsList: (saffsList) => dispatch({ type: 'UPDATE_STFFS_LIST', payload: { saffsList: saffsList } }),
    updateSelectedFilter: (selectedFilter) => dispatch({ type: 'UPDATE_SELECTED_FILTER', payload: { selectedFilter: selectedFilter } }),
    updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
    updateTotalEntries: (totalvalidationsEntries) => dispatch({ type: 'UPDATE_TOTAL_ENTRIES', payload: { totalvalidationsEntries: totalvalidationsEntries } }),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)