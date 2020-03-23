import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    console
} from 'react-native';
import * as navigator from '../Router/NavigationService';


export default class pushPage extends Component {
    static navigationOptions = {
        title: 'pushPage',
        headerStyle: {
            backgroundColor: '#F34966',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);

        this.state = {
            dataID: ''
        }
    }

    componentDidMount() {
        const { dataID } = this.props.route.params;
        this.setState({
            dataID
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    跳转
                </Text>
                {
                    this.state.dataID === ''
                        ?
                        <Text>暂无参数从父页面传递进入</Text>
                        :
                        <Text>{'传递入参dataID：' + this.state.dataID}</Text>
                }
                <Button
                    title='click to run the root block'
                    onPress={() => {
                        const { backClock = null } = this.props.route.params;
                        backClock && backClock('backData：test');
                    }}
                />
                <Button
                    title='goback'
                    onPress={() => {
                        navigator.back(this);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});