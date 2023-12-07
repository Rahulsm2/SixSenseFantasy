import React from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { WIDTH } from '../common/Constants';
import { gstyles } from '../common/GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const eventModal = (props) => {

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
                            onPress={() => { 
                                props.setSelectedFilter('all')
                                props.setIsPopMenu(false) }}
                        >
                            <View style={[styles.iconBg, { backgroundColor: props.selectedFilter=='all' ? '#0276E5' : '#fff' }]}>
                                <MaterialCommunityIcons name={props.selectedFilter=='all' ? 'check-all': 'check'} size={12} color={props.selectedFilter=='all' ? '#fff' : '#000'} />
                            </View>
                            <Text style={gstyles.OpenSans_SemiBold(14, props.selectedFilter=='all' ? '#0276E5' : '#000', gstyles.ms(15))}>
                                All  Transactions
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.hrLine} />
                        <TouchableOpacity style={[styles.iconTouch, gstyles.mb(10)]}
                            activeOpacity={0.6}
                            onPress={() => { 
                                props.setSelectedFilter('self')
                                props.setIsPopMenu(false) }}
                        >
                        <View style={[styles.iconBg, { backgroundColor: props.selectedFilter=='self' ? '#0276E5C' : '#fff' }]}>
                                <MaterialCommunityIcons name={props.selectedFilter=='self' ? 'check-all': 'check'} size={12} color={props.selectedFilter=='self' ? '#fff' : '#000'} />
                            </View>
                            <Text style={gstyles.OpenSans_SemiBold(14, props.selectedFilter=='self' ? '#0276E5' : '#000', gstyles.ms(15))}>
                                Self  Transactions
                            </Text>
                        </TouchableOpacity>
                        {/* <View style={styles.hrLine} />
                        <TouchableOpacity style={[styles.iconTouch, gstyles.mb(10)]}
                            activeOpacity={0.6}
                            onPress={() => { 
                                props.setSelectedFilter('custom')
                                props.setIsPopMenu(false) 
                            }}
                        >
                        <View style={[styles.iconBg, { backgroundColor: props.selectedFilter=='custom' ? '#8338EC' : '#fff' }]}>
                                <MaterialCommunityIcons name={props.selectedFilter=='custom' ? 'check-all': 'check'} size={12} color={props.selectedFilter=='custom' ? '#fff' : '#000'} />
                            </View>
                            <Text style={gstyles.OpenSans_SemiBold(14, props.selectedFilter=='custom' ? '#8338EC' : '#000', gstyles.ms(15))}>
                                Custom
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default eventModal;

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
        backgroundColor: '#0276E5',
        marginVertical: 9,
        alignSelf: 'center'
    }

});