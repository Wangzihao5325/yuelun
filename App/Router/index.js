import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import InitPage from '../Pages/InitPage';
import ModalStack from './ModalStack';
//import DrawerStack from './DrawerStack';
import { connect } from 'react-redux';
import store from '../store';

class Root extends Component {
    render() {
        if (this.props.isInit) {
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

function mapState2Props(store) {
    return {
        isInit: store.app.isInit
    }
}

export default connect(mapState2Props)(Root);
