import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking,
    Platform,
} from 'react-native';

import CustomButton from '../../Components/Component/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import { QRCodeScanner, QRImageReader } from '../../Functions/NativeBridge/QRScanModule';
import { check, request, PERMISSIONS, RESULTS, } from 'react-native-permissions';




export default class FourthPage extends Component {

    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
            console.error('An error occured', err)
        );
    };

    picSelect = async () => {
        if (Platform.OS == 'android') {
            let res = await check(PERMISSIONS.ANDROID.CAMERA);
            switch (res) {
                case RESULTS.UNAVAILABLE:
                    console.log('UNAVAILABLE');
                    return;
                case RESULTS.BLOCKED:
                    console.log('BLOCKED');
                    return;
                case RESULTS.DENIED:
                    console.log('DENIED');
                    let requestRes = await request(PERMISSIONS.ANDROID.CAMERA);
                    break;
                case RESULTS.GRANTED:
                    console.log('GRANTED');
                    break;
            }
        }
        let image = await ImagePicker.openPicker({
            multiple: false,
            //maxFiles: 3,
            //includeBase64: true
        }).catch(e => {
            console.log('图片解析失败');
        });
        let scanResult = await QRImageReader(image.path);
        console.log(scanResult);
        this.onSuccess({ data: scanResult });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    第四页
                </Text>
                <CustomButton
                    title='选择图片'
                    style={styles.ButtonStyle}
                    clickEvent={this.picSelect}
                />
                <QRCodeScanner
                    onRead={this.onSuccess}
                />
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