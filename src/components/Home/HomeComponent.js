import React, { useRef, useState } from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RedeemedDetailsModal from '../common/RedeemedDetailsModal';
import CouponVerificationModal from '../common/CouponVerificationModal';
import PopMenuModal from '../common/PopMenuModal';
import RBSheet from "react-native-raw-bottom-sheet";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';


const HomeComponent = (props) => {

    const [selectedLanguage, setSelectedLanguage] = useState();

    const _renderRecentTrans = () => {
        return (
            <TouchableOpacity onPress={() => { props.setIsDetailModal(!props.isDetailModal) }}
                style={styles.transCardView}>
                <View style={[gstyles.inRowJSB, gstyles.mt(10), gstyles.mx(12)]}>
                    <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Bill No.
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(14, '#000000')}>
                            : 123
                        </Text>
                    </View>
                    <Text style={gstyles.OpenSans_Bold(24, '#000000')}>
                        {'\u20B9'} 250
                    </Text>
                </View>
                <View style={[gstyles.inRowJSB, gstyles.mt(6), gstyles.mx(12)]}>
                    <View style={gstyles.inRow}>
                        <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                            Coupon ID
                        </Text>
                        <Text style={gstyles.OpenSans_Bold(12, '#000000')}>
                            : 123456
                        </Text>
                    </View>
                    <Text style={gstyles.OpenSans_Regular(10, '#000000')}>
                        10 APR 23 | 06:50 PM
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
                            : shankar Salimath
                        </Text>
                    </View>
                    <Text style={gstyles.OpenSans_Regular(10, '#000000', { ...gstyles.size('40%'), textAlign: 'right' })}
                        numberOfLines={1}
                    >
                        Redmeed by Ganesh
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    const _renderNoTrans = () => {
        return (
            <View style={[gstyles.centerXY, { height: HEIGHT - 180 }]}>
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
                        <Image source={require('../../assets/images/login_logo.png')}
                            style={{ width: 34, height: 27 }}
                        />
                        <Text style={gstyles.OpenSans_SemiBold(18, '#000000', { ...gstyles.ms(10), width: '75%' })}
                            numberOfLines={1}
                        >
                            Welcome, Sai Kiran
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.onClickSearchIcon() }}
                    >
                        <Ionicons name='ios-search-outline' size={22} color='#3F3F3F' />
                    </TouchableOpacity>
                </View>



                <View style={styles.totalRedeemCard}>
                    <View style={[gstyles.inRowJSB, gstyles.mx(10), gstyles.mt(15)]}>
                        <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>
                            Total Redeemptions
                        </Text>
                        <TouchableOpacity
                            onPress={() => { props.setIsPopMenu(true) }}
                            activeOpacity={0.6} style={gstyles.inRow}>
                            <Text style={gstyles.OpenSans_SemiBold(14, '#000000', gstyles.me(5))}>
                                All
                            </Text>
                            <Ionicons name='caret-down-circle-sharp' size={20} color='#3F3F3F' />
                        </TouchableOpacity>

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
                            {'\u20B9'} 5,500
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
                            <Text style={gstyles.OpenSans_Medium(16, props.isBtnSelected == 'unSettled' ? '#FFFFFF' : '#8338EC')}>
                                Unsettled (5)
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
                                Settled (8)
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <View style={[gstyles.mt(15), gstyles.inRowJSB, { width: WIDTH - 35 }, gstyles.centerX]}>
                    <Text style={gstyles.OpenSans_SemiBold(14, '#000000')}>
                        Recent Transactions
                    </Text>
                    <TouchableOpacity activeOpacity={0.6}
                        onPress={() => { props.onClickViewAll(); }}
                    >
                        <Text style={gstyles.OpenSans_Medium(12, '#0276E5')}>
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList
                        data={props.transData}
                        renderItem={_renderRecentTrans}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
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
                            height: WIDTH * 1.25
                        }
                    }}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(25)]}>
                            <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                                Redeem Coupon
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.6}
                            style={{ position: 'absolute', right: 25, top: 15 }}
                            onPress={() => refRBSheet.current.close()}
                        >
                            <AntDesign name='close' size={25} color='#0276E5' />
                        </TouchableOpacity>
                        <View style={[gstyles.inRowJSB, gstyles.px(16)]}>
                            <View style={[gstyles.inRow, gstyles.mt(20)]}>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    Coupon ID
                                </Text>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    :{'    '}<Text style={gstyles.OpenSans_Regular(16, '#000000')}>0133456</Text>
                                </Text>
                            </View>
                            <View style={[gstyles.inRow, gstyles.mt(20)]}>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    Balance
                                </Text>
                                <Text style={gstyles.OpenSans_Regular(16, '#000000')}>
                                    :{'    '}<Text style={gstyles.OpenSans_Bold(16, '#0276E5')}>{'\u20B9'} 2200</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={[gstyles.mt(25)]}>
                            <TextInput
                                mode="outlined"
                                label="Redeem Amount"
                                placeholder="Enter Redeem Amount"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                keyboardType='number-pad'
                                maxLength={10}
                                left={
                                    <TextInput.Icon
                                        icon={'currency-inr'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                            />
                        </View>
                        <View style={{ width: WIDTH - 35, alignSelf: 'center' }}>
                            <Text style={gstyles.OpenSans_Regular(14, '#FF0000', gstyles.mt(5))}>
                                *Bill exceeds Coupon amount, Collect Rs. 500 in cash
                            </Text>
                        </View>
                        <View style={[gstyles.mt(20)]}>
                            <TextInput
                                mode="outlined"
                                label="Bill Number"
                                placeholder="Enter Bill Number"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                keyboardType='number-pad'
                                maxLength={10}
                                left={
                                    <TextInput.Icon
                                        icon={'ticket-confirmation-outline'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                            />
                        </View>
                        <View style={[gstyles.mt(24)]}>
                            <TextInput
                                mode="outlined"
                                label="Remarks"
                                placeholder="Enter Remarks"
                                style={styles.inputText}
                                outlineColor='#8338EC'
                                left={
                                    <TextInput.Icon
                                        icon={'note-text'}
                                        iconColor="#3F3F3F"
                                        size={22}
                                    />
                                }
                            />
                        </View>

                        <View style={[gstyles.inRowJSB, gstyles.centerX, { width: WIDTH - 35, marginTop: 24, marginBottom: 25 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#FFFFFF', '#FFFFFF']} style={[styles.settleBtnTouch, { height: 50 }]}>
                                <TouchableOpacity activeOpacity={0.6}
                                    style={[styles.btnTouch, styles.unSettleBtnTouch, { height: 50 }]}
                                    onPress={() => refRBSheet.current.open()}
                                >
                                    <Text style={gstyles.OpenSans_Bold(20, '#8338EC')}>
                                        Scan Bill
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#8338EC', '#3A86FF']} style={[styles.settleBtnTouch, { height: 50 }]}
                            >
                                <TouchableOpacity activeOpacity={0.6}
                                    style={[styles.btnTouch, { height: 50 }]}
                                >
                                    <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                        Redeem
                                    </Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </ScrollView>
                </RBSheet>
                {/* 
                for:- No Transaction Found Use Below FlatList
                <FlatList
                    data={[{ id: 1 }]}
                    renderItem={_renderNoTrans}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                /> */}

            </View>
            {props.isDetailModal &&
                <RedeemedDetailsModal
                    isDetailModal={props.isDetailModal}
                    setIsDetailModal={props.setIsDetailModal} />}
            {props.isPopMenu &&
                <PopMenuModal
                    isPopMenu={props.isPopMenu}
                    setIsPopMenu={props.setIsPopMenu} />}
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