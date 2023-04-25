import React from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { WIDTH } from './Constants';
import { gstyles } from './GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PopMenuModal = (props) => {

    return (
        <Modal
            transparent
            visible={true}
            animationType="fade"
            onRequestClose={() => { props.setIsPopMenu(false) }}>
            <StatusBar
                backgroundColor={'rgba(0,0,0,0.2)'}
                barStyle="light-content"
                animated
            />
            <TouchableWithoutFeedback
                onPress={() => { props.setIsPopMenu(false) }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.iconTouch, gstyles.mt(10)]}
                            activeOpacity={0.6}
                            onPress={() => { props.setIsPopMenu(false) }}
                        >
                            <View style={[styles.iconBg, { backgroundColor: '#8338EC' }]}>
                                <MaterialCommunityIcons name='check-all' size={12} color='#FFFFFF' />
                            </View>
                            <Text style={gstyles.OpenSans_SemiBold(14, '#8338EC', gstyles.ms(15))}>
                                All  Transactions
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.hrLine} />
                        <TouchableOpacity style={[styles.iconTouch, gstyles.mb(10)]}
                            activeOpacity={0.6}
                            onPress={() => { props.setIsPopMenu(false) }}
                        >
                            <View style={styles.iconBg}>
                                <MaterialCommunityIcons name='check' size={12} color='#000000' />
                            </View>
                            <Text style={gstyles.OpenSans_SemiBold(14, '#000000', gstyles.ms(15))}>
                                Self  Transactions
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default PopMenuModal;

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center'
    },

    modalView: {
        width: WIDTH / 1.8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#00000066',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 4,
        top: 115,
        alignSelf: 'flex-end',
        marginRight: 20
    },

    iconBg: {
        width: 20,
        height: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 100,
        elevation: 1,
        ...gstyles.centerXY,
        borderWidth: 0.3,
        borderColor: '#8338EC'
    },

    iconTouch: {
        ...gstyles.inRow,
        backgroundColor: '#FFFFFF',
        marginRight: 20,
        paddingVertical: 5,
        marginLeft: 20
    },

    hrLine: {
        width: '90%',
        height: 0.7,
        backgroundColor: '#8338EC',
        marginVertical: 9,
        alignSelf: 'center'
    }

});