import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeContainer from '../container/Home/HomeContainer';
import ProfileContainer from '../container/Profile/ProfileContainer';
import { gstyles } from '../components/common/GlobalStyles';
import ValCouponContainer from '../container/Home/ValCouponContainer';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  return (
    <Tab.Navigator
      tabBar={props => <TabBarComponent {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeContainer">
      <Tab.Screen
        name="HomeContainer"
        component={HomeContainer}
      />
      <Tab.Screen
        name="ProfileContainer"
        component={ProfileContainer}
      />
      <Tab.Screen
        name="ValCouponContainer"
        component={ValCouponContainer}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;

const TabBarComponent = ({ state, descriptors, navigation }) => {

  let currentRouteName = state.routes[state.index].name;

  return (
    <View style={[tabStyles.container]}>
      <TouchableOpacity activeOpacity={0.6}
        style={[tabStyles.tabContainer]}
        onPress={() => {
          navigation.navigate('HomeContainer');
        }}>
        <Image source={require('../assets/images/text-search.png')}
          style={currentRouteName == 'HomeContainer' ? [gstyles.iconSize(28), { tintColor: '#0276E5' }] :
            [gstyles.iconSize(28), { tintColor: '#3F3F3F' }]
          }
        />
        <Text style={currentRouteName == 'HomeContainer' ? [gstyles.OpenSans_Bold(12, '#0276E5', gstyles.mt(7))] :
          [gstyles.OpenSans_Medium(12, '#3F3F3F', gstyles.mt(7))]
        }>
          Transactions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1}
        style={[tabStyles.tabContainer]}
        onPress={() => {
          navigation.navigate('ValCouponContainer');
        }}>

        <View style={tabStyles.scanImgView}>
          <Image source={require('../assets/images/qrcode-scan.png')}
            style={currentRouteName == 'ValCouponContainer' ? [gstyles.iconSize(28), { tintColor: '#0276E5' }] :
              [gstyles.iconSize(28), { tintColor: '#3F3F3F' }]
            }
          />
        </View>

        <View
          style={[gstyles.iconSize(27)]}
        />
        <Text style={currentRouteName == 'ValCouponContainer' ? [gstyles.OpenSans_Bold(12, '#0276E5', gstyles.mt(7))] :
          [gstyles.OpenSans_Medium(12, '#3F3F3F', gstyles.mt(7))]
        }>
          Validate Coupon
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}
        style={[tabStyles.tabContainer]}
        onPress={() => {
          navigation.navigate('ProfileContainer');
        }}>
        <Image source={require('../assets/images/account.png')}
          style={currentRouteName == 'ProfileContainer' ? [gstyles.iconSize(28), { tintColor: '#0276E5' }] :
            [gstyles.iconSize(28), { tintColor: '#3F3F3F' }]
          }
        />
        <Text style={currentRouteName == 'ProfileContainer' ? [gstyles.OpenSans_Bold(12, '#0276E5', gstyles.mt(7))] :
          [gstyles.OpenSans_Medium(12, '#3F3F3F', gstyles.mt(7))]
        }>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const tabStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    elevation: 15,
    borderTopColor: '#0276E526',
    borderTopWidth: 1.5
  },

  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 8.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },

  scanImgView: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    ...gstyles.centerXY,
    elevation: 7,
    position: 'absolute',
    bottom: 35
  }

});