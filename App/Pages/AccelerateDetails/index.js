import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import StowPage from './StowPage';
import UnfoldPage from './UnfoldPage';

export default class AccelerateDetails extends Component {
    state = {
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
            console.log(request);
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
            this.setState({
                ...request.data.game_info
            });
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
                    />
                }
                {this.state.pageType === 'unfold' &&
                    <UnfoldPage
                        pageTypeChange={this.pageTypeChange}
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
        if (use_server_id.length > 0) {
            Api.connectServer(id, use_server_id[0]).then((res) => {
                /** res.data
                 * consult_ip: "162.14.5.205"
                consult_port: "32091"
                entry_ip: "119.3.83.78"
                reserve_ip: ""
                route_ip_list: []
                tcp_port: ["15880"]
                timestamp: 1595862116
                udp_port: ["15880"]
                 */
                console.log(res);
            })
        }
    }
}