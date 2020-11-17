/**
 * BridgePage
 * Info:click and test the communication between local and react-native
 * Crate by Charlie on 2019-08-19
 * */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

import * as demoApi from '../Functions/Network/API/DemoApi';
import * as UIConfig from '../Config/UIConfig';
import * as Test from '../Functions/Network/ApiTest';

export default class NetworkPage extends Component {
    static navigationOptions = {
        title: 'NetworkPage',
        headerStyle: {
            backgroundColor: '#F34966',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        networkData: '',
        requestType: '',
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {'该部分是网络请求的演示demo。'}
                </Text>
                <View style={{ marginTop: 50, marginLeft: 50, marginRight: 50, height: 60, backgroundColor: 'green', width: UIConfig.SCREEN_WIDTH - 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        title='netDemo'
                        color='white'
                        onPress={() => {
                            this.getTestFunction();
                        }}
                    />
                </View>
                <View style={{ marginTop: 20, marginLeft: 50, marginRight: 50, height: 60 }}>
                    <Button
                        title='postDemo'
                        color='blue'
                        onPress={() => {
                            this.getThePostTypeDemoFunction();
                        }}
                    />
                    <Button
                        title='_test'
                        color='green'
                        onPress={() => {
                            this._pending();
                        }}
                    />
                </View>
                {
                    this.state.networkData === ''
                        ?
                        null
                        :
                        <Text style={{ textAlign: 'center' }}>{'网络请求获取的数据reject\n网络请求类型\n' + this.state.requestType + '\n获得的数据：\n' + this.state.networkData}</Text>
                }
            </View>
        );
    }

    _pending = async () => {
        let aaa = await demoApi.getTheDemoDataByAsync().catch((error) => {
        });
        this.setState({
            requestType: 'GET',
            networkData: JSON.stringify(aaa)
        });
    }

    getTestFunction = () => {
        demoApi.getTheDemoData().then(response => {
            this.setState({
                requestType: 'GET',
                networkData: JSON.stringify(response)
            });
        }, (error) => {
        }).catch(e => {
        });
    }

    getThePostTypeDemoFunction = () => {
        demoApi.postTheDemoData().then(response => {
            this.setState({
                requestType: 'POST',
                networkData: JSON.stringify(response)
            });
        }, (error) => {
        }).catch(e => {
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});