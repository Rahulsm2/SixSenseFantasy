import React, { useState } from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { HEIGHT, WIDTH } from '../common/Constants';
import { gstyles } from '../common/GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';



const CouponVerified2 = (props) => {

    if (!props.qrData || !Array.isArray(props.qrData.tickets_data)) {
        return null;
    }

    const _renderPackage = ({ item, index }) => {
        return item.balance==0 ? null : (
            <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, gstyles.ms(30), gstyles.mt(20)]}>
               <View>
                <Text style={gstyles.OpenSans_SemiBold(20, '#3A86FF', gstyles.size('100%'))}>
                    {item.package_data.package_map.package.name} <Text style={gstyles.OpenSans_SemiBold(14, '#000')}>( {item.package_data.package_map.package.pax} People )</Text>
                </Text>
                <Text style={gstyles.OpenSans_SemiBold(14, '#3A86FF', gstyles.size('100%'))}>
                    Balence : <Text style={gstyles.OpenSans_SemiBold(12, '#000')}>{item.balance} People </Text>
                </Text>
                </View>
                <View style={gstyles.inRow}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']}
                        style={{ borderRadius: 100 ,opacity: item.inputValue==0 ? 0.4 : 1, padding:3.5}}
                    >
                        <TouchableOpacity disabled={item.inputValue==0} onPress={() => props.updateInputValue(index,item.inputValue-1)}>
                            <Entypo name="minus" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    </LinearGradient>
                    <Text style={[gstyles.OpenSans_Bold(24, '#0276E5'), gstyles.me(10), gstyles.ms(10)]}>{item.inputValue}</Text>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']}
                        style={{ borderRadius: 100, marginRight: 40 ,opacity:item.inputValue==item.balance ? 0.4 : 1, padding:3.5 }}
                    >
                        <TouchableOpacity disabled={item.inputValue==item.balance} onPress={() => props.updateInputValue(index,item.inputValue+1)}>
                            <Entypo name="plus" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        );

    };
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
                        Ticket Verified
                    </Text>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(30)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Ticket ID
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}<Text style={gstyles.OpenSans_SemiBold(16, '#000000')}>{props.qrData.ticket_tracking_id}</Text>
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Total Entries
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{props.qrData.total_ppl}{' People'}
                        </Text>
                    </View>
                    {/* <View style={[gstyles.inRow, gstyles.ms(35), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Valid till
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}{moment(props.qrData.expiry_time).format("DD/MM/YY,  hh:mm A")}
                        </Text>
                    </View> */}

                    <FlatList
                        data={props.qrData.tickets_data}
                        renderItem={_renderPackage}
                        extraData={props.isChangeData}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                    />
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={{...styles.settleBtnTouch,opacity:props.qrData.totalAddedCount<=0 ? 0.4:1}}>
                        <TouchableOpacity 
                        disabled={props.qrData.totalAddedCount<=0}
                        onPress={() => {
                            props.setcouponStatus('redeem');
                            props.onCliclRedeem();
                        }} activeOpacity={0.6}
                            style={styles.btnTouch}
                        >
                            <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

export default CouponVerified2;

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
        shadowColor: '#0000006',
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