import React, { useState, useRef, useEffect } from 'react';
import ValCouponComponent from '../../../screens/Validator/Home/ValCouponComponent';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import { postNodeData, getNodeData } from '../../../services/rootService';
import { getToken, getNodeToken } from '../../../services/persistData';
import { showToast } from '../../../components/common/ShowToast';
import moment from 'moment';
import { CommonActions } from '@react-navigation/native';
import { removeNodeToken, removeMpin, removeToken } from '../../../services/persistData';


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
      // if (!isLoading) {
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
      result1.vendor_id = props.vendor;
      console.log('result1', result1)
      console.log(props.nodeUserData.user)

      const response = await postNodeData('service/tickets_service/v1/tickets/action/entry', result1, nodeToken,
        { 'timestamp': new Date(), 'user': props.nodeUserData.user, 'vendor': props.vendor });

      console.log("onClickRedeem Response", response);
      if (response.statusCode == 200) {
        showToast('Ticket Successfully Verified');
        setIsLoading(false);
        getEventDetails(props.eventDetails);
        navigation.navigate("HomeContainer");
      } else if (response == 'Verification timeout') {
        setIsLoading(false);
        setcouponStatus('pending');
        showToast('Please Scan again');
        return;
      } else {
        setIsLoading(false);
        showToast(
          response ? response : 'Session might expired, please login again.'
        );
      }
      // }
    } catch (error) {
      setcouponStatus('pending')
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
      if (response1 == "Unauthorized request") {
        showToast('Session might have expired, please login again!!!')
        loggingOut();
      } else if (nodeToken && response1.statusCode == 200) {
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
        if (totalBalence == 0 && curenttime.isBetween(moment(response1.event_start), moment(response1.event_end))) {
          setcouponStatus('Already_Verified')
        }
        else if (
          curenttime.isBetween(
            moment(response1.event_start),
            moment(response1.event_end),
          )
        ) {
          setcouponStatus("entry_verified2")
        } else if (curenttime.isBefore(moment(response1.event_start))) {
          showToast('Event Yet to Start')
          navigation.navigate('HomeContainer')
          setcouponStatus('pending')

        } else {
          setcouponStatus('coupon_expired')
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

  const loggingOut = async () => {
    const token = await removeToken();
    const mpin = await removeMpin();
    const nodetoke = await removeNodeToken();
    if (token && mpin && nodetoke) {
      props.logoutData();
      {
        Platform.OS === 'android' ? (navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'ForgetPasswordContainer',
              },
            ],
          }),
        )) : (navigation.navigate('ForgetPasswordContainer'))
      }
    }
  }

  const getEventDetails = async (id) => {
    setIsLoading(true);
    const nodeToken = await getNodeToken();
    const response = await getNodeData(`service/tickets_service/v1/tickets/action/user/` + id, {}, nodeToken,
      { 'user': props.nodeUserData.user });

    console.log("Event details", response, response.statusCode)


    if (response.statusCode == 200) {
      if (response.errors) {
        showToast(response.message);
        setIsLoading(false);
        return;
      } else {
        const data = response._payload;
        const totalCount = data.reduce((acc, item) => acc + item.total_people, 0);
        props.updateTransactions(data);
        props.updateTotalEntries(totalCount);

      }
      setIsLoading(false);
    } else if (response == 'Verification timeout') {
      setIsLoading(false);
      setcouponStatus('pending');
      showToast('Please Scan again');
      return;
    } else {
      setIsLoading(false);
      showToast(
        response ? response : 'Session might expired, please login again.'
      );
      if (response == "Unauthorized request") {
        showToast('Session might expired, please login again!!!')
        loggingOut();
      }
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
      usTransactions={props.usTransactions}
    />
  );
}

// export default ValCouponContainer;
const mapStateToProps = state => ({
  sTransactions: state.transactionsreducer.sTransactions,
  usTransactions: state.transactionsreducer.usTransactions,
  totalAmount: state.transactionsreducer.totalAmount,
  nodeUserData: state.userreducer.nodeUserData,
  eventDetails: state.transactionsreducer.eventDetails,
  vendor: state.transactionsreducer.vendor,
});

const mapDispatchToProps = dispatch => ({
  updatesTransactions: (sTransactions) => dispatch({ type: 'UPDATE_S_TRANSACTIONS', payload: { sTransactions: sTransactions } }),
  updateusTransactions: (usTransactions) => dispatch({ type: 'UPDATE_US_TRANSACTIONS', payload: { usTransactions: usTransactions } }),
  updateTotalAmount: (totalAmount) => dispatch({ type: 'UPDATE_TOTAL_AMOUNT', payload: { totalAmount: totalAmount } }),
  updateTransactions: (validationsTrasactions) => dispatch({ type: 'UPDATE_VALIDATED_TRANSACTIONS', payload: { validationsTrasactions: validationsTrasactions } }),
  updateTotalEntries: (totalvalidationsEntries) => dispatch({ type: 'UPDATE_TOTAL_ENTRIES', payload: { totalvalidationsEntries: totalvalidationsEntries } }),
  updateEventDetails: (eventDetails) => dispatch({ type: 'UPDATE_EVENT_DETAILS', payload: { eventDetails: eventDetails } }),
  updateVendor: (vendor) => dispatch({ type: 'UPDATE_VENDOR_DETAILS', payload: { vendor: vendor } }),
  logoutData: () => dispatch({ type: 'USER_LOGGED_OUT' })
});


export default connect(mapStateToProps, mapDispatchToProps)(ValCouponContainer)