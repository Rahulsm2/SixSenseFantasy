import React from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';

const ValCouponComponent = (props) => {

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
                    >
                        <View
                            style={{
                                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                                position: 'absolute',
                                top: 0,
                                width: '60%',
                                height: '34%',
                            }}
                        ></View>
                        <Image
                            source={require('../../assets/images/scan_gif.gif')}
                            style={gstyles.iconSize(WIDTH - 160)}
                        />
                        <View
                            style={{
                                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                                position: 'absolute',
                                bottom: 0,
                                width: '60%',
                                height: '34%',
                            }}
                        ></View>
                        <View
                            style={{
                                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                                position: 'absolute',
                                left: 0,
                                width: '20%',
                                height: '100%',
                            }}
                        ></View>
                        <View
                            style={{
                                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                                position: 'absolute',
                                right: 0,
                                width: '20%',
                                height: '100%',
                            }}
                        ></View>
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


});