import React, { useRef } from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    TextInput,RefreshControl
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RedeemedDetailsModal from '../common/RedeemedDetailsModal';
import RBSheet from "react-native-raw-bottom-sheet";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import LoadingModel from "../../components/common/Loading"

const TransactionComponent = (props) => {

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
                    <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Name
                        </Text>
                        <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                            numberOfLines={1}
                        >
                            :   {item.distribute_id} | shankar Salimath
                        </Text>
                    </View>
                    {props.userData && props.userData.role=="Biller" ? <Text style={gstyles.OpenSans_Regular(10, '#000000', { ...gstyles.size('40%'), textAlign: 'right' })}
                        numberOfLines={1}
                    >
                        Redmeed by Ganesh
                    </Text> : null }
                </View>
            </TouchableOpacity>
        );
    }

    const _renderNoTrans = () => {
        return (
            <View style={[gstyles.centerXY, { marginTop:'40%' }]}>
                <Image source={require('../../assets/images/no_trans.png')}
                    style={[gstyles.iconSize(WIDTH / 1.8), { opacity: 0.7 }]}
                />
                <Text style={[gstyles.OpenSans_SemiBold(20, '#0276E5'), { opacity: 0.7 }]}>
                    No Transactions Found
                </Text>
            </View>
        );
    }


    const refRBSheet = useRef();

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
                            onChangeText={(val)=>props.onSearch(val)}
                        />
                    </View>
                    {props.userData && props.userData.role=="Biller" ? <TouchableOpacity activeOpacity={0.6}
                        onPress={() => refRBSheet.current.open()}
                    >
                        <FontAwesome name='filter' size={22} color='#3F3F3F' />
                    </TouchableOpacity> : null }
                </View>

                <View style={[gstyles.inRowJSB, gstyles.centerX, { width: WIDTH - 35 }, gstyles.mb(8)]}>
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={props.isBtnSelected == 'unSettled' ? ['#8338EC', '#3A86FF'] : ['#FFFFFF', '#FFFFFF']}
                        style={styles.settleBtnTouch}>
                        <TouchableOpacity activeOpacity={0.6}
                            style={props.isBtnSelected == 'unSettled' ? styles.btnTouch : [styles.btnTouch, styles.unSettleBtnTouch]}
                            onPress={() => { props.setIsBtnSelected('unSettled') }}
                        >
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'unSettled' ? '#FFFFFF' : '#8338EC')}>
                                Unsettled ({props.filteredUSTransactions  && props.filteredUSTransactions.length>0  ? props.filteredUSTransactions.length : props.usTransactions.length})
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
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'settled' ? '#FFFFFF' : '#8338EC')}>
                                Settled ({props.filteredSTransactions  && props.filteredSTransactions.length>0 ? props.filteredSTransactions.length : props.sTransactions.length})
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={props.isBtnSelected == 'settled' ? props.filteredSTransactions && props.filteredSTransactions.length>0 ? props.filteredSTransactions : props.sTransactions : props.filteredUSTransactions && props.filteredUSTransactions.length>0 ? props.filteredUSTransactions : props.usTransactions}
                        renderItem={_renderRecentTrans}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        ListEmptyComponent={_renderNoTrans}
                        refreshControl={
                            <RefreshControl refreshing={props.isRefreshing} 
                                onRefresh={()=>{
                                    props.setisRefreshing(true)
                                    props.getTransactions()
                                }} />
                        }
                    />
                </ScrollView>

                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    animationType={'slide'}
                    openDuration={250}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        },
                        draggableIcon: {
                            backgroundColor: "rgba(0,0,0,0.5)",
                            width: 50,
                            borderRadius: 4

                        },
                        container: {
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            height: WIDTH / 1.6
                        }
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(50)]}>
                            <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                                Filter Transactions
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.6}
                            style={{ position: 'absolute', right: 25, top: 15 }}
                            onPress={() => refRBSheet.current.close()}
                        >
                            <AntDesign name='close' size={25} color='#0276E5' />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.6}
                            style={[gstyles.inRow, gstyles.ms(20)]}>
                            <MaterialCommunityIcons name='checkbox-marked-outline' size={25} color='#8338EC' />
                            <Text style={gstyles.OpenSans_SemiBold(16, '#8338EC', gstyles.ms(15))}>
                                High to Low
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6}
                            style={[gstyles.inRow, gstyles.ms(20), gstyles.mt(20)]}>
                            <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color='#000000' />
                            <Text style={gstyles.OpenSans_Medium(16, '#000', gstyles.ms(15))}>
                                Low to High
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </RBSheet>

                {props.isDetailModal.visible &&
                <RedeemedDetailsModal
                    isDetailModal={props.isDetailModal.visible}
                    data={props.isDetailModal.data}
                    setIsDetailModal={props.setIsDetailModal}
                    onClickMoveToSettled={props.onClickMoveToSettled} />}
            <LoadingModel loading={props.isLoading}/>
            </View>
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
        elevation: 3
    },

    searchBoxView: {
        width: WIDTH - 35,
        alignSelf: 'center',
        height: 50,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#8338EC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 15
    },

    inputSearchText: {
        fontFamily: OpenSans_Medium,
        fontSize: 16,
        color: '#000000',
        marginLeft: 12,
        width: '85%'
    },

    settleBtnTouch: {
        width: '49.9%',
        height: 42,
        // backgroundColor: '#8338EC',
        borderRadius: 4,
        ...gstyles.centerXY
    },

    unSettleBtnTouch: {
        backgroundColor: '#FFFFFF',
        borderColor: '#8338EC',
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
        // height: 104,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E51A',
    }

});