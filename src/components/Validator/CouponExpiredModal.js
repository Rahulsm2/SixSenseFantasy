import React, { useState } from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WIDTH } from '../common/Constants';
import { gstyles } from '../common/GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const CouponExpiredModal = (props) => {
    const navigation= useNavigation();
    return (
        <Modal
            transparent
            visible={props.visible}
            animationType="fade"
            onRequestClose={() => { props.setcouponStatus('pending') 
            navigation.navigate('HomeContainer') }}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.5)'}
                barStyle="light-content"
                animated
            />
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <LottieView source={require('../../assets/gif/animation_time.json')} style={[gstyles.iconSize(228, 228), gstyles.centerX]} autoPlay loop />
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.setcouponStatus('pending')
                    navigation.navigate('HomeContainer') }}
                        style={{ position: 'absolute', right: 30, top: 30 }}
                    >
                        <AntDesign name='close' size={25} color='#0276E5' />
                    </TouchableOpacity>
                    <Text style={gstyles.OpenSans_SemiBold(20, '#FF0000', gstyles.centerX)}>
                    Ticket Expired
                    </Text>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(20)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                        Ticket ID
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}<Text style={gstyles.OpenSans_Bold(16, '#000000')}>#{props.qrData.ticket_tracking_id}</Text>
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14), gstyles.mb(40)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Created at
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{moment(props.qrData.ticket_created_at).format('DD/MM/YY,   hh: mm A')}
                        </Text>
                    </View>
                    {/* <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14), gstyles.mb(50)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Valid till
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{props.expired}
                        </Text>
                    </View> */}
                </View>
            </View>
        </Modal>
    );
}

export default CouponExpiredModal;

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    modalView: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        shadowColor: '#00000066',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 16
    },

    settleBtnTouch: {
        width: '48%',
        // width: 174,
        height: 50,
        borderRadius: 4,
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 27
    },

    btnTouch: {
        width: '100%',
        height: 50,
        ...gstyles.centerXY,
        borderRadius: 4
    },

});