import * as React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, OpenSans_SemiBold, WIDTH, app_Bg } from '../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

const MPINLoginComponent = (props) => {

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[gstyles.mt(60), gstyles.centerXY]}>
                    {/* <Image source={require('../../assets/images/login_logo.png')}
                        style={gstyles.iconSize(107, 86)}
                    /> */}
                    <Image source={require('../../assets/images/toca-logo.png')}
                        style={gstyles.iconSize(110)}
                    />
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
                        keyboardType='number-pad'
                        maxLength={6}
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon
                                icon={'account-lock'}
                                iconColor="#3F3F3F"
                                size={22}
                            />
                        }
                        right={
                            <TextInput.Icon
                                icon={'eye'}
                                iconColor="#3F3F3F"
                                size={22}
                            />
                        }
                    />
                </View>

                <View style={styles.forgetTextView}>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.onClickForget() }}
                        style={[{ alignSelf: 'flex-end' }]}>
                        <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                            Forget MPIN?
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