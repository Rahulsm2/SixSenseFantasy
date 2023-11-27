import * as React from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Platform
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-paper';

const EditProfileComponent = (props) => {
    const platform = Platform.OS =='ios';
    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header, (platform ? { paddingTop: HEIGHT*0.04 } : null )]}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickBack() }}
                        >
                            <MaterialIcons name='arrow-back' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', gstyles.ms(15))}
                            numberOfLines={1}
                        >
                            Edit Profile
                        </Text>
                    </View>
                </View>
                <View style={[gstyles.centerXY, gstyles.mt(35)]}>
                    <ImageBackground source={require('../../../assets/images/account.png')}
                        style={styles.profImg}
                        borderRadius={100}
                        borderColor={'#0276E5'}
                        borderWidth={1.5}
                    >
                        {/* <TouchableOpacity activeOpacity={0.6}
                            style={[gstyles.me(5), gstyles.mb(5), styles.cameraTouch]}
                        >
                            <MaterialCommunityIcons name='camera' size={18} color='#0276E5' />
                        </TouchableOpacity> */}
                    </ImageBackground>
                </View>
                <View style={[gstyles.mt(50)]}>
                    <TextInput
                        mode="outlined"
                        label="Name"
                        placeholder="Edit Your Name"
                        value={props.name}
                        style={styles.inputText}
                        outlineColor='#8338EC'
                        keyboardType='number-pad'
                        maxLength={30}
                        left={
                            <TextInput.Icon
                                icon={'account'}
                                iconColor="#3F3F3F"
                                size={22}
                            />
                        }
                        disabled={true}
                    />
                </View>
                <View style={[gstyles.mt(25)]}>
                    <TextInput
                        mode="outlined"
                        label="Mobile Number"
                        placeholder="Edit Your Mobile Number"
                        value={props.userData && props.userData.phone}
                        style={styles.inputText}
                        outlineColor='#8338EC'
                        maxLength={10}
                        left={
                            <TextInput.Icon
                                icon={'phone'}
                                iconColor="#3F3F3F"
                                size={22}
                            />
                        }
                        disabled={true}
                    />
                </View>
                <View style={[gstyles.mt(25)]}>
                    <TextInput
                        mode="outlined"
                        label="Mail ID"
                        placeholder="Edit Your Mail Id"
                        value={props.userData && props.userData.email}
                        style={styles.inputText}
                        outlineColor='#8338EC'
                        maxLength={30}
                        left={
                            <TextInput.Icon
                                icon={'email'}
                                iconColor="#3F3F3F"
                                size={22}
                            />
                        }
                        disabled={true}
                    />
                </View>
                {/* <View style={[styles.inputBoxView, gstyles.mt(30)]}>
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={'#3F3F3F'}
                        style={styles.inputText}
                        value='Basavaraddi Mulimani'
                        editable={false}
                    />
                </View>
                <View style={[styles.inputBoxView, gstyles.mt(25)]}>
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={'#3F3F3F'}
                        style={styles.inputText}
                        value='9964533375'
                        editable={false}
                        keyboardType='number-pad'
                        maxLength={10}
                    />
                </View>
                <View style={[styles.inputBoxView, gstyles.mt(25)]}>
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={'#3F3F3F'}
                        style={styles.inputText}
                        value='basavaraddi3522@gmail.com'
                        editable={false}
                    />
                </View> */}
            </View>
        </>
    );
}

export default EditProfileComponent;

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

    profImg: {
        ...gstyles.iconSize(109),
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    cameraTouch: {
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        width: 30,
        height: 30,
        ...gstyles.centerXY,
        borderColor: '#0276E5',
        borderWidth: 0.3
    },

    inputBoxView: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8338EC',
        alignSelf: 'center'

    },

    inputText: {
        fontFamily: OpenSans_Medium,
        fontSize: 16,
        color: '#000000',
        paddingHorizontal: 15,
        width: WIDTH - 35,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF'
    }

});