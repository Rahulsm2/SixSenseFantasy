import * as React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg, OpenSans_SemiBold, HEIGHT } from '../../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../../components/common/Loading"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

const ChangeMpinComponent = (props) => {
    const navigation=useNavigation();

    return (
        <>

            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}} style={ Platform.OS=='android' ? styles.floatButtonAndroid : styles.floatButton} >
                    <MaterialCommunityIcons name='keyboard-backspace' size={25} color='#3F3F3F' />
                </TouchableOpacity>
                <View style={[gstyles.mt(25), gstyles.centerXY]}>
                    <Image source={require('../../../assets/images/login_logo.png')}
                        style={gstyles.iconSize(107, 86)}
                    />
                    <Text style={gstyles.OpenSans_SemiBold(20, '#000000', gstyles.mt(25))}>
                       Change MPIN
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
                        value={props.mpin2}
                        onChangeText={(text) => props.setMpin2(text)}
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
                        value={props.confirmMpin2}
                        onChangeText={(text) => props.setConfirmMpin2(text)}
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
            <LoadingModel loading={props.isLoading}/>
        </>
    );
}

export default ChangeMpinComponent;

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
    },
    floatButton:{
        width: 40, 
        height: 40, 
        borderRadius: 100, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowColor: '#000000', 
        elevation: 5,
        shadowColor: '#0276E526',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 3,
        shadowRadius: 3,
        marginTop:HEIGHT*0.07,
        marginLeft:WIDTH*0.05
  
    },
    floatButtonAndroid:{
        width: 40, 
        height: 40, 
        borderRadius: 100, 
        backgroundColor: 'white', 
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowColor: '#000000', 
        elevation: 5,
        shadowRadius: 3,
        marginTop:HEIGHT*0.07,
        marginLeft:WIDTH*0.05
    }

});