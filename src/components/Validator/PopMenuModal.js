import React from 'react';
import { View, Text, Modal, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { WIDTH } from '../common/Constants';
import { gstyles } from '../common/GlobalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PopMenuModal = (props) => {

    const renderItem = ({ item }) => (
        item.name != undefined ?
            <>
                <TouchableOpacity
                    style={[styles.iconTouch, gstyles.mt(5)]}
                    activeOpacity={0.6}
                    onPress={() => {
                        props.setSelectedEvent(item.name)
                        props.setSelectedEventId(item.id)
                        props.getEventDetails(item.id)
                        props.setIsPopMenu(false);
                    }}
                    disabled={props.selectedEventId == item.id}

                >
                    <View style={[styles.iconBg, { backgroundColor: props.selectedEvent === item.name ? '#0276E5' : '#fff' }]}>
                        <MaterialCommunityIcons name={props.selectedEvent === item.name ? 'check-all' : 'check'} size={12} color={props.selectedFilter === item.id ? '#fff' : '#000'} />
                    </View>
                    <Text style={[gstyles.OpenSans_SemiBold(14, props.selectedEvent === item.name ? '#0276E5' : '#000', gstyles.ms(15)), { opacity: props.selectedEventId == item.id ? 0.5 : 1 }]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                <View style={styles.hrLine} />
            </> : null
    );

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
                        <View style={styles.hrLine} />
                        <FlatList
                            data={props.selectedFilter}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
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
        backgroundColor: '#0276E5',
        marginVertical: 9,
        alignSelf: 'center'
    }
});
