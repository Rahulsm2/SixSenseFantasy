import React, { useState, useRef, useEffect } from 'react';
import ValCouponComponent from '../../../screens/Validator/Home/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postNodeData, getNodeData } from '../../../services/rootService';
import { getToken, getNodeToken } from '../../../services/persistData';
import { showToast } from '../../../components/common/ShowToast';
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
  const [qrData, setqrData] = useState('');
  const [isChangeData, setIsChangeData] = useState(false);
  const [seekPremission, setSeekPremission] = useState(false);
  const inputRef = useRef()
  

  {
    Platform.OS === 'android' ? useEffect(() => {
      console.log(inputRef)
      if (inputRef.current) {
        inputRef.current?.forceFocus()
      }
    }, [inputRef, props.couponStatus]) : null
  }

  {
    Platform.OS === 'ios' ? useEffect(() => {
      const checkCameraPermission = async () => {
        const cameraPermissionStatus = await check(PERMISSIONS.IOS.CAMERA);

        if (cameraPermissionStatus === RESULTS.DENIED) {
          setSeekPremission(true);
        }
      };

      checkCameraPermission();
    }, [setSeekPremission]) : null
  }


  const onClickBack = () => {
    navigation.goBack();
  }

  const onCliclRedeem = async () => {
    let completedata = qrData;
    let ticketdata = completedata.tickets_data;
    let totalAddedCount = 0;
    for (let i = 0; i < ticketdata.length; i++) {
      totalAddedCount = totalAddedCount + ticketdata[i].inputValue;
    }
    if (totalAddedCount == 0) {
      showToast(
        'Add atleast one package to verify'
      );
      return;
    }
    try {
      if (!isLoading) {
        setIsLoading(true);
        setcouponStatus('pending')
        const nodeToken = await getNodeToken();
        let result1 = {};
        result1.event_id = qrData.tickets_data[0].package_data.association;
        result1.ticket_data = [];
        for (let i = 0; i < qrData.tickets_data.length; i++) {
          if (qrData.tickets_data[i].inputValue > 0) {
            result1.ticket_data.push({
              "ticket_id": qrData.tickets_data[i].ticket_id,
              "ticket_tracking_id": qrData.ticket_tracking_id,
              "action_value": qrData.tickets_data[i].inputValue
            });
          }

        }
        result1.user_id = props.nodeUserData.user;
        result1.vendor_id = qrData.user_data.vendor._id;
        console.log('result1', result1)
        console.log(props.nodeUserData.user)

        const response = await postNodeData('service/tickets_service/v1/tickets/action/entry', result1, nodeToken,
          { 'timestamp': new Date(), 'user': props.nodeUserData.user, 'vendor': qrData.user_data.vendor._id });

        console.log("onClickRedeem Response", response);
        if (response.statusCode == 200) {
          showToast('Ticket Successfully Verified');
          setIsLoading(false);
          getTransactions();
          navigation.navigate("HomeContainer");
        } else {
          setIsLoading(false);
          showToast(
            response.message ? response.message : 'Session might expired, please login again.'
          );
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const updateInputValue = (index, value) => {
    let completedata = { ...qrData };
    let ticketsData = [...completedata.tickets_data];
    ticketsData[index].inputValue = value;
    let totalAddedCount = 0;
    for (let i = 0; i < ticketsData.length; i++) {
      totalAddedCount = totalAddedCount + ticketsData[i].inputValue;
    }
    completedata = {
      ...completedata,
      tickets_data: ticketsData,
      totalAddedCount: totalAddedCount,
  };
    setqrData(completedata);
    setIsChangeData(!isChangeData);
    console.log("updated", qrData)
  }


  onBarCodeRead = async scanResult => {
    const nodeToken = await getNodeToken();
    console.log("nodeToken", nodeToken);
    if (scanResult.data && !isLoading) {
      setIsLoading(true)
      if (nodeToken) {
        response1 = await getNodeData(
          'service/tickets_service/v1/tickets/ticket/token/' + scanResult.data,
          {},
          nodeToken,
          { 'user': props.nodeUserData ? props.nodeUserData.user : "" }
        );

        props.updateusTransactions(response1)

        console.log("response1.tickets_data", response1.event_name);
        
      }

      if (nodeToken && response1.statusCode == 200) {
        // console.log("response1.tickets_data", response1);
        let totalBalence = 0;
        let completedata = response1;
        let ticketdata = response1.tickets_data
        for (let i = 0; i < ticketdata.length; i++) {
          let data = ticketdata[i];
          totalBalence = totalBalence + ticketdata[i].balance;
          data.inputValue = ticketdata[i].balance;
          ticketdata[i] = data;
        }
        completedata.totalAddedCount = totalBalence;
        setqrData(completedata);
        var curenttime = moment();
        if (totalBalence == 0) {
          setcouponStatus('Already_Verified')
        } 
        else if (totalBalence > 0) {
         if (
          curenttime.isBetween(
            moment(response1.tickets_data[0].package_data.ticket_param.valid_from),
            moment(response1.tickets_data[0].package_data.ticket_param.valid_till),
          )
        ) {
          setcouponStatus("entry_verified2")
        } else if(curenttime.isBefore(moment(response1.tickets_data[0].package_data.ticket_param.valid_from))){
          showToast('Event Yet to Start')
          navigation.navigate('HomeContainer')
          setcouponStatus('pending')
          
        } else {
          setcouponStatus('coupon_expired')
        }
          }
        }
        else {
          showToast('Invalid Ticket')
          navigation.navigate('HomeContainer')
          setcouponStatus('pending')
        }
        
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        response1.message
          ? showToast(response1.message)
          : showToast(
            'Invalid Ticket'
          );
      }
  };

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
      props.updateTransactions(response._payload);
      let data = response._payload;
      let totalCount = 0;
      for (let i = 0; i < data.length; i++) {
        totalCount = totalCount + data[i].total_people;
      }
      props.updateTotalEntries(totalCount);
    } else {
      setIsLoading(false);
      showToast(
        response.message ? response.message : 'Session might expired, please login again.'
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
      qrData={qrData}
      seekPremission={seekPremission}
      onCliclRedeem={onCliclRedeem}
      setSeekPremission={setSeekPremission}
      updateInputValue={updateInputValue}
      isChangeData={isChangeData}
    />
  );
}

// export default ValCouponContainer;
const mapStateToProps = state => ({
  sTransactions: state.transactionsreducer.sTransactions,
  usTransactions: state.transactionsreducer.usTransactions,
  totalAmount: state.transactionsreducer.totalAmount,
  nodeUserData: state.userreducer.nodeUserData
});

const mapDispatchToProps = dispatch => ({
  updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
  updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
  updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } }),
  updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
  updateTotalEntries: (totalvalidationsEntries) => dispatch({ type: 'UPDATE_TOTAL_ENTRIES', payload: { totalvalidationsEntries: totalvalidationsEntries } }),
});


export default connect(mapStateToProps, mapDispatchToProps)(ValCouponContainer)