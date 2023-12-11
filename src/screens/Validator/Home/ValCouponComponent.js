import React, { useRef, useEffect } from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image, Dimensions, ScrollView,
    PermissionsAndroid,
    Platform
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg, HEIGHT } from '../../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import LoadingModel from "../../../components/common/Loading"
import CouponExpiredModal from "../../../components/Validator/CouponExpiredModal"
import { Modal, TextInput } from 'react-native-paper';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import CouponAlreadyVerified from '../../../components/Validator/CouponAlreadyVerified';
import CouponVerified2 from '../../../components/Validator/CouponVerified2'

const ValCouponComponent = (props) => {
    const { height, width } = Dimensions.get('window');
    const QR_BOX_SIZE = 250;
    const verticalHeight = (height - 120 - QR_BOX_SIZE) / 2;
    const verticalWidth = width;
    const horizontalHeight = QR_BOX_SIZE;
    const horizontalWidth = (width - QR_BOX_SIZE) / 2;
    const inputRef = useRef()
    const platform = Platform.OS == 'ios';

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header, (platform ? { paddingTop: HEIGHT * 0.04 } : null)]}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickBack() }}
                        >
                            <MaterialIcons name='arrow-back' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', gstyles.ms(15))}
                            numberOfLines={1}
                        >
                            Validate
                        </Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <RNCamera
                        mirrorImage={false}
                        captureAudio={false}
                        defaultTouchToFocus={true}
                        defaultOnFocusComponent={true}
                        aspect={1}
                        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                        flashMode={props.isFlash == true ?
                            RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            alignSelf: 'center',
                        }}
                        onBarCodeRead={(data) => props.isLoading || props.couponStatus !== 'pending' ? {} : props.onBarCodeRead(data)}
                    >
                        <View style={{ flex: 1 }}>
                            <View style={{
                                width: verticalWidth,
                                height: verticalHeight,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }} />

                            <View style={{ height: QR_BOX_SIZE, flexDirection: "row" }}>
                                <View style={{
                                    width: horizontalWidth,
                                    height: horizontalHeight + 1,
                                    backgroundColor: "rgba(0,0,0,0.5)"
                                }} />
                                <View style={{ width: QR_BOX_SIZE, height: QR_BOX_SIZE }}>
                                    <Image
                                        source={require('../../../assets/images/scan_gif.gif')}
                                        style={gstyles.iconSize(QR_BOX_SIZE)}
                                    />
                                </View>
                                <View style={{
                                    width: horizontalWidth,
                                    height: horizontalHeight + 1,
                                    backgroundColor: "rgba(0,0,0,0.5)"
                                }} />
                            </View>
                            <View style={{
                                width: verticalWidth,
                                height: verticalHeight,
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }} />
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
                                    color={'#0276E5'}
                                />
                            </TouchableOpacity>
                        </View>
                    </RNCamera>
                </View>
                <LoadingModel loading={props.isLoading} />


                {/* <CouponVerified
                    isVisible={props.couponStatus == 'entry_verified'}
                    setcouponStatus={props.setcouponStatus}
                    qrData={props.qrData}
                    onCliclContinue={props.onCliclContinue} /> */}

                <CouponVerified2
                    isVisible={props.couponStatus == 'entry_verified2'}
                    setcouponStatus={props.setcouponStatus}
                    qrData={props.qrData}
                    onCliclContinue={props.onCliclContinue}
                    updateInputValue={props.updateInputValue}
                    isChangeData={props.isChangeData}
                    onCliclRedeem={props.onCliclRedeem} />

                <CouponExpiredModal
                    visible={props.couponStatus == 'coupon_expired'}
                    setcouponStatus={props.setcouponStatus}
                    qrData={props.qrData}
                    usTransactions={props.usTransactions} />

                <CouponAlreadyVerified
                    visible={props.couponStatus == 'Already_Verified'}
                    setcouponStatus={props.setcouponStatus}
                    couponData={props.qrData} />

                <Modal
                    transparent
                    visible={props.seekPremission}
                    animationType="fade">
                    <View style={{ backgroundColor: '#fff', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={
                            async () => {
                                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
                                const result = await request(PERMISSIONS.IOS.CAMERA);
                                if (granted == PermissionsAndroid.RESULTS.GRANTED || result === RESULTS.GRANTED) {
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
        elevation: 3,

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
        borderColor: '#0276E5',
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