import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor}}>
                <View style={{ alignSelf: 'center', marginTop: 30, marginBottom: 20 }}>
                    <Icon name='twitter' size={80} color="#666" />
                </View>
                <CustomInput
                    style={{ alignSelf: 'center', backgroundColor: 'transparent' }}
                    iconName='mobile-phone'
                    placeholder='请输入手机号'
                    value={phoneNum}
                    onChangeText={this.phoneNumChange}
                />
                <View style={styles.separator} />
                <View style={{ marginTop: 20, height: 45, width: 350, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CustomInput
                        style={{ width: 210, backgroundColor: 'transparent' }}
                        iconName='mobile-phone'
                        placeholder='请输入验证码'
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
                    <Text style={{ color: '#666' }}>我已阅读并同意<Text style={{ color: '#f2cc2e' }}>XXX政策</Text>和<Text style={{ color: '#f2cc2e' }}>软件许可及使用协议</Text></Text>
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
    separator: {
        height: StyleSheet.hairlineWidth,
        width: 360,
        backgroundColor: '#fff',
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