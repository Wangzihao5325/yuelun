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
    state = {
        test: '1234567'
    }

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
                    title='个人信息-首页'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_PERSONAL_INFO);
                    }}
                />
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
                    title='关于我们'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_ABOUT_US);
                    }}
                />
                <Button
                    title='公告消息'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_NOTICE);
                    }}
                />
                <Button
                    title='登录页面'
                    style={[styles.button]}
                    onPress={() => {
                        navigator.jump(this, PageName.NORMAL_LOGIN);
                    }}
                />
                <Button
                    title='提示弹窗'
                    style={[styles.button]}
                    onPress={this.showAlert}
                />
                <Button
                    title='提示弹窗-底部'
                    style={[styles.button]}
                    onPress={this.showAlertBottom}
                />
            </View>
        );
    }

    logState = () => {
        console.log(this.state.test);
    }

    cancel = () => {
        console.log('cancel')
    }

    showAlertBottom = () => {
        navigator.navigate(PageName.MODAL_ALERT_BOTTOM, {
            content: '您当前有两款游戏正在加速，停止加速可能导致游戏断线，是否停止所有游戏的加速?',
            bottomObjs: [
                {
                    key: 'stop',
                    title: '停止所有游戏加速',
                    callback: this.logState
                },
                {
                    key: 'cancel',
                    title: '取消',
                    callback: this.cancel
                },
            ]
        });
    }

    showAlert = () => {
        navigator.navigate(PageName.MODAL_ALERT, {
            title: '提示',
            content: '这是一个提示，请选择你喜欢的选项,阿巴巴巴巴巴巴巴巴巴巴巴',
            imageContent: {
                source: { uri: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
                //style: {}//可选参数
            },
            bottomObjs: [
                {
                    key: 'cancel',
                    type: 'button',
                    title: '取消',
                    callback: this.cancel
                },
                {
                    key: 'separator_1',
                    type: 'separator'
                },
                {
                    key: 'confirm',
                    type: 'button',
                    title: '确认',
                    callback: this.logState
                }
            ]
        })
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