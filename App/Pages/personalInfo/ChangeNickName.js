import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';
import { connect } from 'react-redux';
import store from '../../store';
import { unsafe_update } from '../../store/actions/userAction';
import * as NavigationService from '../../Router/NavigationService';
import CustomButton from '../../Components/Component/CustomButton';
import * as APi from '../../Functions/NativeBridge/ApiModule';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ChangeNickName extends Component {
    state = {
        nickName: ''
    };

    componentDidMount() {
        this.setState({
            nickName: this.props.username
        });
    }

    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <KeyboardAwareScrollView>
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <TextInput style={styles.input} value={this.state.nickName} onChangeText={this.nickNameChange} />
                        <Text style={styles.tipsText}>昵称最长不超过7个汉字，不能包含敏感词汇和特殊字符</Text>
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

    nickNameChange = (value) => {
        this.setState({
            nickName: value
        });
    }

    confirm = () => {
        APi.modifyUserInfo('', '', this.state.nickName, '').then((res) => {
            if (res.status == 'ok') {
                store.dispatch(unsafe_update({ username: this.state.nickName }))
                NavigationService.back(this);
            }else{
                NavigationService.alert(this.alertPayload(res.msg));
            }
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
                }
            ]
        };
    }
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    mobile: state.user.mobile
})

export default connect(mapStateToProps)(ChangeNickName);

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: 350,
        backgroundColor: themeColor.inputBgColor,
        borderRadius: 22,
        paddingHorizontal: 20,
        color: 'white',
        fontSize: 17,
        alignSelf: 'center'
    },
    tipsText: {
        marginTop: 10,
        fontSize: 13,
        color: themeColor.inputBgColor,
        alignSelf: 'center'
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
        marginBottom: 20,
    }
});