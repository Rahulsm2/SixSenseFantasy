import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
    Platform,
    TextInput,
    ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { gstyles } from '../../../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LoadingModel from "../../../components/common/Loading";
import moment from 'moment';

const TransactionComponent = (props) => {
    const platform = Platform.OS == 'ios';
    let filteredSTransactionsLength = props.filteredSTransactions ? props.filteredSTransactions.length : 0;
    console.log(filteredSTransactionsLength, "filteredSTransactionsLength");
    const CouponItem = ({ couponId, entries, verifiedTime, customer }) => {
        return (
            <View style={styles.Entries} >
                <View style={[gstyles.mx(10), gstyles.mt(7), gstyles.mb(15), { flexDirection: 'column' }]}>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <Text style={gstyles.OpenSans_SemiBold(13, '#777')} >
                            {'Ticket ID          '}
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')} selectable={true}>{'  :  '}{couponId}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <Text style={gstyles.OpenSans_SemiBold(13, '#777')}>Guest Name     :</Text>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>{'  '}{(customer)}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <Text style={gstyles.OpenSans_SemiBold(13, '#777')}>No. of Entries   :</Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')}>{'  '}{entries} </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <Text style={gstyles.OpenSans_SemiBold(13, '#777')}>Verified Time   :</Text>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>{'  '}{(verifiedTime)}</Text>
                    </View>

                </View>
            </View>
        );
    }

    const _renderNoTrans = () => {
        return (
            <View style={[gstyles.centerXY, { marginTop: '25%' }]}>
                <Image source={require('../../../assets/images/no_trans.png')}
                    style={[gstyles.iconSize(WIDTH / 1.8), { opacity: 0.7 }]}
                />
                <Text style={[gstyles.OpenSans_SemiBold(20, '#0276E5'), { opacity: 0.7 }]}>
                    No Entries Found
                </Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header, (platform ? { paddingTop: 50 } : null)]}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { props.onClickBack() }}
                        >
                            <MaterialIcons name='arrow-back' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', gstyles.ms(15))}
                            numberOfLines={1}
                        >
                            Transactions
                        </Text>
                    </View>
                </View>

                <View style={styles.searchBoxView}>
                    <View style={gstyles.inRow}>
                        <Ionicons name='ios-search-outline' size={22} color='#3F3F3F' />
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={'#3F3F3F'}
                            style={styles.inputSearchText}
                            value={props.searchQuery}
                            onChangeText={(val) => {
                                console.log('Input Value:', val);
                                props.setSearchQuery(val)
                                props.onSearch(props.searchQuery);
                            }}
                        />

                        <TouchableOpacity onPress={() => props.setSearchQuery('')} style={{ right: 20 }}>
                            <Entypo name='cross' size={25} color='#3F3F3F' />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={filteredSTransactionsLength > 0 ? props.filteredSTransactions : props.transactions}
                    keyExtractor={(item, index) => item.ticket_tracking_id + index}
                    renderItem={({ item, index }) => (
                        <CouponItem
                            data={item}
                            couponId={item.ticket_tracking_id}
                            entries={item.total_people}
                            verifiedTime={moment(item.timestamp).format("DD MMM YY | hh:mm A")}
                            customer={item.customer_name}
                        />
                    )}
                    ListEmptyComponent={_renderNoTrans}
                    onEndReached={() => {
                        console.log("props.saffsList.currentPage", props.saffsList.currentPage, "props.saffsList.totalPages", props.saffsList.totalPages, props.transactions.length)
                        if (props.transactions.length > 14 && props.transactions.length !== props.saffsList.total_records && props.transactions.length < props.saffsList.total_records) {
                            props.getEventDetails();
                        }
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={() => {
                        return props.transactions.length < props.saffsList.total_records ?
                            <ActivityIndicator size='large' color="#0276E5" /> : null;
                    }}
                />
            </View>

            <LoadingModel loading={props.isLoading} />
        </>
    );
}

export default TransactionComponent;

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
        elevation: 3,
    },
    searchBoxView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        height: 50,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 5
    },

    totalRedeemCard: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#0276E51A',
        marginTop: 15,
        marginBottom: 5
    },
    inputSearchText: {
        fontFamily: OpenSans_Medium,
        fontSize: 16,
        color: '#000000',
        marginLeft: 12,
        width: '85%'
    },
    Entries: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#0276E51A',
        marginTop: 5,
        marginBottom: 5
    },

    settleBtnTouch: {
        width: '49.9%',
        height: 42,
        borderRadius: 4,
        ...gstyles.centerXY
    },

    unSettleBtnTouch: {
        backgroundColor: '#FFFFFF',
        borderColor: '#0276E5',
        borderWidth: 1
    },

    btnTouch: {
        width: '100%',
        height: 42,
        ...gstyles.centerXY,
        borderRadius: 4
    },

    transCardView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E51A',
    },

    inputText: {
        fontSize: 16,
        fontFamily: OpenSans_Medium,
        color: '#000000',
        // marginLeft: 5,
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center'
    },

});