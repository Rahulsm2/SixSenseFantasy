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
import { OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';

const LoginComponent = (props) => {

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[gstyles.mt(60), gstyles.centerXY]}>

                    <Image source={require('../../assets/images/login_logo.png')}
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
                            left={
                                <TextInput.Icon
                                    icon={'phone'}
                                    iconColor="#3F3F3F"
                                    size={22}
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
                            secureTextEntry={true}
                            maxLength={25}
                            left={
                                <TextInput.Icon
                                    icon={'lock'}
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
                        onPress={()=> { props.onClickForget() }}
                            style={[{ alignSelf: 'flex-end' }]}>
                            <Text style={gstyles.OpenSans_Medium(16, '#3F3F3F')}>
                                Forget Password?
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

                </View>
            </View>
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