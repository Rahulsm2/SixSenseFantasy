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
import { OpenSans_Medium, WIDTH, app_Bg, OpenSans_SemiBold } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"

const SetMPINComponent = (props) => {

    const handleMpin = (text) => {
        props.setMpin(text)

        if (text.length === 4) {
            Keyboard.dismiss();
        }
    };
    const Cmpin = (text) => {
        props.setConfirmMpin(text)

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
                            Set MPIN
                        </Text>
                    </View>

                    <View style={[gstyles.mt(50)]}>
                        <TextInput
                            mode="outlined"
                            label="New MPIN"
                            placeholder="Enter Your New MPIN"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            keyboardType='number-pad'
                            maxLength={4}
                            secureTextEntry={props.hideMpin}
                            left={
                                <TextInput.Icon
                                    icon={'account-lock'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    rippleColor='rgba(0,0,0,0)'
                                />
                            }
                            value={props.mpin}
                            onChangeText={(text) => handleMpin(text)}
                            right={
                                <TextInput.Icon
                                    icon={props.hideMpin ? 'eye' : 'eye-off-outline'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    onPress={() => props.setHideMpin(!props.hideMpin)}
                                />
                            }
                            autoFocus={true}
                        />
                    </View>

                    <View style={[gstyles.mt(25)]}>
                        <TextInput
                            mode="outlined"
                            label="Confirm New MPIN"
                            placeholder="Re-Enter Your New MPIN"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            keyboardType='number-pad'
                            maxLength={4}
                            value={props.confirmMpin}
                            onChangeText={(text) => Cmpin(text)}
                            left={
                                <TextInput.Icon
                                    icon={'account-lock'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    rippleColor='rgba(0,0,0,0)'
                                />
                            }
                        />
                    </View>

                    <View style={styles.forgetTextView}>
                        <View style={[{ alignSelf: 'flex-start' }]}>
                            <Text style={gstyles.OpenSans_Medium(12, '#3F3F3F')}>
                                *MPIN should be 4 digits in length
                            </Text>
                        </View>
                    </View>

                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={[styles.gradientTouch]}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.btnTouch}
                            onPress={() => { props.onClickContinue() }}
                        >
                            <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
            <LoadingModel loading={props.isLoading} />
        </>
    );
}

export default SetMPINComponent;

const styles = StyleSheet.create({

    inputText: {
        fontSize: 16,
        fontFamily: OpenSans_Medium,
        color: '#000000',
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
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
    },

    smoothInputView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        alignItems: 'center'
    }

});