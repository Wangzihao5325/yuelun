import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '../../Components/Component/CustomInput';
import CustomButton from '../../Components/Component/CustomButton';

export default class Login extends Component {
    state = {
        phoneNum: '',
        verificationCode: ''
    };

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <Image
                    style={styles.headerImage}
                    resizeMode='contain'
                    source={require('../../resource/Image/Login/header.png')}
                />
                <CustomInput
                    iconComponent={
                        <View style={{height:30,flexDirection:'row',alignItems:'center'}}>
                            <View
                                style={{ height: 30, width: 30, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Image
                                    style={{ height: 21, width: 16 }}
                                    resizeMode='contain'
                                    source={require('../../resource/Image/Normal/mobile.png')}
                                />
                            </View>
                            <Text style={{color:'#707070',fontSize:19,marginRight:20}}>+86</Text>
                        </View>
                    }
                    style={{ alignSelf: 'center', backgroundColor: 'transparent', paddingHorizontal: 0 }}
                    iconName='mobile-phone'
                    placeholder='请输入手机号'
                    placeholderTextColor='#707070'
                    value={phoneNum}
                    onChangeText={this.phoneNumChange}
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
                    />
                    <CustomButton
                        title='获取验证码'
                        buttonStyle={styles.verificationCodeBtn}
                        titleStyle={{ color: '#f2cc2e', fontSize: 17 }}
                        clickEvent={this.getVerificationCode}
                    />
                </View>
                <View style={styles.separator} />
                <CustomButton
                    title='登录'
                    buttonStyle={styles.confirmButton}
                    titleStyle={{ color: '#000' }}
                    clickEvent={this.login}
                />
                <View style={{ alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#666' }}>我已阅读并同意<Text style={{ color: '#f2cc2e' }}>隐私政策</Text>和<Text style={{ color: '#f2cc2e' }}>软件许可及使用协议</Text></Text>
                </View>
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
        console.log('登录');
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