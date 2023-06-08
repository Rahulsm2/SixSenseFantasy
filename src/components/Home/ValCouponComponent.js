import React,{useRef,useEffect} from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,Dimensions,ScrollView,
    PermissionsAndroid
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import LoadingModel from "../../components/common/Loading"
import CouponVerificationModal from "../../components/common/CouponVerificationModal"
import {showToast} from "../common/ShowToast"
import CouponExpireModal from "../../components/common/CouponExpireModal"
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Modal, TextInput } from 'react-native-paper';

const ValCouponComponent = (props) => {
    const { height, width } = Dimensions.get('window');
    const QR_BOX_SIZE = 250;
    const verticalHeight = (height-120-QR_BOX_SIZE)/2;
    const verticalWidth = width;
    const horizontalHeight = QR_BOX_SIZE;
    const horizontalWidth = (width-QR_BOX_SIZE)/2;
    const inputRef = useRef()

    const onCliclRedeem=()=>{
        props.setredeemAmount('');
        props.setbillAmount('');
        props.setremarks('');
        props.refRBSheet.current.open()
    }

    useEffect(()=>{
        console.log(inputRef)
        if(inputRef.current){
            inputRef.current.forceFocus()
        }
    },[inputRef,props.couponStatus])
    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={styles.header}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickBack() }}
                        >
                            <MaterialIcons name='arrow-back' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', gstyles.ms(15))}
                            numberOfLines={1}
                        >
                            Validate Coupon
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <RNCamera
                        mirrorImage={false}
                        captureAudio={false}
                        barcodeFinderVisible={true}
                        barcodeFinderWidth={280}
                        barcodeFinderHeight={220}
                        barcodeFinderBorderColor="white"
                        barcodeFinderBorderWidth={2}
                        defaultTouchToFocus
                        flashMode={props.isFlash == true ?
                            RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                        }}
                        onBarCodeRead={(data)=>props.isLoading || props.couponStatus!=='pending' ? {} : props.onBarCodeRead(data)}
                        
                    >
                        <View style={{flex: 1}}>
                            <View style={{
                                width: verticalWidth,
                                height: verticalHeight,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}/>

                            <View style={{height: QR_BOX_SIZE, flexDirection: "row"}}>
                                <View style={{
                                    width: horizontalWidth,
                                    height: horizontalHeight+1,
                                    backgroundColor: "rgba(0,0,0,0.5)"
                                }}/>
                                <View style={{width: QR_BOX_SIZE, height: QR_BOX_SIZE}}>
                                <Image
                            source={require('../../assets/images/scan_gif.gif')}
                            style={gstyles.iconSize(QR_BOX_SIZE)}
                        />
                                    </View>
                                <View style={{
                                    width: horizontalWidth,
                                    height: horizontalHeight+1,
                                    backgroundColor: "rgba(0,0,0,0.5)"
                                }}/>
                            </View>
                            <View style={{
                                width: verticalWidth,
                                height: verticalHeight,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}/>
                        </View>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 40,
                                flexDirection: 'row',
                                right: 40
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => { props.setIsFlash(!props.isFlash) }}
                                style={{
                                    fontSize: 18,
                                    fontFamily: OpenSans_Medium,
                                    color: '#fff',
                                    marginTop: 15,
                                    backgroundColor: '#FFFFFF',
                                    paddingVertical: 15,
                                    paddingHorizontal: 15,
                                    borderRadius: 100,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 60,
                                    height: 60,
                                }}
                            >
                                <Icons
                                    name={
                                        props.isFlash == true
                                            ? 'flash-off'
                                            : 'flash'
                                    }
                                    size={25}
                                    color={'#8338EC'}
                                />
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
                <LoadingModel loading={props.isLoading}/>
                <CouponExpireModal 
                    visible={props.couponStatus=='expired'} 
                    setcouponStatus={props.setcouponStatus}
                    couponData={props.couponData}/>
                <CouponVerificationModal 
                    isVisible={props.couponStatus=='verified'} 
                    setcouponStatus={props.setcouponStatus}
                    couponData={props.couponData}
                    onCliclRedeem={onCliclRedeem}/>

                <RBSheet
                    ref={props.refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    animationType={'slide'}
                    openDuration={250}
                    onClose={() => {
                        props.setcouponStatus('pending')}}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        },
                        draggableIcon: {
                            backgroundColor: "rgba(0,0,0,0.5)",
                            width: 50,
                            borderRadius: 4

                        },
                        container: {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            height: WIDTH * 1.25
                        }
                    }}
                >
                    <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                        <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(25)]}>
                            <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                                Redeem Coupon
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.6}
                            style={{ position: 'absolute', right: 25, top: 15 }}
                            onPress={() => {props.refRBSheet.current.close()
                            props.setcouponStatus('pending')}}
                        >
                            <AntDesign name='close' size={25} color='#0276E5' />
                        </TouchableOpacity>
                        <View style={[gstyles.inRowJSB, gstyles.px(16)]}>
                            <View style={[gstyles.inRow, gstyles.mt(20)]}>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    Coupon ID
                                </Text>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    :{'  '}<Text style={gstyles.OpenSans_Regular(16, '#000000')}>{props.couponData.id}</Text>
                                </Text>
                            </View>
                            <View style={[gstyles.inRow, gstyles.mt(20)]}>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    Balance
                                </Text>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    :{'  '}<Text style={gstyles.OpenSans_Bold(16, '#0276E5')}>{'\u20B9'} {props.couponData.amount}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={[gstyles.mt(25)]}>
                            <TextInput
                                ref={inputRef}
                                mode="outlined"
                                label="Redeem Amount"
                                placeholder="Enter Redeem Amount"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                keyboardType='number-pad'
                                maxLength={5}
                                left={
                                    <TextInput.Icon
                                        icon={'currency-inr'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                                value={props.redeemAmount}
                                onChangeText={(text)=>{
                                    const re = /^[0-9\b]+$/;
                                    if (text === '' || re.test(text)) {
                                        props.setredeemAmount(text)}}
                                     }
                            />
                        </View>
                        {/* <View style={{ width: WIDTH - 35, alignSelf: 'center' }}>
                            <Text style={gstyles.OpenSans_Regular(14, '#FF0000', gstyles.mt(5))}>
                                *Bill exceeds Coupon amount, Collect Rs. 500 in cash
                            </Text>
                        </View> */}
                        <View style={[gstyles.mt(20)]}>
                            <TextInput
                                mode="outlined"
                                label="Bill Number"
                                placeholder="Enter Bill Number"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                keyboardType='number-pad'
                                maxLength={10}
                                left={
                                    <TextInput.Icon
                                        icon={'ticket-confirmation-outline'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                                value={props.billAmount}
                                onChangeText={(text)=>{props.setbillAmount(text)}}
                            />
                        </View>
                        <View style={[gstyles.mt(24)]}>
                            <TextInput
                                mode="outlined"
                                label="Remarks"
                                placeholder="Enter Remarks"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                left={
                                    <TextInput.Icon
                                        icon={'note-text'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                                value={props.remarks}
                                onChangeText={(text)=>{props.setremarks(text)}}
                            />
                        </View>

                        <View style={[gstyles.inRowJSB, gstyles.centerX, { width: WIDTH - 35, marginTop: 24, marginBottom: 25 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#FFFFFF', '#FFFFFF']} style={[styles.settleBtnTouch, { height: 50 }]}>
                                <TouchableOpacity activeOpacity={0.6}
                                    style={[styles.btnTouch, styles.unSettleBtnTouch, { height: 50 }]}
                                    onPress={()=>showToast("Coming soon..!")}
                                >
                                    <Text style={gstyles.OpenSans_Bold(20, '#8338EC')}>
                                        Scan Bill
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#8338EC', '#3A86FF']} style={[styles.settleBtnTouch, { height: 50 }]}
                            >
                                <TouchableOpacity onPress={()=>{props.onClickRedeem()}} activeOpacity={0.6}
                                    style={[styles.btnTouch, { height: 50 }]}
                                >
                                    <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                        Redeem
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </ScrollView>
                </RBSheet>
                <Modal
                    transparent
                    visible={props.seekPremission}
                    animationType="fade">
                    <View style={{backgroundColor:'#fff',padding:10,alignItems:'center',justifyContent:'center'}}>
                        <TouchableOpacity onPress={
                            async ()=> {
                            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
                            if(granted == PermissionsAndroid.RESULTS.GRANTED){
                                props.setSeekPremission(false);
                            }
                        }}>
                        <Text>seekPremission</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        </>
    );
}

export default ValCouponComponent;

const styles = StyleSheet.create({

    header: {
        width: WIDTH,
        borderBottomColor: '#0276E526',
        borderBottomWidth: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        ...gstyles.inRowJSB,
        paddingHorizontal: 20,
        elevation: 3
    },

    totalRedeemCard: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#0276E51A',
        marginTop: 15,
        marginBottom: 15
    },

    settleBtnTouch: {
        width: '49.9%',
        height: 42,
        borderRadius: 4,
        ...gstyles.centerXY
    },

    unSettleBtnTouch: {
        backgroundColor: '#FFFFFF',
        borderColor: '#8338EC',
        borderWidth: 1
    },

    btnTouch: {
        width: '100%',
        height: 42,
        ...gstyles.centerXY,
        borderRadius: 4
    },

    transCardView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E51A',
    },

    inputText: {
        fontSize: 16,
        fontFamily: OpenSans_Medium,
        color: '#000000',
        // marginLeft: 5,
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },


});