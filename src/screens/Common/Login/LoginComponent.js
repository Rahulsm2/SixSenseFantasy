import * as React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"

const LoginComponent = (props) => {

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

                    <View style={[gstyles.mt(50)]}>
                        <TextInput
                            mode="outlined"
                            label="Mobile Number"
                            placeholder="Enter Your Mobile Number"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            keyboardType='number-pad'
                            maxLength={10}
                            value={props.mobileNumber}
                            autoFocus={true}
                            onChangeText={(text) => {
                                const re = /^[0-9\b]+$/;
                                if (text === '' || re.test(text)) {
                                    props.setMobileNumber(text)
                                }
                            }
                            }
                            left={
                                <TextInput.Icon
                                    icon={'phone'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    rippleColor='rgba(0,0,0,0)'
                                />
                            }
                        />
                    </View>

                    <View style={[gstyles.mt(25)]}>
                        <TextInput
                            mode="outlined"
                            label="Password"
                            placeholder="Enter Your Password"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            secureTextEntry={props.hidePassword}
                            maxLength={25}
                            value={props.password}
                            onChangeText={(text) => props.setPassword(text)}
                            left={
                                <TextInput.Icon
                                    icon={'lock'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    rippleColor='rgba(0,0,0,0)'
                                />
                            }
                            right={
                                <TextInput.Icon
                                    icon={props.hidePassword ? 'eye' : 'eye-off-outline'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    onPress={() => props.setHidePassword(!props.hidePassword)}
                                />
                            }
                        />
                    </View>
                    <View style={styles.forgetTextView}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickForget() }}
                            style={[{ alignSelf: 'flex-end' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                                Forgot Password?
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
                            onPress={() => { props.onClickLogin(); }}
                        >
                            <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                                Login
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={styles.forgetTextView}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickLoginWithOtp() }}
                            style={[{ alignSelf: 'center' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                                Login with OTP
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <LoadingModel loading={props.isLoading} />
            </View>
            </TouchableWithoutFeedback>
        </>
    );
}

export default LoginComponent;

const styles = StyleSheet.create({

    inputText: {
        fontSize: 16,
        fontFamily: OpenSans_Medium,
        color: '#000000',
        // marginLeft: 5,
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF'
    },

    forgetTextView: {
        width: WIDTH - 35,
        marginTop: 12,
        marginBottom: 20
    },

    gradientTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnTouch: {
        width: WIDTH - 35,
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    }

});