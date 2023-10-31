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
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
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
import PopMenuModal from '../common/PopMenuModal';

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
                {item.remarks ? <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Table No.
                        </Text>
                        <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                            numberOfLines={1}
                        >
                            :   {item.remarks.split("$$")[0]}
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

    const _renderFilterData = ({item,index}) => {
        return (
            <View>
            {index == 0 ?
                <TouchableOpacity onPress={()=>props.onChangeFilterData(-1)} activeOpacity={0.6}
                style={[gstyles.inRow, gstyles.ms(20),gstyles.mb(10)]}>
                <MaterialCommunityIcons name={props.selectedFilter=='all' ? 'checkbox-marked' : 'checkbox-blank-outline'} size={25} color={props.selectedFilter=='all' ? '#0276E5' : "#00000095"} />
                <Text style={gstyles.OpenSans_Bold(16, props.selectedFilter=='all' ? '#000000' : "#00000095", gstyles.ms(15))}>
                 {props.selectedFilter=='all' ? 'Unselect All' : 'Select All'}
                </Text>
            </TouchableOpacity> : null }

            {/* {index == 0 && props.userData && props.userData.role=="Biller" ?
                <TouchableOpacity activeOpacity={0.6}
                style={[gstyles.inRow, gstyles.ms(20),gstyles.mb(10)]}>
                <MaterialCommunityIcons name={props.selectedFilter=='self' || props.selectedFilter=='all' ? 'checkbox-outline' : 'checkbox-blank-outline'} size={25} color={props.selectedFilter=='self'|| props.selectedFilter=='all' ? '#8338EC' : "#000000"} />
                <Text style={gstyles.OpenSans_SemiBold(16, props.selectedFilter=='self'|| props.selectedFilter=='all' ? '#8338EC' : "#000000", gstyles.ms(15))}>
                 SELF ({props.userData.first_name} {props.userData.last_name})
                </Text>
            </TouchableOpacity> : null } */}
                
            <TouchableOpacity onPress={()=>props.onChangeFilterData(index)} activeOpacity={0.6}
                style={[gstyles.inRow, gstyles.ms(20),gstyles.mb(10)]}>
                <MaterialCommunityIcons name={item.selected ? 'checkbox-outline' : 'checkbox-blank-outline'} size={25} color={item.selected ? '#0276E5' : '#00000090'} />
                <Text style={[item.selected ? gstyles.OpenSans_SemiBold(16, item.selected ? '#000000' : '#00000090', gstyles.ms(15)): gstyles.OpenSans_Medium(16, item.selected ? '#000000' : '#00000090', gstyles.ms(15)),{textTransform: 'capitalize'}]}>
                    {index == 0 ? "SELF - " : null}{item.first_name} {item.last_name}
                </Text>
            </TouchableOpacity>
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

                <ScrollView showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl refreshing={props.isRefreshing} 
                            onRefresh={()=>{
                                props.setisRefreshing(true)
                                props.getTransactions()
                            }} />
                    }>

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
                    {props.userData && props.userData.role=="Biller" ? 
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() =>  props.getStaffs()}
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
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'unSettled' ? '#FFFFFF' : '#0276E5')}>
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
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'settled' ? '#FFFFFF' : '#0276E5')}>
                                Settled ({props.filteredSTransactions  && props.filteredSTransactions.length>0 ? props.filteredSTransactions.length : props.sTransactions.length})
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <FlatList
                    data={props.isBtnSelected == 'settled' ? props.filteredSTransactions && props.filteredSTransactions.length>0 ? props.filteredSTransactions : props.sTransactions : props.filteredUSTransactions && props.filteredUSTransactions.length>0 ? props.filteredUSTransactions : props.usTransactions}
                    renderItem={_renderRecentTrans}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    ListEmptyComponent={_renderNoTrans}
                />
                </ScrollView>

                <RBSheet
                    ref={props.refRBSheet}
                    closeOnDragDown={false}
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
                            height:'auto'
                        }
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(20)]}>
                            <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                                Filter Transactions
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.6}
                            style={{ position: 'absolute', right: 25, top: 15 }}
                            onPress={() => props.refRBSheet.current.close()}
                        >
                            <AntDesign name='close' size={25} color='#0276E5' />
                        </TouchableOpacity>

                        {/* props.saffsList */}

                        <FlatList
                            data={props.saffsList}
                            extraData={props.onChangeStaffList}
                            renderItem={_renderFilterData}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={true}
                        />

                        {/* <TouchableOpacity activeOpacity={0.6}
                            style={[gstyles.inRow, gstyles.ms(20), gstyles.mt(20)]}>
                            <MaterialCommunityIcons name='checkbox-blank-outline' size={25} color='#000000' />
                            <Text style={gstyles.OpenSans_Medium(16, '#000', gstyles.ms(15))}>
                                Low to High
                            </Text>
                        </TouchableOpacity> */}
                    </ScrollView>
                </RBSheet>

                {props.isDetailModal.visible &&
                <RedeemedDetailsModal
                    isDetailModal={props.isDetailModal.visible}
                    data={props.isDetailModal.data}
                    setIsDetailModal={props.setIsDetailModal}
                    onClickMoveToSettled={props.onClickMoveToSettled} />}
            <LoadingModel loading={props.isLoading}/>

            {props.isPopMenu &&
                <PopMenuModal
                    isPopMenu={props.isPopMenu}
                    setIsPopMenu={props.setIsPopMenu}
                    setSelectedFilter={props.setSelectedFilter}
                    selectedFilter={props.selectedFilter} />}
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
        borderColor: '#0276E5',
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
        // height: 104,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0276E51A',
    }

});