import React, { Component } from 'react';
import { View, TouchableHighlight, ImageBackground, Image, Text, Platform, StyleSheet, AsyncStorage } from 'react-native';
import { themeColor, SCREEN_WIDTH } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import store from '../../store';
import { app_start_app } from '../../store/actions/appAction';
import { login_user_info_init } from '../../store/actions/userAction';
import { appVersion } from '../../Config/SystemConfig';
import Network from '../../Config/Network';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../Components/Component/CustomInput';
import CustomButton from '../../Components/Component/CustomButton';
import * as navigator from '../../Router/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';

export default class Login extends Component {
    state = {
        phoneNum: '',
        verificationCode: ''
    };

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        let isSinglePageMode = this.props.type == 'singlePage';//判断是作为单页面调用还是在stack navi中调用
        let additionalStyle = isSinglePageMode ? null : { paddingTop: 0 }
        return (
            <SafeAreaView style={[{ flex: 1, backgroundColor: bgColor }, additionalStyle]}>
                <KeyboardAwareScrollView>
                    <ImageBackground
                        style={{ display: 'flex' }}
                        source={require('../../resource/Image/Login/login_bg.png')}
                        resizeMode='cover'
                    >
                        <View style={{ height: 20, width: SCREEN_WIDTH, paddingHorizontal: 15, marginTop: 10 }}>
                            {isSinglePageMode &&
                                <TouchableHighlight onPress={this.startAppWithUnLogin} underlayColor='transparent'>
                                    <Icon name='chevron-left' size={20} color="#666" />
                                </TouchableHighlight>
                            }
                        </View>
                        <Image
                            style={styles.headerImage}
                            resizeMode='contain'
                            source={require('../../resource/Image/Login/header.png')}
                        />
                        <CustomInput
                            iconComponent={
                                <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                    <View
                                        style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Image
                                            style={{ height: 21, width: 16 }}
                                            resizeMode='contain'
                                            source={require('../../resource/Image/Normal/mobile.png')}
                                        />
                                    </View>
                                    <Text style={{ color: '#707070', fontSize: 19, marginRight: 20 }}>+86</Text>
                                </View>
                            }
                            style={{ alignSelf: 'center', backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            iconName='mobile-phone'
                            placeholder='请输入手机号'
                            placeholderTextColor='#707070'
                            value={phoneNum}
                            onChangeText={this.phoneNumChange}
                            clearButtonMode='while-editing'
                        />
                        <View style={styles.separator} />
                        <View style={{ marginTop: 20, height: 45, width: 350, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomInput
                                iconComponent={
                                    <View
                                        style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Image
                                            style={{ height: 15, width: 17 }}
                                            resizeMode='contain'
                                            source={require('../../resource/Image/Normal/verificationCode.png')}
                                        />
                                    </View>
                                }
                                style={{ width: 210, backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                iconName='mobile-phone'
                                placeholder='请输入验证码'
                                placeholderTextColor='#707070'
                                value={verificationCode}
                                onChangeText={this.verificationCodeChange}
                                clearButtonMode='while-editing'
                            />
                            <CustomButton
                                title='获取验证码'
                                buttonStyle={styles.verificationCodeBtn}
                                titleStyle={{ color: '#f2cc2e', fontSize: 17 }}
                                clickEvent={this.getVerificationCode}
                            />
                        </View>
                        <View style={styles.separator} />
                    </ImageBackground>
                    <CustomButton
                        title='登录'
                        buttonStyle={styles.confirmButton}
                        titleStyle={{ color: '#000' }}
                        clickEvent={this.login}
                    />
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#666' }}>我已阅读并同意<Text style={{ color: '#f2cc2e' }}>隐私政策</Text>和<Text style={{ color: '#f2cc2e' }}>软件许可及使用协议</Text></Text>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }


    phoneNumChange = (value) => {
        this.setState({
            phoneNum: value
        });
    }

    verificationCodeChange = (value) => {
        this.setState({
            verificationCode: value
        });
    }

    login = () => {

        // vpnModule.prepare()
        //     .then(() => {
        //         vpnModule.startVpn('162.14.5.205', 32091);
        //     });


        const { phoneNum, verificationCode } = this.state;
        Api.loginByPhoneNum(phoneNum, verificationCode, Platform.OS, appVersion)
            .then((result) => {
                if (result['status'] == 'ok') {
                    this.saveTheUserInfo(result);
                    //session比较常用，所以在network里也存一份，方便使用
                    Network.session = result.data.session_id;
                    store.dispatch(login_user_info_init({ ...result.data, mobile: phoneNum }));
                    if (store.getState().app.isLogin) {
                        store.dispatch(app_start_app());
                    } else {
                        navigator.back(this);
                    }
                } else {
                    if (store.getState().app.isLogin) {
                    } else {
                        navigator.alert(this.alertPayload(result.msg));
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    getVerificationCode = () => {
        const { phoneNum, verificationCode } = this.state;

        Api.sendPhoneCode(phoneNum)
            .then((result) => {

            });
    }


    startAppWithUnLogin = () => {
        store.dispatch(app_start_app());
    }

    saveTheUserInfo = (userInfo) => {
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    alertPayload = (msg) => {
        return {
            title: '注意',
            content: `${msg}`,
            bottomObjs: [
                {
                    key: 'confirm',
                    type: 'button',
                    title: '确认',
                    callback: () => {
                       // navigator.pop(this);
                    }
                }
            ]
        };
    }
}

const styles = StyleSheet.create({
    headerImage: {
        height: 41.5,
        width: 219.5,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 60
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        width: 360,
        backgroundColor: '#092852',
        alignSelf: 'center'
    },
    verificationCodeBtn: {
        display: 'flex',
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#f2cc2e',
        borderWidth: 1
    },
    confirmButton: {
        display: 'flex',
        height: 45,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2cc2e',
        borderRadius: 45,
        alignSelf: 'center',
        marginTop: 60
    }
});