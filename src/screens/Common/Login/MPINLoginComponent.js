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
import { OpenSans_Medium, OpenSans_SemiBold, WIDTH, app_Bg } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"

const MPINLoginComponent = (props) => {

    const handleMpin = (text) => {
        props.setMpin(text)

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
                        {/* <Image source={require('../../assets/images/toca-logo.png')}
                        style={gstyles.iconSize(110)}
                    /> */}
                        <Text style={gstyles.OpenSans_SemiBold(20, '#000000', gstyles.mt(25))}>
                            Enter MPIN to Login
                        </Text>
                    </View>

                    <View style={[gstyles.mt(50)]}>
                        <TextInput
                            mode="outlined"
                            label="Enter MPIN"
                            placeholder="Enter Your MPIN"
                            style={styles.inputText}
                            outlineColor='#8338EC'
                            keyboardType='numeric'
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
                            right={
                                <TextInput.Icon
                                    icon={props.hideMpin ? 'eye' : 'eye-off-outline'}
                                    iconColor="#3F3F3F"
                                    size={22}
                                    onPress={() => props.setHideMpin(!props.hideMpin)}
                                />
                            }
                            value={props.mpin}
                            onChangeText={(text) => handleMpin(text)}
                            autoFocus={true}
                        />
                    </View>

                    <View style={styles.forgetTextView}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickForget() }}
                            style={[{ alignSelf: 'flex-end' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                                Forgot MPIN?
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

export default MPINLoginComponent;

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
        marginTop: 7,
        marginBottom: 20,
        alignSelf: 'center',
        marginTop: 12
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
        alignItems: 'center',
        marginBottom: 35
    }

});