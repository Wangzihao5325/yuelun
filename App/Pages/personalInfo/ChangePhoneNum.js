import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';

import CustomInput from '../../Components/Component/CustomInput';
import CustomButton from '../../Components/Component/CustomButton';

export default class ChangePhoneNum extends Component {
    state = {
        phoneNum: '',
        verificationCode: ''
    };

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <CustomInput
                    style={{ alignSelf: 'center' }}
                    iconName='mobile-phone'
                    placeholder='请输入新的手机号'
                    value={phoneNum}
                    onChangeText={this.phoneNumChange}
                />
                <View style={{ marginTop: 20, height: 45, width: 350, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CustomInput
                        style={{ width: 210 }}
                        iconName='mobile-phone'
                        placeholder='请输入验证码'
                        value={verificationCode}
                        onChangeText={this.verificationCodeChange}
                    />
                    <CustomButton
                        title='获取验证码'
                        buttonStyle={styles.verificationCodeBtn}
                        titleStyle={{ color: '#f2cc2e' }}
                        clickEvent={this.getVerificationCode}
                    />
                </View>
                <CustomButton
                    title='确定'
                    buttonStyle={styles.confirmButton}
                    titleStyle={{ color: '#000' }}
                    clickEvent={this.confirm}
                />
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

    getVerificationCode = () => {
        console.log('获取验证码');
    }

    confirm = () => {
        console.log('确认');
    }
}

const styles = StyleSheet.create({
    verificationCodeBtn: {
        display: 'flex',
        height: 43,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 43,
        borderColor: '#f2cc2e',
        borderWidth: 1
    },
    confirmButton: {
        display: 'flex',
        height: 45,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2cc2e',
        borderRadius: 45,
        alignSelf: 'center',
        marginTop: 60
    }
});