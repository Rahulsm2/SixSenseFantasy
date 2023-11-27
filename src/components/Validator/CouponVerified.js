import React, { useState } from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { WIDTH } from '../common/Constants';
import { gstyles } from '../common/GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

import moment from 'moment';


const CouponVerified = (props) => {
    return (
        <Modal
            transparent
            visible={props.isVisible}
            animationType="fade"
            onRequestClose={() => { props.setcouponStatus('pending') }}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.5)'}
                barStyle="light-content"
                animated
            />
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.setcouponStatus('pending') }}
                        style={{ position: 'absolute', right: 30, top: 30 }}
                    >
                        <AntDesign name='close' size={25} color='#0276E5' />
                    </TouchableOpacity>
                    <Text style={[gstyles.OpenSans_Bold(20, '#0276E5', gstyles.centerX), gstyles.mt(30)]}>
                        Coupon Verified
                    </Text>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(20)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Coupon ID
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}<Text style={gstyles.OpenSans_SemiBold(16, '#000000')}>{props.couponData.id}</Text>
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Total Entries
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{2*Number(props.couponData.couple_count)+Number(props.couponData.ladies_count)+
                            Number(props.couponData.stag_count)}{' People'}
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Valid till
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{moment(props.couponData.expiry_time).format("DD/MM/YY,  hh:mm A")}
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, { justifyContent: 'center', marginBottom:20}]}>
                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/male.png')}
                                style={[gstyles.iconSize(100), gstyles.mb(5), gstyles.mt(35)]}
                            />
                            <Text style={gstyles.OpenSans_SemiBold(18, '#000000')}>
                                Stag
                            </Text>
                            <View style={gstyles.inRow}>
                                <LinearGradient
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#8338EC', '#3A86FF']}
                                    style={{ borderRadius: 100 }}
                                >
                                    {/* <TouchableOpacity>
                                        <Entypo name="minus" size={25} color="#FFFFFF" />
                                    </TouchableOpacity> */}
                                </LinearGradient>
                                <Text style={[gstyles.OpenSans_Bold(28, '#0276E5'), gstyles.me(10), gstyles.ms(10)]}>{props.couponData.stag_count}</Text>
                                <LinearGradient
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#8338EC', '#3A86FF']}
                                    style={{ borderRadius: 100 }}
                                >
                                    {/* <TouchableOpacity>
                                        <Entypo name="plus" size={25} color="#FFFFFF" />
                                    </TouchableOpacity> */}
                                </LinearGradient>
                            </View>
                        </View>

                        <View style={[{ flexDirection: 'column', alignItems: 'center' }, gstyles.ms(20)]}>
                            <Image source={require('../../assets/images/female.png')}
                                style={[gstyles.iconSize(100), gstyles.mb(5), gstyles.mt(25)]}
                            />
                            <Text style={gstyles.OpenSans_SemiBold(18, '#000000')}>
                                Ladies
                            </Text>
                            <View style={gstyles.inRow}>
                                <View style={gstyles.inRow}>

                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#8338EC', '#3A86FF']}
                                        style={{ borderRadius: 100 }}
                                    >
                                        {/* <TouchableOpacity>
                                            <Entypo name="minus" size={25} color="#FFFFFF" />

                                        </TouchableOpacity> */}
                                    </LinearGradient>
                                    <Text style={[gstyles.OpenSans_Bold(28, '#0276E5'), gstyles.me(10), gstyles.ms(10)]}>{props.couponData.ladies_count}</Text>
                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#8338EC', '#3A86FF']}
                                        style={{ borderRadius: 100 }}
                                    >
                                        {/* <TouchableOpacity>
                                            <Entypo name="plus" size={25} color="#FFFFFF" />
                                        </TouchableOpacity> */}
                                    </LinearGradient>
                                </View>
                            </View>
                        </View>
                        <View style={[{ flexDirection: 'column', alignItems: 'center' }, gstyles.ms(20)]}>
                            <Image source={require('../../assets/images/Couple.png')}
                                style={[gstyles.iconSize(100), gstyles.mb(5), gstyles.mt(25)]}
                            />
                            <Text style={gstyles.OpenSans_SemiBold(18, '#000000')}>
                                Couple
                            </Text>
                            <View style={gstyles.inRow}>
                                <View style={gstyles.inRow}>

                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#8338EC', '#3A86FF']}
                                        style={{ borderRadius: 100 }}
                                    >
                                        {/* <TouchableOpacity>
                                            <Entypo name="minus" size={25} color="#FFFFFF" />

                                        </TouchableOpacity> */}
                                    </LinearGradient>
                                    <Text style={[gstyles.OpenSans_Bold(28, '#0276E5'), gstyles.me(10), gstyles.ms(10)]}>{props.couponData.couple_count}</Text>
                                    <LinearGradient
                                        start={{ x: 0, y: 1 }}
                                        end={{ x: 1, y: 1 }}
                                        colors={['#8338EC', '#3A86FF']}
                                        style={{ borderRadius: 100 }}
                                    >
                                        {/* <TouchableOpacity>
                                            <Entypo name="plus" size={25} color="#FFFFFF" />
                                        </TouchableOpacity> */}
                                    </LinearGradient>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/*<View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Male
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Female
                        </Text>
                    </View>*/}

                    </View>

                    {/* <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={styles.settleBtnTouch}>
                        <TouchableOpacity onPress={() => {
                            props.setcouponStatus('redeem');
                            props.onCliclRedeem()
                        }} activeOpacity={0.6}
                            style={styles.btnTouch}
                        >
                            <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient> */}
                </View>
            </View>
        </Modal>
    );
}

export default CouponVerified;

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