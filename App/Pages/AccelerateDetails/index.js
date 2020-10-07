import React, { Component } from 'react';
import { StyleSheet, Button, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationService from '../../Router/NavigationService';
import { themeColor } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { _sessionId } from '../../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';
import StowPage from './StowPage';
import UnfoldPage from './UnfoldPage';
import { Loading } from '../../Components/Toast/Loading';

export default class AccelerateDetails extends Component {
    state = {
        isAccelerate: false,
        pageType: 'stow',//stow,unfold
        icon: 'http://static.yuelun.com/game/game.png',
    }

    componentDidMount() {
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
            console.log("getGameInfoByIdgetGameInfoById",request);
            if (request.status === 'error') {
                NavigationService.alert(this.alertPayload('getGameInfoById存在报错'));
            } else {
                this.setState({
                    ...request.data.game_info,
                    gameFullInfo: request.data.game_info
                });

                AsyncStorage.getItem('accelerateInfo').then(value => {
                    let accelerateInfo = JSON.parse(value || '{}');
                    let isAccelerate = accelerateInfo[this.state.id] ? true : false;
                    this.setState({
                        isAccelerate,
                        accelerateInfo
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
            /*
            game_info: {
                domain_black_list: ""
                domain_white_list: "[]"
                down_limit: "300"
                icon: "http://static.yuelun.com/game/game.png"
                id: "4"
                ip_list: "[]"
                name: "王者荣耀"
                process_list: "["com.tencent.tmgp.sgame"]"
                region: "王者荣耀-国服"
                system: "android"
                type_name: "国服"
                up_limit: "300"
                use_server_id: "[]"
            }
            timestamp: 1595213291
            */
        })

        //尝试获取流量
        Api.getFlow().then(res=>{
            console.log('res==>',res)
        })
    }

    componentWillUnmount() {
        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }

    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                {this.state.pageType === 'stow' &&
                    <StowPage
                        icon={this.state.icon}
                        pageTypeChange={this.pageTypeChange}
                        speedUp={this.speedUp}
                        isAccelerate={this.state.isAccelerate}
                    />
                }
                {this.state.pageType === 'unfold' &&
                    <UnfoldPage
                        pageTypeChange={this.pageTypeChange}
                        isAccelerate={this.state.isAccelerate}
                    />
                }
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

    speedUp = () => {
        const { use_server_id, id, accelerateInfo } = this.state;
        if (this.state.isAccelerate) {
            vpnModule.stopVPN();
            //各种断线操作
            accelerateInfo[this.state.id]["speedup"] = "0";
            AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                this.setState({
                    isAccelerate: false
                });
            });
        } else {
            if (!this._isFirstAccelerate) {//第一次加速，进行弹窗提示
                NavigationService.alert(this.vpnAlertPayload('want_add_setting'));
            } else {
                this.finallyStep();
            }
        }
    }

    finallyStep = () => {
        const { use_server_id, id, accelerateInfo,gameFullInfo } = this.state;
        var iplist = gameFullInfo["ip_list"];
        var iplistArray;
        if(iplist === ''){
            iplistArray = [];
        }else{
            iplist = iplist.replace("[","");
            iplist = iplist.replace("]","");
            iplistArray = iplist.split(',');
        }
        
        let IPArray = [];
        for(let i =0;i<iplistArray.length;i++){
            let IPUntil = iplistArray[i];
            let index = IPUntil.indexOf("/");
            let IP = IPUntil.substring(1,index-1);
            let DNS = IPUntil.substring(index+1,IPUntil.length-1);
            let newUnitItem = [IP,DNS];
            IPArray.push(newUnitItem);
        }

        if (use_server_id.length > 0) {
            Api.connectServer(id, use_server_id[0]).then((res) => {
                if (res.status === 'ok' && res.data.consult_ip) {
                    //各种连接操作
                    vpnModule.prepare()
                        .then(() => {
                            vpnModule.startVpn(_sessionId, id,IPArray);
                            let _date = new Date();
                            this.state.gameFullInfo._timeReg = _date;
                            accelerateInfo[this.state.id] = this.state.gameFullInfo;
                            accelerateInfo[this.state.id]["speedup"] = "1";
                            this.state.gameFullInfo
                            console.log('JSON.stringify(accelerateInfo)',accelerateInfo);
                            AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                                this.setState({
                                    isAccelerate: true
                                });
                            });
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