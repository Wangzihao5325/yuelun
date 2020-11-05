import React, { Component } from 'react';
import { StyleSheet, Button, AsyncStorage, DeviceEventEmitter, Platform, Modal, View, Text, ActivityIndicator ,NativeEventEmitter ,NativeModules} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationService from '../../Router/NavigationService';
import { themeColor } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { _sessionId } from '../../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';
import StowPage from './StowPage';
import UnfoldPage from './UnfoldPage';
import { Loading } from '../../Components/Toast/Loading';
import PageName from '../../Config/PageName';
import { connect } from 'react-redux'
import VpnStateUtil from '../../Functions/Util/vpnStateUtil'
import store from '../../store';

class AccelerateDetails extends Component {
    state = {
        isAccelerate: false,
        pageType: 'stow',//stow,unfold
        icon: 'http://static.yuelun.com/game/game.png',
        name: '',
        showModal: false,
        modelTitle: ''
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            this.emitterListener = DeviceEventEmitter.addListener('vpn_state', (e) => {
                //e是原生传过来的参数
                console.log('here is state from native', e)
                if (e[0] === 'ToyVPN is connecting...') {
                    this.setState({
                        showModal: true,
                        modelTitle: '正在加速'
                    })
                    //正在加速中
                } else if (e[0] === 'ToyVPN is connected!') {
                    //加速完毕
                    const { accelerateInfo, gameFullInfo, id } = this.state
                    let _date = new Date();
                    gameFullInfo._timeReg = _date;
                    accelerateInfo[id] = gameFullInfo;
                    accelerateInfo[id]["speedup"] = "1";
                    console.log('JSON.stringify(accelerateInfo)', accelerateInfo);
                    AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                        this.setState({
                            isAccelerate: true,
                            showModal: false
                        });
                    });
                } else if (e[0] === 'ToyVPN is connect failed!') {
                    if (this.state.showModal) {
                        this.setState({
                            showModal: false
                        }, () => {
                            NavigationService.alert({
                                title: '提示',
                                content: '加速失败',
                                bottomObjs: [
                                    {
                                        key: 'cancel',
                                        type: 'button',
                                        title: '确定'
                                    }
                                ]
                            });
                        })
                    }
                } else if (e[0] === 'Disconnecting!') {
                    this.setState({
                        showModal: true,
                        modelTitle: '正在关闭'
                    })
                } else if (e[0] === 'Disconnect!') {
                    //各种断线操作
                    const { accelerateInfo, id } = this.state
                    accelerateInfo[id]["speedup"] = "0";
                    AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                        this.setState({
                            showModal: false,
                            isAccelerate: false
                        });
                    });
                }
            });
        }else{
            console.log('接收到监听-----注册');
            this.dataToJSPresenter = new NativeEventEmitter(NativeModules.VPNStatusNotification);
            this.dataToJSPresenter.addListener('vpn_state', (e) => {
                console.log('接收到监听-----',e);
                this.setState({
                    data: e.data
                });
            });
        }
        
        const { data } = this.props.route.params;
        let gameInfo = JSON.parse(data);
        /** gameInfo
            icon: "http://static.yuelun.com/game/game.png"
            id: "4"
            name: "王者荣耀"
         */
        this.props.navigation.setOptions({
            title: gameInfo.name,
            //headerTransparent: true
        });
        //gameInfo.id
        Loading.show();
        Api.getGameInfoById(gameInfo.id, '').then((request) => {
            Loading.hidden();
            console.log("getGameInfoByIdgetGameInfoById", request);
            if (request.status === 'error') {
                NavigationService.alert(this.alertPayload('getGameInfoById存在报错'));
            } else {
                this.setState({
                    ...request.data.game_info,
                    gameFullInfo: request.data.game_info
                });

                AsyncStorage.getItem('accelerateInfo').then(async (value) => {
                    let accelerateInfo = JSON.parse(value || '{}');
                    let onlineState = await VpnStateUtil(accelerateInfo, gameInfo.id)
                    let isAccelerate = onlineState.isTheGameAccele//accelerateInfo[this.state.id]?.speedup === "1" ? true : false;
                    this.setState({
                        isAccelerate,
                        accelerateInfo: onlineState.newLocalData
                    });
                });

                AsyncStorage.getItem('isFirstAccelerate').then(value => {
                    this._isFirstAccelerate = value;
                    if (!value) {
                        this._unsubscribe = this.props.navigation.addListener('focus', () => {
                            if (this.goToAlert) {
                                this.goToAlert = false;
                                this.next(this.goToAlertType);
                            }
                        });
                    }
                })
            }
        })
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
        if (this.emitterListener) {
            this.emitterListener.remove()
        }
    }

    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                {this.state.pageType === 'stow' &&
                    <StowPage
                        showModal={this.state.showModal}
                        modelTitle={this.state.modelTitle}
                        name={this.state.name}
                        icon={this.state.icon}
                        accelerateInfo={this.state.accelerateInfo}
                        gameId={this.state.id}
                        pageTypeChange={this.pageTypeChange}
                        speedUp={this.speedUp}
                        isAccelerate={this.state.isAccelerate}
                        navigation={this.props.navigation}
                    />
                }
                {this.state.pageType === 'unfold' &&
                    <UnfoldPage
                        pageTypeChange={this.pageTypeChange}
                        isAccelerate={this.state.isAccelerate}
                    />
                }
                <Modal
                    transparent={true}
                    visible={this.state.showModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {/* <View style={{ height: 150, width: 150, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ marginBottom: 10 }}>{`${this.state.modelTitle}`}</Text>
                            <ActivityIndicator />
                        </View> */}
                    </View>
                </Modal>
            </SafeAreaView>
        );
    }

    pageTypeChange = () => {
        this.setState((preState) => {
            let pageType = preState.pageType === 'stow' ? 'unfold' : 'stow'
            return {
                pageType
            }
        });
    }

    speedUp = async () => {
        if (!this.props.isLogin) {
            //未登录提示登陆
            NavigationService.alert({
                title: '提示',
                content: '您尚未登陆，请前往登陆',
                bottomObjs: [
                    {
                        key: 'cancel',
                        type: 'button',
                        title: '确定'
                    }
                ]
            });
            return
        }
        const { id, accelerateInfo } = this.state;
        let onlineState = await VpnStateUtil(accelerateInfo, id)

        if (onlineState.isTheGameAccele) {
            NavigationService.alert({
                title: '请确认',
                content: '是否确定停止加速功能',
                bottomObjs: [
                    {
                        key: 'cancel',
                        type: 'button',
                        title: '手滑了',
                    },
                    {
                        key: 'separator_1',
                        type: 'separator'
                    },
                    {
                        key: 'confirm',
                        type: 'button',
                        title: '关闭',
                        callback: this.stopVpn
                    }
                ]
            })
        } else {
            if (onlineState.isAppAccele) {
                NavigationService.alert({
                    title: '提示',
                    content: '当前有游戏正在加速中，不可同时开启',
                    bottomObjs: [
                        {
                            key: 'cancel',
                            type: 'button',
                            title: '确定'
                        }
                    ]
                });
            } else {
                if (!this._isFirstAccelerate) {//第一次加速，进行弹窗提示
                    NavigationService.alert(this.vpnAlertPayload('want_add_setting'));
                } else {
                    this.finallyStep();
                }
            }
        }
    }

    stopVpn = () => {
        vpnModule.stopVPN();
    }

    /*
    checkVPNHasConnected = async (id = '') => {
        let accelerateInfoStr = await AsyncStorage.getItem('accelerateInfo');
        let accelerateInfoDic = JSON.parse(accelerateInfoStr || '{}');
        let infoArray = Object.values(accelerateInfoDic);
        let accelerating = false;
        infoArray.forEach((value, index) => {
            if (value.speedup === "1") {
                accelerating = true;
            }
        });

        return Promise.resolve(accelerating);
    }
    */

    finallyStep = async () => {
        //NavigationService.navigate(PageName.MODAL_ACCELERATE_PROGRESS);      
        const { use_server_id, id, gameFullInfo } = this.state;
        var iplist = gameFullInfo["ip_list"];
        var iplistArray = iplist;
        console.log('gameFullInfogameFullInfo', gameFullInfo);

        let IPArray = [];
        for (let i = 0; i < iplistArray.length; i++) {
            let IPUntil = iplistArray[i];
            let index = IPUntil.indexOf("/");
            let IP = IPUntil.substring(1, index - 1);
            let DNS = IPUntil.substring(index + 1, IPUntil.length - 1);
            let newUnitItem = [IP, DNS];
            IPArray.push(newUnitItem);
        }

        if (use_server_id.length > 0) {
            Api.connectServer(id, use_server_id[0]).then((res) => {
                if (res.status === 'ok' && res.data.consult_ip) {
                    //各种连接操作
                    vpnModule.prepare()
                        .then(() => {
                            let type = store.getState().acc.accelerateType === 'auto' ? '1' : '2'
                            vpnModule.startVpn(_sessionId, id, type, IPArray);
                        });
                } else {
                    if (res.status === 'ok') {
                        NavigationService.alert(this.alertPayload("后台服务正忙，请重试"));
                    } else {
                        NavigationService.alert(this.alertPayload(res.msg));
                    }

                }
            })
        }

    }

    cancel = (type) => {
        this.goToAlert = false;
        this.goToAlertType = '';
    }

    _next = (type) => {
        this.goToAlert = true;
        this.goToAlertType = type;
    }

    next = (type) => {
        switch (type) {
            case 'want_add_setting':
                NavigationService.alert(this.vpnAlertPayload('use_position'));
                break;
            case 'use_position':
                NavigationService.alert(this.vpnAlertPayload('vpn_tips'));
                break;
            case 'vpn_tips':
                this._isFirstAccelerate = 'done';
                AsyncStorage.setItem('isFirstAccelerate', 'done');
                this.finallyStep();
                break;
        }
    }

    vpnAlertPayload = (type) => {
        switch (type) {
            case 'want_add_setting':
                return {
                    title: '月轮加速器想添加VPN配置',
                    content: '使用VPN时，可能会过滤或监测\n您的手机的全部网络活动',
                    bottomObjs: [
                        {
                            key: 'cancel',
                            type: 'button',
                            title: '允许',
                            callback: () => this._next('want_add_setting')
                        },
                        {
                            key: 'separator_1',
                            type: 'separator'
                        },
                        {
                            key: 'confirm',
                            type: 'button',
                            title: '不允许',
                            callback: () => this.cancel('want_add_setting')
                        }
                    ]
                }
            case 'use_position':
                return {
                    title: '允许“月轮加速器”访问您的位置?',
                    content: '同意授权将帮助我们为您分配更稳定\n和更近的加速节点',
                    bottomVertical: true,
                    bottomObjs: [
                        {
                            key: 'confirm_0',
                            type: 'button',
                            title: '使用APP时允许',
                            callback: () => this._next('use_position')
                        },
                        {
                            key: 'separator_1',
                            type: 'separator'
                        },
                        {
                            key: 'confirm_1',
                            type: 'button',
                            title: '允许一次',
                            callback: () => this._next('use_position')
                        },
                        {
                            key: 'separator_2',
                            type: 'separator'
                        },
                        {
                            key: 'cancel',
                            type: 'button',
                            title: '不允许',
                            callback: () => this.cancel('use_position')
                        }
                    ]
                }
            case 'vpn_tips':
                return {
                    content: '首次加速需要您授权安装证书，安装过程\n中系统需要您输入锁屏密码或者使用\nTouch ID，请在接下来的系统提示框中\n选择“Allow”',
                    imageContent: {
                        source: require('../../resource/Image/AccelerateDetails/vpnTips.png'),
                        style: { height: 180, marginTop: 20 }//可选参数
                    },
                    bottomObjs: [
                        {
                            key: 'confirm_0',
                            type: 'button',
                            title: '我知道了',
                            callback: () => this._next('vpn_tips')
                        }
                    ]
                }
        }
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
                        NavigationService.back(this);
                    }
                }
            ]
        };
    }
}

function mapState2Props(store) {
    return {
        isLogin: store.user.isLogin,
    }
}

export default connect(mapState2Props)(AccelerateDetails);
