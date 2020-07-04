import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';

import CustomInput from '../../Components/Component/CustomInput';

export default class PersonalInfo extends Component {
    state = {
        phoneNum: '',
        verificationCode: ''
    };

    render() {
        const { bgColor } = themeColor;
        const { phoneNum, verificationCode } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <View style={{ flex: 1 }}>
                    <CustomInput
                        style={{ alignSelf: 'center' }}
                        iconName='mobile-phone'
                        placeholder='请输入新的手机号'
                        value={phoneNum}
                        onChangeText={this.phoneNumChange}
                    />
                    <View style={{ marginTop: 20, height: 90, width: 350, alignSelf: 'center' }}>
                        <CustomInput
                            style={{ width: 210 }}
                            iconName='mail'
                            placeholder='请输入验证码'
                            value={verificationCode}
                            onChangeText={this.verificationCodeChange}
                        />
                    </View>
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
}