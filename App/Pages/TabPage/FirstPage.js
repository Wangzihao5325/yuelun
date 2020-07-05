/**
 * FirstPage
 * Info:
 * Crate by Charlie on 2019-08-18
 * */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';

export default class FirstPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    FisrtPage
                </Text>
                {/* <Button
                    title='下载进度条'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.navigate(PageName.NORMAL_PROGRESS_RATE)
                    }} />
                <Button
                    title='navi service跳转Modal'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.navigate(PageName.MODAL_WRAPPER)
                    }} />
                <Button
                    title='跳转'
                    style={[styles.button]}
                    onPress={() => {
                        console.log('跳转PushPage');
                        navigator.jump(this, PageName.NORMAL_STACK_PUSH, {
                            dataID: '123456',
                            backClock: (backData = '') => {
                                console.log('参数block的回调执行，参数：', backData);
                            }
                        });
                    }} />
                <Button
                    title='push to bridge'
                    style={[styles.button]}
                    onPress={() => {
                        console.log('跳转BridgePage');
                        navigator.jump(this, PageName.NORMAL_STACK_BRIDGE);
                    }}
                />
                <Button
                    title='push to network'
                    style={[styles.button]}
                    onPress={() => {
                        console.log('跳转NetworkPage');
                        navigator.jump(this, PageName.NORMAL_STACK_NETWORK);
                    }}
                />
                <Button
                    title='push to toast & Hud'
                    style={[styles.button]}
                    onPress={() => {
                        console.log('跳转ToastPage');
                        navigator.jump(this, PageName.NORMAL_STACK_TOAST);
                    }}
                />
                <Button
                    title='push to flat list view page'
                    style={[styles.button]}
                    onPress={() => {
                        console.log('跳转FlatListPage');
                        navigator.jump(this, PageName.NORMAL_STACK_FLATLIST);
                    }}
                /> */}
                <Button
                    title='个人信息-更换手机号'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_CHANGE_PHONE_NUM);
                    }}
                />
                <Button
                    title='个人信息-更换昵称'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_CHANGE_NICK_NAME);
                    }}
                />
                <Button
                    title='登录页面'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_LOGIN);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        height: 50,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'blue'
    },
});