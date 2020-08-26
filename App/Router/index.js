import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, navigate } from './NavigationService';
import PageName from '../Config/PageName';
import store from '../store';
import { connect } from 'react-redux';
import { login_user_info_init } from '../store/actions/userAction';
import { init_can_scroll, app_login, app_start_app } from '../store/actions/appAction';
import { getTheUserInforWithSessionID, _unsafe_setSession } from '../Functions/NativeBridge/ApiModule';

import InitPage from '../Pages/InitPage';
import Login from '../Pages/Login';
import ModalStack from './ModalStack';
//import DrawerStack from './DrawerStack';
class Root extends Component {
    componentDidMount() {
        AsyncStorage.getItem('isFirstUse').then(useValue => {
            if (!useValue) {
                AsyncStorage.setItem('isFirstUse', 'done');
                store.dispatch(init_can_scroll());
            } else {
                AsyncStorage.getItem('userInfo').then(value => {
                    if (value) {
                        let userData = JSON.parse(value);
                        let sessionId = userData.data.session_id;
                        if (sessionId) {
                            _unsafe_setSession(sessionId);
                            //使用本地token来获取用户信息，以此验证token的有效性
                            getTheUserInforWithSessionID().then((res) => {
                                if (res.status == 'ok') {
                                    store.dispatch(login_user_info_init({
                                        ...userData.data,
                                        mobile: res.data.tel,
                                        username: res.data.username,
                                        package_name: res.data.package_name,
                                        package_end_time: res.data.package_end_time
                                    }));
                                    store.dispatch(app_start_app());
                                } else {
                                    //自动登录失败，跳转登录界面
                                    store.dispatch(app_login());
                                }
                            })
                        } else {
                            store.dispatch(app_login());
                        }
                    } else {
                        store.dispatch(app_login());
                    }
                }).catch(reason => {
                    store.dispatch(init_can_scroll());
                });
            }
        })
    }

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
