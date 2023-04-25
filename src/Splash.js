import React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { gstyles } from './components/common/GlobalStyles';
import { app_Bg } from './components/common/Constants';

const Splash = () => {

    return (
        <>
            <StatusBar
                backgroundColor={app_Bg}
                animated={true}
                barStyle="dark-content"
            />
            <View style={[gstyles.container(app_Bg), gstyles.centerXY]}>
                <Image source={require('./assets/images/splash_logo.png')}
                    style={gstyles.iconSize(188, 201)}
                />
                <View style={styles.bottomView}>
                    <Text style={gstyles.OpenSans_Medium(16, '#000000', gstyles.me(5))}>
                        Powered by
                    </Text>
                    <Image source={require('./assets/images/text_logo.jpg')}
                        style={[gstyles.iconSize(80, 18), gstyles.mt(5)]}
                    />
                </View>
            </View>
        </>
    );
}

export default Splash;

const styles = StyleSheet.create({

    bottomView: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        ...gstyles.inRow
    }

});