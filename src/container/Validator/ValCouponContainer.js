import React, { useState, useRef, useEffect } from 'react';
import ValCouponComponent from '../../screens/Validator/Home/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postData} from '../../services/rootService';
import { getToken } from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
import moment from 'moment';

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
  const [seekPremission, setSeekPremission] = useState(false);
  const inputRef = useRef()

  const onClickBack = () => {
    navigation.goBack();
  }

  { Platform.OS==='android' ? useEffect(() => {
    console.log(inputRef)
    if (inputRef.current) {
        inputRef.current?.forceFocus()
    }
}, [inputRef, props.couponStatus]) : null}

{ Platform.OS==='ios' ? useEffect(() => {
    const checkCameraPermission = async () => {
      const cameraPermissionStatus = await check(PERMISSIONS.IOS.CAMERA); 

      if (cameraPermissionStatus === RESULTS.DENIED) {
        setSeekPremission(true);
      }
    };

    checkCameraPermission();
  }, [setSeekPremission]) : null}


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
    if (scanResult.data && !isLoading) {
      setIsLoading(true)
      if(token){
        let formData = new FormData();
        formData.append('coupon_id', scanResult.data);
        var response = await postData(
          'api/app/coupon/validate_coupon_validator',
          formData,
          token,
        );
      }
      
      if (token && response.statusCode == 200) {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        if (response.errors) {
          showToast(response.message);
        }else{
          
        // console.log("Expiry",response.expiry_time)
        let responseData=response.data;
        responseData.couple_count=response.couple_count;
        responseData.stag_count=response.stag_count;
        responseData.ladies_count=response.ladies_count;
        responseData.type="coupon";
        // responseData.expiry_time=response.expiry_time;
        setCouponData(responseData)
        console.log("couponData", couponData)
        
        var curenttime = moment();
        
        if(response.data.is_validated){
          setcouponStatus('Already_Verified')
        } else if (
          curenttime.isBetween(
            moment(response.data.start_time),
            moment(response.data.expiry_time),
          )
        ) {
          console.log("Before", couponStatus)
          setcouponStatus('entry_verified')
          console.log("Before", couponStatus)
        } else if (curenttime.isBefore(moment(response.data.start_time))) {
          // setcouponStatus('aboutToStart')
          showToast("Event yet to start");
        } else if (curenttime.isAfter(moment(response.data.expiry_time))) {
          setcouponStatus('coupon_expired')
        } else {
          // setcouponStatus('invalid')
          showToast("Invalid QR code.");
        }
        }
      } 
    }
  };

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
      seekPremission={seekPremission}
      setSeekPremission={setSeekPremission}
      exceptionOnBarcodeRead={exceptionOnBarcodeRead}
    />
  );
}

// export default ValCouponContainer;
const mapStateToProps = state => ({
  sTransactions: state.transactionsreducer.sTransactions,
  usTransactions: state.transactionsreducer.usTransactions,
  totalAmount: state.transactionsreducer.totalAmount,
});

const mapDispatchToProps = dispatch => ({
  updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
  updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
  updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } })
});


export default connect(mapStateToProps, mapDispatchToProps)(ValCouponContainer)