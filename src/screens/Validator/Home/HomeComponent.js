import React, { useRef, useState } from 'react';
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
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import { gstyles } from '../../../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../../components/common/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingModel from "../../../components/common/Loading"
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const HomeComponent = (props) => {
    const navigation = useNavigation();
    const platform = Platform.OS == 'ios';
    const [modal, setModal] = useState(false);

    const CouponItem = ({ couponId, entries, verifiedTime, customer }) => {
        return (
            <View style={styles.Entries} >
                <View style={[gstyles.mx(10), gstyles.mt(7), gstyles.mb(15), { flexDirection: 'column' }]}>
                    <View style={{ flexDirection: 'row', marginTop: 6 }}>
                        <Text style={gstyles.OpenSans_SemiBold(13, '#777')}>
                            {'Ticket ID          '}
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')}>{'  :  '}{couponId}</Text>
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

    const renderItem = ({ item }) => (
        item.name != undefined ?
            <>
                <TouchableOpacity
                    style={{ margin: 5 }}
                    activeOpacity={0.6}
                    onPress={() => {
                        if (props.selectedEventId != item.id) {
                            props.setSelectedEvent(item.name)
                            props.setSelectedEventId(item.id)
                            props.getEventDetails(item.id)
                        }
                        setModal(false);
                    }}
                >
                    <Text style={[gstyles.OpenSans_SemiBold(14, props.selectedEvent === item.name ? '#0276E5' : '#000', gstyles.ms(15)), { opacity: props.selectedEventId == item.id ? 0.5 : 1, margin: 7 }]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>

            </> : null
    );

    const arrayLength = props.transactions.length

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />

            <View style={[gstyles.container(app_Bg)]}>
                <View style={[styles.header, (platform ? { paddingTop: HEIGHT * 0.04 } : null)]}>
                    <View style={[gstyles.inRow, { alignItems: 'center' }]}>
                        <Image source={require('../../../assets/images/login_logo.png')}
                            style={{ width: 34, height: 27 }}
                        />
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', { ...gstyles.ms(10), width: '75%' })}
                            numberOfLines={1}
                        >
                            Welcome, {props.nodeUserData ? props.nodeUserData.partner.name : "User"}
                        </Text>
                        <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { navigation.navigate('TransactionContainer') }} style={{ left: WIDTH * 0.1 }}
                        >
                            <Ionicons name='ios-search-outline' size={22} color='#3F3F3F' />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView refreshControl={
                    <RefreshControl refreshing={props.isRefreshing}
                        onRefresh={() => {
                            props.setisRefreshing(true)
                            props.getTransactions()
                            // props.getEventDetails(props.selectedEventId)
                        }}
                    />
                }>
                    <TouchableOpacity style={styles.inputContainer} onPress={() => setModal(true)}>
                        <View style={[styles.pickerContainer, { flexDirection: 'row' }]}>
                            <Text style={[gstyles.OpenSans_Bold(16, '#000000'), { left: 15, maxWidth: WIDTH * 0.78 }]}>{props.selectedEvent}</Text>
                            {modal ? <AntDesign name='caretup' size={15} color='black' style={{ right: 15 }} />
                                : <AntDesign name='caretdown' size={15} color='black' style={{ right: 15 }} />}
                        </View>
                    </TouchableOpacity>
                    <View style={styles.totalRedeemCard}>
                        <View style={[gstyles.inRowJSB, gstyles.mx(10), gstyles.mt(15)]}>

                            <Text style={gstyles.OpenSans_Bold(15, '#000000')}>
                                Total Entries
                            </Text>

                        </View>
                        <View style={[gstyles.mt(10), gstyles.mx(10), gstyles.mb(15)]}>
                            <Text style={gstyles.OpenSans_SemiBold(30, '#0276E5')}>
                                {props.saffsList.total_people_by_event}
                            </Text>
                        </View>
                    </View>

                    {arrayLength > 0 && <View style={[gstyles.mt(15), gstyles.mb(10), gstyles.inRowJSB, { width: WIDTH - 35 }, gstyles.centerX]}>
                        <Text style={gstyles.OpenSans_Bold(15, '#000000')}>
                            Latest Entries
                        </Text>
                        {arrayLength > 4 && <TouchableOpacity activeOpacity={0.6}
                            onPress={() => { navigation.navigate('TransactionContainer') }}
                        >
                            <Text style={gstyles.OpenSans_Bold(13, '#0276E5')}>
                                View All
                            </Text>
                        </TouchableOpacity>}
                    </View>}

                    <FlatList
                        data={props.transactions.slice(0, 4)}
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
                    />
                </ScrollView>
                {modal && <Modal
                    transparent
                    visible={true}
                    animationType="fade"
                    onRequestClose={() => { setModal(false) }}
                    onBackdropPress={() => { setModal(false) }}>
                    <StatusBar
                        backgroundColor={'rgba(0,0,0,0.5)'}
                        barStyle="light-content"
                        animated
                    />

                    <TouchableWithoutFeedback
                        onPress={() => { setModal(false) }}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <FlatList
                                    data={props.selectedFilter}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderItem}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>}
            </View>
            <LoadingModel loading={props.isLoading} />
        </>
    );
}

export default HomeComponent;

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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: WIDTH * 0.90,
        backgroundColor: '#FFFFFF',
        shadowColor: '#00000066',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 4,
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
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    pickerContainer: {
        borderBottomColor: "#3A86FF",
        borderRadius: 5,
        borderBottomWidth: 1,
        width: WIDTH * 0.91,
        height: HEIGHT * 0.06,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F6FF'
    },

    placeholderStyle: {
        ...gstyles.OpenSans_Bold(20, '#000')
    },

    selectedTextStyle: {
        ...gstyles.OpenSans_Bold(16, '#000')
    },

    dropdown: {
        height: 'auto',
        width: WIDTH * 0.88,
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