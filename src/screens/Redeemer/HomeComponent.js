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
    RefreshControl
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RedeemedDetailsModal from '../../components/common/RedeemedDetailsModal';
import PopMenuModal from '../../components/common/PopMenuModal';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';
import LoadingModel from "../../components/common/Loading"
import moment from 'moment';

const HomeComponent = (props) => {

    const [selectedLanguage, setSelectedLanguage] = useState();

    const _renderRecentTrans = ({item,index}) => {
        return (
            <TouchableOpacity onPress={() => { props.setIsDetailModal({visible:!props.isDetailModal.visible,data:item}) }}
                style={styles.transCardView}>
                <View style={[gstyles.inRowJSB, gstyles.mt(10), gstyles.mx(12)]}>
                    <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Bill No.
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')}>
                            :   {item.bill_no}
                        </Text>
                    </View>
                    <Text style={gstyles.OpenSans_Bold(24, '#000000')}>
                        {'\u20B9'} {Number(item.amount_used).toFixed(0)}
                    </Text>
                </View>
                <View style={[gstyles.inRowJSB, gstyles.mt(6), gstyles.mx(12)]}>
                    <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Coupon ID
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')}>
                            :  #{item.id}
                        </Text>
                    </View>
                    <Text style={gstyles.OpenSans_Regular(10, '#000000')}>
                        {moment(item.created_at).format("DD MMM YY | hh:mm A")}
                    </Text>
                </View>
                <View style={[gstyles.inRowJSB, gstyles.mt(8), gstyles.mx(12), gstyles.mb(10)]}>
                    
                    {item.remarks ? <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Table No.
                        </Text>
                        <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                            numberOfLines={1}
                        >
                            :   {item.remarks.split("$$")[1]}
                        </Text>
                    </View> : <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Name
                        </Text>
                        <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                            numberOfLines={1}
                        >
                            :   {item.distribute_id} | {item.name}
                        </Text>
                    </View>}
                    {/* {item.remarks && <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14), { alignItems: 'flex-start' }]}>
                        <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                            Remarks
                        </Text>
                        <Text style={[gstyles.OpenSans_Regular(16, '#000000')]}>
                            :{'    '}
                        </Text>
                        <Text numberOfLines={3} style={[gstyles.OpenSans_Regular(16, '#000000'), { maxWidth: 195, paddingRight: 10, textAlign: 'left' }]}>
                            {item.remarks.split("$$")[1]}
                        </Text>
                    </View>} */}
                    {props.userData && props.userData.role=="Biller" ? <Text style={gstyles.OpenSans_Regular(10, '#000000', { ...gstyles.size('40%'), textAlign: 'right' })}
                        numberOfLines={1}
                    >
                        Redmeed by {item.first_name}
                    </Text> : null }
                </View>
            </TouchableOpacity>
        );
    }

    const _renderNoTrans = () => {
        return (
            <View style={[gstyles.centerXY, { marginTop:'25%' }]}>
                <Image source={require('../../assets/images/no_trans.png')}
                    style={[gstyles.iconSize(WIDTH / 1.8), { opacity: 0.7 }]}
                />
                <Text style={[gstyles.OpenSans_SemiBold(20, '#0276E5'), { opacity: 0.7 }]}>
                    No Transactions Found
                </Text>
            </View>
        );
    }

    const arrayLength = props.isBtnSelected == 'settled' ? props.sTransactions.length : props.usTransactions.length
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
                        <Image source={require('../../assets/images/login_logo.png')}
                            style={{ width: 34, height: 27 }}
                        />
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', { ...gstyles.ms(10), width: '75%' })}
                            numberOfLines={1}
                        >
                            Welcome, {props.userData ? props.userData.first_name : "User"}
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.onClickSearchIcon() }}
                    >
                        <Ionicons name='ios-search-outline' size={22} color='#3F3F3F' />
                    </TouchableOpacity>
                </View>


                <ScrollView refreshControl={
                    <RefreshControl refreshing={props.isRefreshing} 
                        onRefresh={()=>{
                            props.setisRefreshing(true)
                            props.getTransactions()
                        }} />
                }>
                <View style={styles.totalRedeemCard}>
                    <View style={[gstyles.inRowJSB, gstyles.mx(10), gstyles.mt(15)]}>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>
                            Total Redeemptions
                        </Text>
                        {props.userData && props.userData.role=="Biller" ? <TouchableOpacity
                            onPress={() => { props.setIsPopMenu(true) }}
                            activeOpacity={0.6} style={gstyles.inRow}>
                            <Text style={gstyles.OpenSans_SemiBold(14, '#000000', gstyles.me(5))}>
                                {props.selectedFilter=='all' ? "All" : props.selectedFilter=='self' ? "Self" : "Custom"}
                            </Text>
                            <Ionicons name='caret-down-circle-sharp' size={20} color='#3F3F3F' />
                        </TouchableOpacity>: null }

                        {/* <View style={{ width: 120 }}>
                            <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                <Picker.Item label="All" value="all" />
                                <Picker.Item label="Self" value="self" />
                            </Picker>
                        </View> */}
                    </View>
                    <View style={[gstyles.mt(10), gstyles.mx(10), gstyles.mb(15)]}>
                        <Text style={gstyles.OpenSans_SemiBold(30, '#0276E5')}>
                            {'\u20B9'} {props.totalAmount.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={[gstyles.inRowJSB, gstyles.centerX, { width: WIDTH - 35 }]}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={props.isBtnSelected == 'unSettled' ? ['#8338EC', '#3A86FF'] : ['#FFFFFF', '#FFFFFF']}
                        style={styles.settleBtnTouch}>
                        <TouchableOpacity activeOpacity={0.6}
                            style={props.isBtnSelected == 'unSettled' ? styles.btnTouch : [styles.btnTouch, styles.unSettleBtnTouch]}
                            onPress={() => { props.setIsBtnSelected('unSettled') }}
                        >
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'unSettled' ? '#FFFFFF' : '#0276E5')}>
                                Unsettled ({props.usTransactions.length})
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={props.isBtnSelected == 'settled' ? ['#8338EC', '#3A86FF'] : ['#FFFFFF', '#FFFFFF']}
                        style={styles.settleBtnTouch}
                    >
                        <TouchableOpacity activeOpacity={0.6}
                            style={props.isBtnSelected == 'settled' ? styles.btnTouch : [styles.btnTouch, styles.unSettleBtnTouch]}
                            onPress={() => { props.setIsBtnSelected('settled') }}
                        >
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'settled' ? '#FFFFFF' : '#0276E5')}>
                                Settled ({props.sTransactions.length})
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                {arrayLength>0 && <View style={[gstyles.mt(15), gstyles.inRowJSB, { width: WIDTH - 35 }, gstyles.centerX]}>
                    <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>
                        Recent Transactions
                    </Text>
                    {arrayLength>4 && <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.onClickViewAll(); }}
                    >
                        <Text style={gstyles.OpenSans_Medium(12, '#0276E5')}>
                            View All
                        </Text>
                    </TouchableOpacity> }
                </View> }

                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={props.isBtnSelected == 'settled' ? props.sTransactions.slice(0,4) : props.usTransactions.slice(0,4)}
                        renderItem={_renderRecentTrans}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        ListEmptyComponent={_renderNoTrans}
                    />
                </ScrollView>
                </ScrollView>
            </View>
            {props.isDetailModal.visible &&
                <RedeemedDetailsModal
                    isDetailModal={props.isDetailModal.visible}
                    data={props.isDetailModal.data}
                    setIsDetailModal={props.setIsDetailModal}
                    onClickMoveToSettled={props.onClickMoveToSettled} />}
            {props.isPopMenu &&
                <PopMenuModal
                    isPopMenu={props.isPopMenu}
                    setIsPopMenu={props.setIsPopMenu}
                    setSelectedFilter={props.setSelectedFilter}
                    selectedFilter={props.selectedFilter} />}
                    
            <LoadingModel loading={props.isLoading}/>
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
        elevation: 3
    },

    totalRedeemCard: {
        width: WIDTH - 35,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#0276E51A',
        marginTop: 15,
        marginBottom: 15
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