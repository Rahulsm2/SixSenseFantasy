import React, { useRef, useState } from 'react';
import {
    View,Text,
    TouchableOpacity,StyleSheet
} from 'react-native';
import { gstyles } from '../../components/common/GlobalStyles';
import { HEIGHT, OpenSans_Medium, WIDTH, app_Bg } from '../../components/common/Constants';
import moment from 'moment';

const TransactionCard = (props) => {
    return (
        <TouchableOpacity onPress={() => { props.setIsDetailModal({visible:!props.isDetailModal.visible,data:props.data}) }}
            style={styles.transCardView}>
            <View style={[gstyles.inRowJSB, gstyles.mt(10), gstyles.mx(12)]}>
                <View style={gstyles.inRow}>
                    <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                        Bill No.
                    </Text>
                    <Text style={gstyles.OpenSans_Bold(14, '#000000')}>
                        :   {props.data.bill_no}
                    </Text>
                </View>
                <Text style={gstyles.OpenSans_Bold(24, '#000000')}>
                    {'\u20B9'} {Number(props.data.amount_used).toFixed(0)}
                </Text>
            </View>
            <View style={[gstyles.inRowJSB, gstyles.mt(6), gstyles.mx(12)]}>
                <View style={gstyles.inRow}>
                    <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                        Coupon ID
                    </Text>
                    <Text style={gstyles.OpenSans_Bold(14, '#000000')}>
                        :  #{props.data.id}
                    </Text>
                </View>
                <Text style={gstyles.OpenSans_Regular(10, '#000000')}>
                    {moment(props.data.created_at).format("DD MMM YY | hh:mm A")}
                </Text>
            </View>
            <View style={[gstyles.inRowJSB, gstyles.mt(8), gstyles.mx(12), gstyles.mb(10)]}>
                
                {props.data.remarks ? <View style={gstyles.inRow}>
                    <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                        Table No.
                    </Text>
                    <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                        numberOfLines={1}
                    >
                        :   {props.data.remarks.split("$$")[1]}
                    </Text>
                </View> : <View style={gstyles.inRow}>
                    <Text style={gstyles.OpenSans_Regular(12, '#000000', gstyles.size(75))}>
                        Name
                    </Text>
                    <Text style={gstyles.OpenSans_SemiBold(12, '#000000', gstyles.size(120))}
                        numberOfLines={1}
                    >
                        :   {props.data.distribute_id} | {props.data.name}
                    </Text>
                </View>}
                {/* {props.data.remarks && <View style={[gstyles.inRow, gstyles.ms(40), gstyles.mt(14), { alignItems: 'flex-start' }]}>
                    <Text style={gstyles.OpenSans_Regular(16, '#000000', gstyles.size('35%'))}>
                        Remarks
                    </Text>
                    <Text style={[gstyles.OpenSans_Regular(16, '#000000')]}>
                        :{'    '}
                    </Text>
                    <Text numberOfLines={3} style={[gstyles.OpenSans_Regular(16, '#000000'), { maxWidth: 195, paddingRight: 10, textAlign: 'left' }]}>
                        {props.data.remarks.split("$$")[1]}
                    </Text>
                </View>} */}
                {props.userData && props.userData.role=="Biller" ? <Text style={gstyles.OpenSans_Regular(10, '#000000', { ...gstyles.size('40%'), textAlign: 'right' })}
                    numberOfLines={1}
                >
                    Redmeed by {props.data.first_name}
                </Text> : null }
            </View>
        </TouchableOpacity>
    );
}

export default TransactionCard;

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