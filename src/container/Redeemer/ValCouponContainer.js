import React, { useState, useRef, useEffect } from 'react';
import ValCouponComponent from '../../screens/Redeemer/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData,getData } from '../../services/rootService';
import { getToken } from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
import moment from 'moment';
import { PermissionsAndroid } from "react-native";

const ValCouponContainer = (props) => {

  const [isFlash, setIsFlash] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  //pending - not scaned yet
  //verified - verified
  //aboutToStart - about To Start
  //expired - expired
  //invalid - invalid
  const [couponStatus, setcouponStatus] = useState("pending");
  const [couponData, setCouponData] = useState('');
  const [redeemAmount, setredeemAmount] = useState('');
  const [billAmount, setbillAmount] = useState('');
  const [tableNumber, settableNumber] = useState('');
  const [seekPremission, setSeekPremission] = useState(false);
  const [remarks, setremarks] = useState('');
  const refRBSheet = useRef();
  const freeDrinksRefRBSheet = useRef();

  const onClickBack = () => {
    navigation.goBack();
  }

  // useEffect(()=>{
  //   // console.log(refRBSheet.current);
  //   if(couponStatus!="pending" && (couponStatus=="verified" || couponStatus=='redeem')){
  //     setTimeout(() => {
  //       setcouponStatus('pending')
  //       showToast("Timeout , Please scan again.")
  //       refRBSheet.current.close();
  //     }, 300000);
  //   }
  // },[couponStatus]);

  useEffect(() => {
    const granted = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    console.log("granted", granted);
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
      setSeekPremission(true);
    }
  }, [seekPremission]);

  useEffect(() => {
      console.log("props.freeDrinks",props.freeDrinks);
      if(props.freeDrinks && props.freeDrinks.length<=0){
          getFreeDrinks();
      }
  }, []);

  const getFreeDrinks = async () => {
      setIsLoading(true);
      const token = await getToken();
      const response = await getData('api/app/coupon/freedrink_name',null, token);
      if (response.statusCode == 200) {
          setIsLoading(false);
          if (response.errors) {
              showToast(response.message);
              return;
          }
          props.updatesFreeDrinks(response.data);
      } else{
          setIsLoading(false);
          showToast(
              response.message ? response.message : 'Something went wrong, try again',
          );
      }
  }


  exceptionOnBarcodeRead = () => {
    if (couponStatus == "aboutToStart") {
      showToast("Event yet to start.")
    } else {
      showToast("Something went wrong,Please try again.")
    }
    setTimeout(() => {
      setcouponStatus('pending');
    }, 4000);
  }

  onBarCodeRead = async scanResult => {
    const token = await getToken();
    console.log(scanResult);
    setIsFlash(false);
    if (scanResult.data && !isLoading) {
      setIsLoading(true)
      let formData = new FormData();
      formData.append('coupon_id', scanResult.data);
      const response = await postData(
        'api/app/coupon/validate_coupons',
        formData,
        token,
      );

      if (response.statusCode == 200) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        if (response.errors) {
          showToast(response.message);
          return;
        }
        console.log("Invalid",response.data);
        
        setCouponData(response.data)
        var curenttime = moment();
        if (
          curenttime.isBetween(
            moment(response.data.start_time),
            moment(response.data.expiry_time),
          )
        ) {
          setcouponStatus('verified')
        } else if (curenttime.isBefore(moment(response.data.start_time))) {
          // setcouponStatus('aboutToStart')
          showToast("Event yet to start");
        } else if (curenttime.isAfter(moment(response.data.expiry_time))) {
          setcouponStatus('expired')
        } else {
          // setcouponStatus('invalid')
          showToast("Invalid QR code.");
        }
        console.log("couponStatus", couponStatus);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        response.message
          ? showToast(response.message)
          : showToast(
            'Invalid Coupon.'
          );
      }
    }
  };

  const onClickRedeem = async () => {
    if (isLoading) {
      return;
    }
    if (Number(redeemAmount) <= 0) {
      message = 'Enter valid Redeem Amount.';
      showToast(message);
      return;
    }
    if (!billAmount.trim()) {
      message = 'Enter valid Bill ID or Table number.';
      showToast(message);
      return;
    }
    // if (!remarks.trim()) {
    //   message = 'Enter valid remarks.';
    //   showToast(message);
    //   return;
    // }
    if (Number(redeemAmount) > Number(couponData.amount)) {
      message = 'Enter amount less than balance.';
      showToast(message);
      return;
    }
    setIsLoading(true);
    const token = await getToken();
    let formData = new FormData();
    formData.append('coupon_id', couponData.distribute_id);
    formData.append('amount', redeemAmount);
    formData.append('bill_no', billAmount);
    let remarkss=remarks+ tableNumber ? "$$"+tableNumber : ""
    formData.append('remarks', remarkss);
    const response = await postData(
      'api/app/coupon/redeem_coupons',
      formData,
      token,
    );

    if (response.statusCode == 200) {
      setIsLoading(false)
      if (response.errors) {
        // refRBSheet.current.close()
        // setcouponStatus('verified')
        setbillAmount('')
        setredeemAmount('')
        setremarks('')
        settableNumber('')
        showToast(response.message);
        showToast("Please try again.")
        return;
      }
      refRBSheet.current.close();
      showToast("Redeem successfull.")
      navigation.navigate('HomeContainer');
      getTransactions();
      setcouponStatus('pending')
      setCouponData('');
      setbillAmount('')
      settableNumber('')
      setredeemAmount('')
      setremarks('')
    } else {
      response.message
        ? showToast(response.message)
        : showToast(
          'Something went wrong, please try again later'
        );
      showToast("Please try again.")
      setbillAmount('')
      settableNumber('')
      setredeemAmount('')
      setremarks('')
      setIsLoading(false)
      // refRBSheet.current.close()
      // setcouponStatus('verified')
      console.log("Something", couponData, couponStatus);
    }
  }
  
  const onClickRedeemFreeDrinks = async (freeDrinkss,totaladdedfreeDrinks) => {
    if (isLoading) {
      return;
    }
    const token = await getToken();
    let selectedCounts='[';
    for (let i = 0; i < freeDrinkss.length; i++) {
      if(freeDrinkss[i].count>=1){
        // selectedCounts.push(freeDrinkss[i].count.toString())
        selectedCounts=selectedCounts+"\""+freeDrinkss[i].count+"\""+",";
      }
    }
    let selectedDrinkIds='[';
    for (let i = 0; i < freeDrinkss.length; i++) {
      if(freeDrinkss[i].count>=1){
        // selectedDrinkIds.push(freeDrinkss[i].id.toString())
        selectedDrinkIds=selectedDrinkIds+"\""+freeDrinkss[i].id+"\""+",";
      }
    }
    selectedDrinkIds=selectedDrinkIds.slice(0,-1)+']';
    selectedCounts=selectedCounts.slice(0,-1)+']';
    console.log(selectedCounts);
    console.log(selectedDrinkIds);
    
    setIsLoading(true);
    let formData = new FormData();
    formData.append('coupon_id', couponData.distribute_id);
    formData.append('amount', selectedCounts);
    formData.append('drink_id', selectedDrinkIds);
    const response = await postData(
      'api/app/coupon/redeem_freedrink',
      formData,
      token,
    );

    if (response.statusCode == 200) {
      setIsLoading(false)
      if (response.errors) {
        showToast(response.message);
        return;
      }
      freeDrinksRefRBSheet.current.close();
      showToast("Redeem successfull.")
      navigation.navigate('HomeContainer');
      getTransactions();
      setcouponStatus('pending')
    }else {
      setIsLoading(false)
      response.message
        ? showToast(response.message)
        : showToast(
          'Something went wrong, please try again later'
        );
    }
  }

  const getTransactions = async () => {
    const token = await getToken();
    let formData = new FormData();
    formData.append('staff_id', '');
    const response = await postData('api/app/coupon/transaction_settled', formData, token);
    if (response.statusCode == 200) {
      if (response.errors) {
        showToast(response.message);
        return;
      }
      let allTransaction = response.settled_data.concat(response.notsettled_data);
      let totalAmount = 0
      for (let i = 0; i < allTransaction.length; i++) {
        totalAmount = totalAmount + Number(allTransaction[i].amount_used);
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
      console.log("freedrinksdata",freedrinksdata);
      props.updateTotalAmount(totalAmount);
      props.updatesTransactions(response.settled_data.reverse());
      props.updateusTransactions(response.notsettled_data.reverse());
      props.updateFreeDrinkTransactions(freedrinksdata.reverse());
    } else {
      showToast(
        response.message ? response.message : 'Something went wrong, try again',
      );
    }
  }

  return (
    <ValCouponComponent
      isFlash={isFlash}
      setIsFlash={setIsFlash}
      onClickBack={onClickBack}
      onBarCodeRead={scanResult => onBarCodeRead(scanResult)}
      isLoading={isLoading}
      couponStatus={couponStatus}
      setcouponStatus={setcouponStatus}
      couponData={couponData}
      redeemAmount={redeemAmount}
      setredeemAmount={setredeemAmount}
      billAmount={billAmount}
      setbillAmount={setbillAmount}
      tableNumber={tableNumber}
      settableNumber={settableNumber}
      remarks={remarks}
      setremarks={setremarks}
      onClickRedeem={onClickRedeem}
      refRBSheet={refRBSheet}
      seekPremission={seekPremission}
      setSeekPremission={setSeekPremission}
      exceptionOnBarcodeRead={exceptionOnBarcodeRead}
      freeDrinksRefRBSheet={freeDrinksRefRBSheet}
      freeDrinks={props.freeDrinks}
      onClickRedeemFreeDrinks={onClickRedeemFreeDrinks}
    />
  );
}

// export default ValCouponContainer;
const mapStateToProps = state => ({
  sTransactions: state.transactionsreducer.sTransactions,
  usTransactions: state.transactionsreducer.usTransactions,
  totalAmount: state.transactionsreducer.totalAmount,
  freeDrinks: state.transactionsreducer.freeDrinks,
  freeDrinkTransactions: state.transactionsreducer.freeDrinkTransactions
});

const mapDispatchToProps = dispatch => ({
  updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
  updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
  updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } }),
  updatesFreeDrinks: (freeDrinks) => dispatch({ type: 'UPDATE_FREE_DRINKS', payload: { freeDrinks: freeDrinks } }),
  updateFreeDrinkTransactions:(freeDrinkTransactions) => dispatch({type: 'UPDATE_FREE_DRINK_TRANSACTIONS', payload: {freeDrinkTransactions:freeDrinkTransactions}}),
});


export default connect(mapStateToProps, mapDispatchToProps)(ValCouponContainer)