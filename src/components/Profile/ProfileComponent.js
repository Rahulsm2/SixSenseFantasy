import * as React from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileComponent = (props) => {

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={styles.header}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickBack() }}
                        >
                            <MaterialIcons name='arrow-back' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', gstyles.ms(15))}
                            numberOfLines={1}
                        >
                            Profile
                        </Text>
                    </View>
                </View>
                <View style={[gstyles.centerXY, gstyles.mt(35)]}>
                    <ImageBackground source={require('../../assets/images/prof.jpg')}
                        style={styles.profImg}
                        borderRadius={100}
                        borderColor={'#0276E5'}
                        borderWidth={1}
                    >
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickEditProf() }}
                            style={[gstyles.me(5), gstyles.mb(5), { backgroundColor: '#FFFFFF', borderRadius: 100 }]}
                        >
                            <MaterialCommunityIcons name='circle-edit-outline' size={24} color='#0276E5' />
                        </TouchableOpacity>
                    </ImageBackground>

                    <View style={[gstyles.mt(15), gstyles.centerXY]}>
                        <Text style={gstyles.OpenSans_SemiBold(16, '#000000')}>
                            Basavaraddi Mulimani
                        </Text>
                        <Text style={gstyles.OpenSans_Medium(12, '#000000', gstyles.mt(5))}>
                            +91 99645 33375
                        </Text>
                        <Text style={gstyles.OpenSans_Medium(12, '#000000')}>
                            basavaraddi3522@gmail.com
                        </Text>
                    </View>

                    <TouchableOpacity activeOpacity={1}
                        style={[gstyles.inRow, gstyles.mt(50), { alignSelf: 'center', width: WIDTH - 35 }]}>
                        <View style={{
                            width: 40, alignSelf: 'center', ...gstyles.inRow,
                            height: 40, borderRadius: 4, backgroundColor: '#FFFFFF', elevation: 0,
                            justifyContent: 'center', borderColor: '#0276E526', borderWidth: 0.3
                        }}>
                            <MaterialCommunityIcons name='account-lock' color='#000' size={22} />
                        </View>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15))}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: WIDTH - 35, height: 0.6, backgroundColor: '#0276E526', marginVertical: 0 }} />
                    <TouchableOpacity activeOpacity={1}
                        style={[gstyles.inRow, gstyles.mt(15), { alignSelf: 'center', width: WIDTH - 35 }]}>
                        <View style={{
                            width: 40, alignSelf: 'center', ...gstyles.inRow,
                            height: 40, borderRadius: 4, backgroundColor: '#FFFFFF', elevation: 0,
                            justifyContent: 'center', borderColor: '#0276E526', borderWidth: 0.3
                        }}>
                            <Ionicons name='ios-share-social' color='#000' size={22} />
                        </View>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15))}>
                            Share
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: WIDTH - 35, height: 0.6, backgroundColor: '#0276E526', marginVertical: 0 }} />
                    <TouchableOpacity activeOpacity={1}
                        style={[gstyles.inRow, gstyles.mt(15), { alignSelf: 'center', width: WIDTH - 35 }]}>
                        <View style={{
                            width: 40, alignSelf: 'center', ...gstyles.inRow,
                            height: 40, borderRadius: 4, backgroundColor: '#FFFFFF', elevation: 0,
                            justifyContent: 'center', borderColor: '#0276E526', borderWidth: 0.3
                        }}>
                            <MaterialCommunityIcons name='email' color='#000' size={22} />
                        </View>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000', gstyles.ms(15))}>
                            Contact Us
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: WIDTH - 35, height: 0.6, backgroundColor: '#0276E526', marginVertical: 0 }} />
                    <TouchableOpacity activeOpacity={1}
                        style={[gstyles.inRow, gstyles.mt(15), { alignSelf: 'center', width: WIDTH - 35 }]}>
                        <View style={{
                            width: 40, alignSelf: 'center', ...gstyles.inRow,
                            height: 40, borderRadius: 4, backgroundColor: '#FFFFFF', elevation: 0,
                            justifyContent: 'center', borderColor: '#0276E526', borderWidth: 0.3
                        }}>
                            <Feather name='log-out' color='#FF0000' size={22} />
                        </View>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#FF0000', gstyles.ms(15))}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: WIDTH - 35, height: 0.6, backgroundColor: '#0276E526', marginVertical: 0 }} />

                    <Text style={gstyles.OpenSans_SemiBold(12, '#8338EC', { opacity: 0.3, marginTop: 25, textDecorationLine: 'underline' })}>
                        Version 1.0.0
                    </Text>


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
                            value='99645 33375'
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
            </View>
        </>
    );
}

export default ProfileComponent;

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

    inputBoxView: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8338EC'

    },

    inputText: {
        fontFamily: OpenSans_Medium,
        fontSize: 16,
        color: '#000000',
        paddingHorizontal: 15,
        width: '100%'
    }

});