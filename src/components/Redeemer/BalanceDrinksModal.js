import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, FlatList
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg, HEIGHT } from '../../components/common/Constants';
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';
import BalanceDrinks from './BalanceDrinks';
import { connect } from 'react-redux';
import { getData, postData } from '../../services/rootService';
import { getToken } from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
import LoadingModel from "../../components/common/Loading"

const BalanceDrinksModal = (props) => {

    const [freeDrinkss, setfreeDrinkss] = useState([]);
    const [freeDrinksLoading, setfreeDrinksLoading] = useState(false);
    const [totaladdedfreeDrinks, settotaladdedfreeDrinks] = useState(0);

    useEffect(() => {
        console.log("jhgfjk",props.freeDrinks && props.freeDrinks.length > 0);
        if (props.freeDrinks && props.freeDrinks.length > 0) {
            let data = props.freeDrinks;
            for (let i = 0; i < data.length; i++) {
                data[i].count = 0;
            }
            setfreeDrinkss(data);
        }
    }, [props.freeDrinks,props.couponData]);


    const onChangeDrinksCountChange = (type, item, index) => {
        console.log(type, item, index);
        let data = freeDrinkss;
        if (type == 'increase' && totaladdedfreeDrinks < props.couponData.freedrink_balance) {
            data[index].count = data[index].count + 1;
        } else if (type == 'decrease' && totaladdedfreeDrinks > 0) {
            data[index].count = data[index].count - 1;
        }
        setfreeDrinkss(data);
        setfreeDrinksLoading(!freeDrinksLoading);
        let totalcount = 0;
        for (let i = 0; i < data.length; i++) {
            totalcount = totalcount + data[i].count;
        }
        settotaladdedfreeDrinks(totalcount);
    };

    return (
        <>
            <RBSheet
                ref={props.freeDrinksRefRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                onClose={() => {
                    props.setcouponStatus('pending')
                }}
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
                        height: 'auto',
                        maxHeight : HEIGHT * 0.7,
                    }
                }}
            >
            <View>
                <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(25)]}>
                    <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                        Redeem Coupon
                    </Text>
                </View>
                <TouchableOpacity activeOpacity={0.6}
                    style={{ position: 'absolute', right: 25, top: 15 }}
                    onPress={()=>{
                        props.freeDrinksRefRBSheet.current.close()
                        props.setcouponStatus('pending');
                    }}
                >
                    <AntDesign name='close' size={25} color='#0276E5' />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                    <Text style={[gstyles.OpenSans_Regular(16, '#000'), { left: 10, top: 5 }]}>Coupon ID : {props.couponData.id}</Text>
                    <Text style={[gstyles.OpenSans_SemiBold(16, '#3A86FF'), { right: 10, top: 5 }]}>Balance Drinks : {props.couponData.freedrink_balance}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <FlatList
                        data={freeDrinkss}
                        extraData={freeDrinksLoading}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        numColumns={3}
                        renderItem={({ item, index }) => (
                            <BalanceDrinks
                                key={index}
                                data={item}
                                onChange={(type) => { onChangeDrinksCountChange(type, item, index) }}
                                disable={totaladdedfreeDrinks == props.couponData.freedrink_balance}
                            />
                        )}
                        contentContainerStyle={{marginVertical:5}}
                    />
                </View>

                <View style={[gstyles.centerX, { width: WIDTH - 35, bottom:20, marginRight: 5, flexDirection: 'row' }]}>
                    <View style={[styles.settleBtnTouch, { height: 50, marginBottom:20 }]}>
                        <Text style={gstyles.OpenSans_Bold(16, '#0276E5')}>
                            Drinks Added : {totaladdedfreeDrinks}
                        </Text>
                    </View>

                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#8338EC', '#3A86FF']} style={[styles.settleBtnTouch, { height: 50,marginBottom:20, marginLeft: 5,opacity:totaladdedfreeDrinks==0 ? 0.6 : 1}]}
                    >
                        <TouchableOpacity disabled={totaladdedfreeDrinks==0} activeOpacity={0.6} onPress={()=>{props.onClickRedeemFreeDrinks(freeDrinkss,totaladdedfreeDrinks)}}
                            style={[styles.btnTouch, { height: 50 }]}
                        >
                            <Text style={gstyles.OpenSans_Bold(20, '#FFFFFF')}>
                                Redeem
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                </View>

            </RBSheet>
        </>
    )
}
export default BalanceDrinksModal;

const styles = StyleSheet.create({

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
    }
})