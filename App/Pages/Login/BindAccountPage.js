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
import { Loading } from '../../Components/Toast/Loading';
import { Toast } from '../../Components/Toast/Toast';
export default class BindAccountPage extends Component {
    state = {
        phoneNum: '',
        verificationCode: '',
        sessionID:'',
        userID:'',
        isMessageBtnCanPress: true,
        agreePolicy: true,
    };

    componentDidMount() {
        const { data } = this.props.route.params;
        
        this.setState({
            sessionID:data.sessionID,
            userID:data.userID
        });
    }

    componentWillUnmount() {
        if (this._messageTimer) {
            clearInterval(this._messageTimer);
        }
    }

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={[{ flex: 1, backgroundColor: bgColor }, { paddingTop: 0 }]}>
                <KeyboardAwareScrollView>
                    <ImageBackground
                        style={{ display: 'flex' }}
                        source={require('../../resource/Image/Login/login_bg.png')}
                        resizeMode='cover'
                    >
                        <View style={{ height: 20, width: SCREEN_WIDTH, paddingHorizontal: 15, marginTop: 10 }} />
                        <CustomInput
                            iconComponent={
                                <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#707070', fontSize: 19, marginRight: 20 }}>账号：</Text>
                                </View>
                            }
                            style={{ alignSelf: 'center', backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            iconName='mobile-phone'
                            placeholder='请输入账号'
                            placeholderTextColor='#707070'
                            value={phoneNum}
                            onChangeText={this.phoneNumChange}
                            clearButtonMode='while-editing'
                        />
                        <View style={styles.separator} />
                        <View style={{ marginTop: 20, height: 45, width: 350, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <CustomInput
                                iconComponent={
                                    <View style={{ height: 30, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#707070', fontSize: 19, marginRight: 20 }}>密码：</Text>
                                </View>
                                }
                                style={{ width: 210, backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                iconName='mobile-phone'
                                placeholder='请输入密码'
                                placeholderTextColor='#707070'
                                value={verificationCode}
                                onChangeText={this.verificationCodeChange}
                                clearButtonMode='while-editing'
                            />
                        </View>
                        <View style={styles.separator} />
                    </ImageBackground>
                    <CustomButton
                        title='确认绑定'
                        buttonStyle={styles.confirmButton}
                        titleStyle={{ color: '#000' }}
                        clickEvent={this.login}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    clickTheAgreementOfPolicy = () => {
        let agreePolicy = this.state.agreePolicy;
        agreePolicy = !agreePolicy;
        this.setState({ agreePolicy: agreePolicy });
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
        const { phoneNum, verificationCode, agreePolicy } = this.state;

        if (phoneNum.length == 0) {
            Toast.show('请输入账号');
            return;
        } else if (verificationCode.length == 0) {
            Toast.show('请输入密码');
            return;
        }

        Loading.show();

        Api.YuelunBindUsers(this.state.sessionID,"1",this.state.userID,"","",phoneNum,verificationCode,"")
        .then((result)=>{
            Loading.hidden();
            if(result['status'] == 'ok'){
                Toast.show('绑定成功');
                    setTimeout(() => {
                        navigator.pop(this,2);
                    }, 1500);
            }else{
                navigator.alert(this.alertPayload(result.msg));
            }
            console.log('sjsjsjs',result);
        })
        .catch((error) => {
            Loading.hidden();
            console.log(error);
        });
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