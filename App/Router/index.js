import React, { Component } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { connect } from 'react-redux';
import { HeartParams } from '../store/actions/userAction';
import store from '../store/index';
import * as ApiModule from '../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../Functions/NativeBridge/YuelunVpn';
import VpnStateUtil from '../Functions/Util/vpnStateUtil'

import InitPage from '../Pages/InitPage';
import ModalStack from './ModalStack';
//import DrawerStack from './DrawerStack';
class Root extends Component {

    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        let { stepReg, heartBeatTimer } = HeartParams;
        if (
            AppState.currentState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            let isLogin = store.getState().user.isLogin
            if (isLogin && !heartBeatTimer && stepReg && typeof stepReg == 'number') {
                heartBeatTimer = setInterval(() => {
                    ApiModule.checkHeart('', '').then(async (result) => {
                        if (result.status === 'ok') {
                            if (result.data.type === 'normal') {

                            } else if (result.data.type === 'logout') {
                                let { isAppAccele } = await VpnStateUtil(null, -1);
                                if (isAppAccele) {
                                    vpnModule.stopVPN();
                                }
                                store.dispatch(logout_user_info_clear());
                            } else if (result.data.type === 'break') {

                            } else if (result.data.type === 'close') {
                                let { isAppAccele } = await VpnStateUtil(null, -1);
                                if (isAppAccele) {
                                    vpnModule.stopVPN();
                                }
                            }
                        }
                    });
                }, stepReg)
            }
        } else if (AppState.currentState === 'active' && nextAppState.match(/inactive|background/)) {
            if (heartBeatTimer) {
                clearInterval(heartBeatTimer)
                heartBeatTimer = null
            }
        }
    };

    render() {
        if (this.props.isInit) {
            /** InitPage负责App的初始化 */
            return (
                <InitPage scrollEnabled={this.props.isInitPageScrollenabled} />
            );
        } else {
            return (
                <NavigationContainer ref={navigationRef}>
                    <ModalStack />
                </NavigationContainer>
            );
        }
    }
}

function mapState2Props(store) {
    return {
        isInit: store.app.isInit,
        isLogin: store.app.isLogin,
        isInitPageScrollenabled: store.app.isInitPageScrollenabled
    }
}

export default connect(mapState2Props)(Root);
