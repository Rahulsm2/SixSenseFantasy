import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { gstyles } from '../common/GlobalStyles';
import { OpenSans_Medium, WIDTH, app_Bg, HEIGHT } from '../common/Constants';

const BalanceDrinks = ({ data, onChange , disable}) => {
    return (
        data.count>0  ? (
        <View style={{ flexDirection: 'column',marginLeft:20, marginTop:15, marginRight:35, marginBottom:15 }}>
            <Text style={[gstyles.OpenSans_SemiBold(19, '#000'), { top: 5, textAlign: 'center', marginLeft:5 }, gstyles.size(72)]}>{data.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity onPress={()=>onChange("decrease")}>
                    <AntDesign name="minuscircle" size={20} color="red" />
                </TouchableOpacity>
                <Text style={[ gstyles.OpenSans_SemiBold(25, '#3A86FF'), {paddingHorizontal: 15} ]}>{data.count}</Text>
                <TouchableOpacity onPress={()=>onChange("increase")}>
                    <AntDesign name="pluscircle" size={20} color="green" />
                </TouchableOpacity>
            </View>
        </View> ) : 
        (<TouchableOpacity onPress={()=>onChange("increase")} style={{ flexDirection: 'column', marginLeft:20, marginTop:15, marginRight:35, marginBottom:15, 
        }}>
            <Text style={[gstyles.OpenSans_SemiBold(19, 'lightgrey'), { top: 5, textAlign: 'center', marginLeft:5 }]}>{data.name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            </View>
        </TouchableOpacity>)
    );
};

export default BalanceDrinks;
