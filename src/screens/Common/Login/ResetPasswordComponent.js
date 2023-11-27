import * as React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"

const ResetPasswordComponent = (props) => {

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[gstyles.mt(60), gstyles.centerXY]}>
                    <Image source={require('../../../assets/images/login_logo.png')}
                        style={gstyles.iconSize(107, 86)}
                    />
                    <Text style={gstyles.OpenSans_SemiBold(20, '#000000', gstyles.mt(25))}>
                        Reset Password
                    </Text>
                </View>

                <View style={[gstyles.mt(50), gstyles.centerX]}>
                <TextInput
                        mode="outlined"
                        label="Mobile Number"
                        placeholder="Enter Your Mobile Number"
                        style={{...styles.inputText}}
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
                        onChangeText={(text) => { props.setMobileNumber(text) }}
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
                        onChangeText={(text) => { props.setOtp(text) }}
                    />
                </View>
            <View style={[gstyles.mt(25), gstyles.centerX]}>
                    <TextInput
                        mode="outlined"
                        label="Enter Password"
                        placeholder="Enter New Password"
                        style={styles.inputText}
                        outlineColor='#8338EC'
                        secureTextEntry={props.hidePassword}
                        value={props.password}
                        onChangeText={(value) => props.setPassword(value)}
                        maxLength={25}
                        disabled={!props.isOtpSent}
                        editable={props.isOtpSent}
                        left={
                            <TextInput.Icon
                                icon={'lock'}
                                iconColor="#3F3F3F"
                                size={22}
                                disabled={!props.isOtpSent}
                            />
                        }
                        right={
                            <TextInput.Icon
                            icon={props.hidePassword ? 'eye-off-outline' : 'eye'}
                                iconColor="#3F3F3F"
                                size={22}
                                onPress={() => props.setHidePassword(!props.hidePassword)}
                                disabled={!props.isOtpSent}
                            />
                        }
                    />
                </View>

                <View style={[gstyles.mt(25), gstyles.centerX]}>
                    <TextInput
                        mode="outlined"
                        label="Re-Enter Password"
                        placeholder="Re-Enter Password"
                        style={styles.inputText}
                        outlineColor='#8338EC'
                        secureTextEntry={true}
                        value={props.confPassword}
                        onChangeText={(value) => props.setConfPassword(value)}
                        maxLength={25}
                        disabled={!props.isOtpSent}
                        editable={props.isOtpSent}
                        left={
                            <TextInput.Icon
                                icon={'lock'}
                                iconColor="#3F3F3F"
                                size={22}
                                disabled={!props.isOtpSent}
                                
                            />
                        }
                    />
                </View>

                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#8338EC', '#3A86FF']} style={styles.gradientTouch}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => { 
                            if(props.isOtpSent){
                                props.onClickSave();
                            }else {
                                props.onClickSendOTP() 
                            }
                        }}
    
                    >
                        <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                        {props.isOtpSent ? "Reset Password" : "Send OTP"}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>

            </View>
            <LoadingModel loading={props.isLoading} />
        </>
    );
}

export default ResetPasswordComponent;

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
        alignSelf: 'center',
        marginTop: 25
    },

    btnTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }

});