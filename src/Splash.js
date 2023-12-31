import React from 'react';
import {
    View,
    StatusBar,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import { gstyles } from './components/GlobalStyles';
import { HEIGHT, app_Bg } from './components/Constants';

const Splash = () => {

    return (
        <>
            <StatusBar
                backgroundColor='#236cac'
                animated={true}
                barStyle="light-content"
            />
            <View style={[gstyles.container(app_Bg), gstyles.centerXY]}>
                <Image source={require('./assets/gif/intro_gif.gif')}
                    style={{ height: HEIGHT }}
                />
                {/* <View style={styles.bottomView}>
                    <Text style={gstyles.OpenSans_Medium(16, '#000000', gstyles.me(5))}>
                        Powered by
                    </Text>
                    <Image source={require('./assets/images/text_logo.jpg')}
                        style={[gstyles.iconSize(80, 18), gstyles.mt(5)]}
                    />
                </View> */}
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