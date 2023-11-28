import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,FlatList
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg, HEIGHT } from '../../components/common/Constants';
import RBSheet from "react-native-raw-bottom-sheet";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from 'react-native-vector-icons/AntDesign';
import BalanceDrinks from './BalanceDrinks';
import { connect } from 'react-redux';
import { getData, postData } from '../../services/rootService';
import {getToken} from '../../services/persistData';
import { showToast } from '../../components/common/ShowToast';
import LoadingModel from "../../components/common/Loading"

const BalanceDrinksModal = (props) => {

    const [freeDrinkss, setfreeDrinkss] = useState([]);
    const [freeDrinksLoading, setfreeDrinksLoading] = useState(false);
    const [totaladdedfreeDrinks, settotaladdedfreeDrinks] = useState(0);

    useEffect(() => {
        if(props.freeDrinks && props.freeDrinks.length>0){
            let data=props.freeDrinks;
           for (let i = 0; i < data.length; i++) {
                data[i].count=0;
           }
           setfreeDrinkss(data);
        }
    }, []);
  

    const onChangeDrinksCountChange = (type,item,index) => {
        console.log(type,item,index);
        let data=freeDrinkss;
        if(type=='increase' && totaladdedfreeDrinks<props.couponData.freedrink_balance){
            data[index].count = data[index].count+1;
        }else if(type=='decrease' && totaladdedfreeDrinks>0){
            data[index].count = data[index].count-1;
        }
        setfreeDrinkss(data);
        setfreeDrinksLoading(!freeDrinksLoading);
        let totalcount=0;
        for (let i = 0; i < data.length; i++) {
            totalcount=totalcount+data[i].count;
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
                        height: HEIGHT * 0.9
                    }
                }}
            >
                <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false}>
                    <View style={[gstyles.centerX, gstyles.mt(15), gstyles.mb(25)]}>
                        <Text style={gstyles.OpenSans_SemiBold(20, '#0276E5')}>
                            Redeem Coupon
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6}
                        style={{ position: 'absolute', right: 25, top: 15 }}

                    >
                        <AntDesign name='close' size={25} color='#0276E5' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={[gstyles.OpenSans_Regular(16, '#000'), { left: 10, top: 5 }]}>Coupon ID : {props.couponData.id}</Text>
                        <Text style={[gstyles.OpenSans_SemiBold(16, '#3A86FF'), { right: 10, top: 5 }]}>Balance Drinks : {props.couponData.freedrink_balance}</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginRight: 10 }}> */}
                        {/* {freeDrinkss && freeDrinkss.length>0 ? freeDrinkss.map((item,index) => (
                            <BalanceDrinks
                                key={index}
                                data={item}
                                onChange={(type)=>{onChangeDrinksCountChange(type,item,index)}}
                            />
                        )) : null} */}
                        <FlatList
                            data={freeDrinkss}
                            extraData={freeDrinksLoading}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            renderItem={({item,index})=> (
                                <BalanceDrinks
                                    key={index}
                                    data={item}
                                    onChange={(type)=>{onChangeDrinksCountChange(type,item,index)}}
                                    disable={totaladdedfreeDrinks==props.couponData.freedrink_balance}
                                />
                            )}
                        />
                    {/* </View> */}

                    <View style={[gstyles.inRowJSB, gstyles.centerX, { width: WIDTH - 35, marginTop: 60, marginRight: 5 }]}>
                        <View style={[styles.settleBtnTouch, { height: 50 }]}>
                            
                                <Text style={gstyles.OpenSans_Bold(16, '#0276E5')}>
                                   Drinks Added : {totaladdedfreeDrinks}
                                </Text>
                        </View>

                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#8338EC', '#3A86FF']} style={[styles.settleBtnTouch, { height: 50, marginLeft: 5 }]}
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