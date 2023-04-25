import React from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { WIDTH } from './Constants';
import { gstyles } from './GlobalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const RedeemedDetailsModal = (props) => {

    return (
        <Modal
            transparent
            visible={true}
            animationType="fade"
            onRequestClose={() => { props.setIsLogOutModal(false) }}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.5)'}
                barStyle="light-content"
                animated
            />
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[gstyles.centerX, gstyles.mt(30), gstyles.mb(25)]}>
                        <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                            Redeemed Details
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.setIsDetailModal(!props.isDetailModal) }}
                        style={{ position: 'absolute', right: 30, top: 30 }}
                    >
                        <AntDesign name='close' size={25} color='#0276E5' />
                    </TouchableOpacity>
                    <View style={[gstyles.inRow, gstyles.ms(40)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Bill No.
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(16, '#000000')}>
                            :{'    '}0133456
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Coupon Id
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}012455
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Name
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}Shankar
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Redeemed at
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                            :{'    '}03/02/23,   01: 10 AM
                        </Text>
                    </View>
                    <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14)]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Amount
                        </Text>
                        <Text style={gstyles.OpenSans_Regular(20, '#000000')}>
                            :{'    '}<Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                                {'\u20B9'} 2000
                            </Text>
                        </Text>
                    </View>

                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={styles.settleBtnTouch}>
                        <TouchableOpacity activeOpacity={0.6}
                            style={styles.btnTouch}
                            onPress={() => { props.setIsDetailModal(!props.isDetailModal) }}
                        >
                            <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                Bill Settled
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
}

export default RedeemedDetailsModal;

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