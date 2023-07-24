import React, { useState,useRef, useEffect } from 'react';
import ValCouponComponent from '../../components/Home/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData } from '../../services/rootService';
import {getToken} from '../../services/persistData';
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
    const [seekPremission, setSeekPremission] = useState(false);
    const [remarks, setremarks] = useState('');
    const refRBSheet = useRef();

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

    useEffect(()=>{
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      console.log("granted",granted);
      if(granted === PermissionsAndroid.RESULTS.DENIED){
        setSeekPremission(true);
      }
    },[seekPremission]);

    onBarCodeRead = async scanResult => {
        const token = await getToken();
        console.log(scanResult);
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
              setCouponData(response.data)
              var curenttime = moment();
              if (
                curenttime.isBetween(
                  moment(response.data.start_time),
                  moment(response.data.expiry_time),
                )
              ){
                setcouponStatus('verified')
              }else if(curenttime.isBefore(moment(response.data.start_time))){
                setcouponStatus('aboutToStart')
              }else if(curenttime.isAfter(moment(response.data.expiry_time))){
                setcouponStatus('expired')
              }else{
                setcouponStatus('invalid')
              }
              console.log("couponStatus",couponStatus);
          } else {
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
            response.message
              ? showToast(response.message)
              : showToast(
                  'Something went wrong, please try again later'
                );
          }
        }
      };

      const onClickRedeem=async()=>{
        if (Number(redeemAmount)<=0) {
          message = 'Enter valid Redeem Amount.';
          showToast(message);
          return;
        } 
        if (!billAmount.trim()) {
          message = 'Enter valid Bill ID.';
          showToast(message);
          return;
        }
        // if (!remarks.trim()) {
        //   message = 'Enter valid remarks.';
        //   showToast(message);
        //   return;
        // }
        if (Number(redeemAmount)>Number(couponData.amount)) {
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
          formData.append('remarks', remarks);
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
                setredeemAmount('')
                setremarks('')
                setIsLoading(false)
              // refRBSheet.current.close()
                // setcouponStatus('verified')
                console.log("Something",couponData,couponStatus);
          }
      }

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
            remarks={remarks}
            setremarks={setremarks}
            onClickRedeem={onClickRedeem}
            refRBSheet={refRBSheet}
            seekPremission={seekPremission}
            setSeekPremission={setSeekPremission}
        />
    );
}

// export default ValCouponContainer;
const mapStateToProps = state => ({
  sTransactions: state.transactionsreducer.sTransactions,
  usTransactions: state.transactionsreducer.usTransactions,
  totalAmount: state.transactionsreducer.totalAmount
});

const mapDispatchToProps = dispatch => ({
  updatesTransactions:(sTransactions) => dispatch({type: 'UPDATE_S_TRANSACTIONS', payload: {sTransactions:sTransactions}}),
  updateusTransactions:(usTransactions) => dispatch({type: 'UPDATE_US_TRANSACTIONS', payload: {usTransactions:usTransactions}}),
  updateTotalAmount:(totalAmount) => dispatch({type: 'UPDATE_TOTAL_AMOUNT', payload: {totalAmount:totalAmount}})
});


export default connect(mapStateToProps,mapDispatchToProps)(ValCouponContainer)