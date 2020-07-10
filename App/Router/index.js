import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import InitPage from '../Pages/InitPage';
import ModalStack from './ModalStack';
import DrawerStack from './DrawerStack';   

export default class Root extends Component {

    state = {
        /** 是否初始化完毕,redux引入后以redux state替换 */
        initDone: false
    }

    componentDidMount() {
        /** 模拟初始化过程(该过程应在InitPage内) */
        // setTimeout(() => {
        //     this.setState({ initDone: true });
        // }, 2000);
    }

    render() {
        if (this.state.initDone) {
            return (
                <NavigationContainer ref={navigationRef}>
                    <ModalStack />
                </NavigationContainer>
            );
        } else {
            /** InitPage负责App的初始化 */
            return (
                <InitPage />
            );
        }
    }
}