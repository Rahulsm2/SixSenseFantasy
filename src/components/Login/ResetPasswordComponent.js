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
                <Image source={require('../../assets/images/login_logo.png')}
                    style={gstyles.iconSize(107, 86)}
                />
                <Text style={gstyles.OpenSans_SemiBold(20, '#000000', gstyles.mt(25))}>
                    Reset Password
                </Text>
            </View>

            <View style={[gstyles.mt(50), gstyles.centerX]}>
                <TextInput
                    mode="outlined"
                    label="Enter Password"
                    placeholder="Enter New Password"
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

            <View style={[gstyles.mt(25), gstyles.centerX]}>
                <TextInput
                    mode="outlined"
                    label="Re-Enter Password"
                    placeholder="Re-Enter Password"
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
                />
            </View>

            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={['#8338EC', '#3A86FF']} style={styles.gradientTouch}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.btnTouch}
                    onPress={()=>{ props.onClickSave() }}
                >
                    <Text style={gstyles.OpenSans_SemiBold(20, '#FFFFFF')}>
                        Save
                    </Text>
                </TouchableOpacity>
            </LinearGradient>

        </View>
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
    marginTop: 20
},

btnTouch: {
    width: WIDTH - 35,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
}

});