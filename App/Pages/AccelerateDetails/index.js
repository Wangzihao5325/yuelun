import React, { Component } from 'react';
import { StyleSheet, Button, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationService from '../../Router/NavigationService';
import { themeColor } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';
import StowPage from './StowPage';
import UnfoldPage from './UnfoldPage';

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
        Api.getGameInfoById(gameInfo.id, '').then((request) => {
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
        const { use_server_id, id } = this.state;

        let { accelerateInfo } = this.state;
        if (this.state.isAccelerate) {
            vpnModule.stopVPN();
            //各种断线操作
            delete accelerateInfo[this.state.id];
            AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                this.setState({
                    isAccelerate: false
                });
            });
        } else {

            if (use_server_id.length > 0) {
                Api.connectServer(id, use_server_id[0]).then((res) => {
                    if (res.status === 'ok' && res.data.consult_ip) {
                        //各种连接操作
                        vpnModule.prepare()
                            .then(() => {
                                
                                vpnModule.startVpn('162.14.5.205', "32091",res.data.consult_ip);
                                let _date = new Date();
                                this.state.gameFullInfo._timeReg = _date;
                                accelerateInfo[this.state.id] = this.state.gameFullInfo;
                                this.state.gameFullInfo
                                AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                                    this.setState({
                                        isAccelerate: true
                                    });
                                });
                            });
                    } else {
                        if(res.status === 'ok'){
                            NavigationService.alert(this.alertPayload("后台服务正忙，请重试"));
                        }else{
                            NavigationService.alert(this.alertPayload(res.msg));
                        }
                        
                    }
                })
            }
        }


        // const { use_server_id, id } = this.state;
        // if (use_server_id.length > 0) {
        //     Api.connectServer(id, use_server_id[0]).then((res) => {
        //         //  res.data
        //         //  consult_ip: "162.14.5.205"
        //         // consult_port: "32091"
        //         // entry_ip: "119.3.83.78"
        //         // reserve_ip: ""
        //         // route_ip_list: []
        //         // tcp_port: ["15880"]
        //         // timestamp: 1595862116
        //         // udp_port: ["15880"]

        //         console.log(res);
        //     })
        //}


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