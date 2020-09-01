import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    Image,
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
        messageBtnTitle: '获取验证码',
        isMessageBtnCanPress: true
    };

    componentWillUnmount() {
        if (this._messageTimer) {
            clearInterval(this._messageTimer);
        }
    }

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <KeyboardAwareScrollView>
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
                            title={this.state.messageBtnTitle}
                            buttonStyle={styles.verificationCodeBtn}
                            titleStyle={{ color: '#f2cc2e', fontSize: 17 }}
                            clickEvent={this.getVerificationCode}
                        />
                    </View>
                    <View style={styles.separator} />
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
        if (!this.state.isMessageBtnCanPress) {
            return;
        }
        const { phoneNum } = this.state;
        Api.sendPhoneCode(phoneNum)
            .then((result) => {
                this.setState({
                    messageBtnTitle: '60S',
                    isMessageBtnCanPress: false
                }, () => {
                    let time = 60;
                    this._messageTimer = setInterval(() => {
                        time--;
                        if (time == 0) {
                            this.setState({
                                messageBtnTitle: `获取验证码`,
                                isMessageBtnCanPress: true
                            });
                            clearInterval(this._messageTimer);
                            this._messageTimer = null;
                        } else {
                            this.setState({
                                messageBtnTitle: `${time}s`,
                            });

                        }
                    }, 1000)
                });
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
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        width: 360,
        backgroundColor: '#092852',
        alignSelf: 'center'
    },
});