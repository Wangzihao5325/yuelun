/**
 * BridgePage
 * Info:click and test the communication between local and react-native
 * Crate by Charlie on 2019-08-19
 * */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import * as BridgeDemo from '../Functions/NativeBridge/BridgeDemo';

export default class BridgePage extends Component {
    static navigationOptions = {
        title: 'BridgePage',
        headerStyle: {
          backgroundColor: '#F34966',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props);
        
        this.state = {
            dataID : '',
            callBackData:'',
        }
    }

    componentDidMount(){
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {'该部分是react-native对local进行调用的演示案例。通过Bridge可以桥接调用local。\n从而实现对本地数据库、API、三方的调用。并且可以获得返回值。'}
                </Text>
                <View style={{marginTop:100,marginLeft:50,marginRight:50,height:60}}>
                <Button
                    title='click local test Demo' 
                    color='blue'
                    onPress={()=>{
                        BridgeDemo.runTheLocalFunctionDemo((data)=>{
                            console.log('bridge------回调触发',data);
                            let strting = JSON.stringify(data);
                            this.setState({callBackData:strting});
                        });
                    }}
                />
                </View>
                {
                    this.state.callBackData === ''
                    ?
                    null
                    :
                    <Text>{'callback从local获得的数据\n'+this.state.callBackData}</Text>
                }
            </View>
        );
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