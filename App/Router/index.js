import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import { connect } from 'react-redux';

import InitPage from '../Pages/InitPage';
import Login from '../Pages/Login';
import ModalStack from './ModalStack';
//import DrawerStack from './DrawerStack';
class Root extends Component {
    render() {
        if (!this.props.isInit) {
            /** InitPage负责App的初始化 */
            return (
                <InitPage />
            );
        } else if (!this.props.isLogin) {
            // return (
            //     <Login />
            // );
            return (
                <NavigationContainer ref={navigationRef}>
                    <ModalStack />
                </NavigationContainer>
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
        isLogin: store.app.isLogin
    }
}

export default connect(mapState2Props)(Root);
