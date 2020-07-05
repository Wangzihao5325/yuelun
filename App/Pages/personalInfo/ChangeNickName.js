import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';

import CustomButton from '../../Components/Component/CustomButton';

export default class ChangeNickName extends Component {
    state = {
        nickName: '小月亮'
    };
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, justifyContent: 'space-between' }}>
                <View>
                    <TextInput style={styles.input} value={this.state.nickName} onChangeText={this.nickNameChange} />
                    <Text style={styles.tipsText}>昵称最长不超过7个汉字，不能包含敏感词汇和特殊字符</Text>
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

    nickNameChange = (value) => {
        this.setState({
            nickName: value
        });
    }
}

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