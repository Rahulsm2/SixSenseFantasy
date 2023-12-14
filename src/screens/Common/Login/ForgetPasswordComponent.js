import React, { useRef } from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"

const ForgetPasswordComponent = (props) => {

    const handlePhoneNumberChange = (text) => {
        props.setMobileNumber(text)

        if (text.length === 10) {
            Keyboard.dismiss();
        }
    };

    const handleOTPChange = (text) => {
        props.setOtp(text);

        if (text.length === 4) {
            Keyboard.dismiss();
        }
    };

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={[gstyles.container(app_Bg)]}>
                    <View style={[gstyles.mt(60), gstyles.centerXY]}>
                        <Image source={require('../../../assets/images/login_logo.png')}
                            style={gstyles.iconSize(107, 86)}
                        />
                        <Text style={gstyles.OpenSans_SemiBold(20, '#000000', gstyles.mt(25))}>
                            Login to TicketsQue Insider
                        </Text>
                    </View>

                    <View style={[gstyles.mt(50), gstyles.centerX]}>
                        <TextInput
                            mode="outlined"
                            label="Mobile Number"
                            placeholder="Enter Your Mobile Number"
                            style={{ ...styles.inputText }}
                            outlineColor='#8338EC'
                            keyboardType='number-pad'
                            maxLength={10}
                            left={
                                <TextInput.Icon
                                    icon={'phone'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    rippleColor='rgba(0,0,0,0)'
                                    disabled={props.isOtpSent}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    icon={'square-edit-outline'}
                                    iconColor={"#3F3F3F"}
                                    size={22}
                                    disabled={!props.isOtpSent}
                                    onPress={() => {
                                        props.setIsOtpSent(false)
                                        props.setOtp('')
                                    }}
                                />
                            }
                            value={props.mobileNumber}
                            onChangeText={(text) => { handlePhoneNumberChange(text) }}
                            disabled={props.isOtpSent}
                            editable={!props.isOtpSent}
                            autoFocus={true}
                        />
                    </View>

                    <View style={[gstyles.mt(25), gstyles.centerX]}>
                        <TextInput
                            mode="outlined"
                            label="Enter OTP"
                            disabled={!props.isOtpSent}
                            placeholder="Enter OTP"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            secureTextEntry={props.hideOtp}
                            keyboardType='number-pad'
                            maxLength={4}
                            left={
                                <TextInput.Icon
                                    icon={'lock'}
                                    iconColor={"#3F3F3F"}
                                    size={22}
                                    disabled={!props.isOtpSent}
                                    rippleColor='rgba(0,0,0,0)'
                                />
                            }
                            right={
                                <TextInput.Icon
                                    icon={props.hideOtp ? 'eye' : 'eye-off-outline'}
                                    iconColor={"#3F3F3F"}
                                    size={22}
                                    disabled={!props.isOtpSent}
                                    onPress={() => props.setHideOtp(!props.hideOtp)}
                                />
                            }
                            value={props.otp}
                            editable={props.isOtpSent}
                            onChangeText={(text) => { handleOTPChange(text) }}
                        />
                    </View>

                    <View style={styles.forgetTextView}>
                        <TouchableOpacity onPress={() => { props.onClickSendOTP() }} disabled={!props.isOtpSent || props.timer > 1} activeOpacity={0.6}
                            style={[{ alignSelf: 'flex-end' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, props.isOtpSent ? "#3F3F3F" : "#3F3F3F40")}>
                                {props.timer != 0 ? props.timer + "s" : null} <Text style={gstyles.OpenSans_Medium(16, props.timer < 1 ? "#3F3F3F" : "#3F3F3F40")}>Resend OTP?</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={styles.gradientTouch}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.btnTouch}
                            onPress={() => {
                                if (props.isOtpSent) {
                                    props.onClickContinue();
                                } else {
                                    props.onClickSendOTP()
                                }
                            }}
                        >
                            <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                                {props.isOtpSent ? "Verify OTP" : "Send OTP"}
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    {/* <View style={styles.forgetTextView}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickLoginWithPass() }}
                            style={[{ alignSelf: 'center' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                                Login with Password
                            </Text>
                        </TouchableOpacity>
                    </View> */}

                </View>
            </TouchableWithoutFeedback>
            <LoadingModel loading={props.isLoading} />
            <TouchableOpacity onPress={() => { Linking.openURL('https://ticketsque.info/'); }} style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}>
                <Text>Join as a Business Partner</Text>
            </TouchableOpacity>
        </>
    );
}

export default ForgetPasswordComponent;

const styles = StyleSheet.create({

    inputText: {
        fontSize: 16,
        fontFamily: OpenSans_Medium,
        color: '#000000',
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF'
    },

    forgetTextView: {
        width: WIDTH - 35,
        marginTop: 12,
        marginBottom: 20,
        alignSelf: 'center'
    },

    gradientTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },

    btnTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }

});