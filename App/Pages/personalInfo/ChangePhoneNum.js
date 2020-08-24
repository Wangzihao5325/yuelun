import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import store from '../../store';
import { unsafe_update } from '../../store/actions/userAction';
import * as NavigationService from '../../Router/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../Components/Component/CustomInput';
import CustomButton from '../../Components/Component/CustomButton';

export default class ChangePhoneNum extends Component {
    state = {
        inputType: 'new',
        phoneNum: '',
        oldPhoneNum: '',
        newPhoneNum: '',
        verificationCode: '',
        oldCode: '',
        newCode: '',
    };

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <KeyboardAwareScrollView>
                    <CustomInput
                        style={{ alignSelf: 'center', marginTop: 20 }}
                        iconName='mobile-phone'
                        placeholder='请输入新的手机号'
                        value={phoneNum}
                        onChangeText={this.phoneNumChange}
                        clearButtonMode='while-editing'
                    />
                    <View style={{ marginTop: 20, height: 45, width: 350, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <CustomInput
                            style={{ width: 210 }}
                            iconName='mobile-phone'
                            placeholder='请输入验证码'
                            value={verificationCode}
                            onChangeText={this.verificationCodeChange}
                            clearButtonMode='while-editing'
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
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    phoneNumChange = (value) => {
        if (this.state.inputType === 'new') {
            this.setState({
                phoneNum: value,
                newPhoneNum: value,
            });
        } else if (this.state.inputType === 'old') {
            this.setState({
                phoneNum: value,
                oldPhoneNum: value,
            });
        }
    }

    verificationCodeChange = (value) => {
        if (this.state.inputType === 'new') {
            this.setState({
                verificationCode: value,
                newCode: value
            });
        } else if (this.state.inputType === 'old') {
            this.setState({
                verificationCode: value,
                oldCode: value
            });
        }
    }

    getVerificationCode = () => {
        const { phoneNum } = this.state;
        Api.sendPhoneCode(phoneNum)
            .then((result) => {

            });
    }

    confirm = () => {
        if (this.state.newPhoneNum && this.state.newCode) {
            if (this.state.inputType == 'new') {
                Api.modifyUserInfo(this.state.newPhoneNum, this.state.newCode, '', '').then((res) => {
                    if (res.status == 'ok') {
                        store.dispatch(unsafe_update({ mobile: this.state.newPhoneNum }))
                        NavigationService.back(this);
                    }
                })
            }
            //  else if (this.state.inputType == 'old') {
            //     Api.modifyUserInfo(this.state.newPhoneNum, this.state.newCode, '', '').then((res) => {
            //         console.log(res);
            //     })
            // }
        }
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