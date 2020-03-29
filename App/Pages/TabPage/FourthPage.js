import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    NativeModules,
    Image
} from 'react-native';

import CustomButton from '../../Components/Component/CustomButton';
import { QRCodeScanner, QRImageReader } from '../../Functions/NativeBridge/QRScanModule';



export default class FourthPage extends Component {
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    第四页
                </Text>
                <CustomButton
                    title='自定义按钮'
                    style={styles.ButtonStyle}
                    clickEvent={() => {
                        console.log('触发传入的方法事件');
                    }}
                />
                {/* <QRCodeScanner
                    onRead={this.onSuccess}
                    //flashMode={QRCodeScanner.Constants.FlashMode.torch}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    ButtonStyle: {
        width: 200,
        height: 100,
        backgroundColor: 'red'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});