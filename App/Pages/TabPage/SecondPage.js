import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import * as Api from '../../Functions/NativeBridge/ApiModule';

let testData = [
    { imageUrl: 'http://b.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf233e9732cb27eca8064388ffc.jpg' },
    { imageUrl: 'http://pic4.zhimg.com/v2-a328372a0afa2d242e048ce31d7ae2f7_b.jpg' },
    { imageUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151207280,533626736&fm=111&gp=0.jpg' }];

export default class SecondPage extends Component {
    state = {
        text: '1234'
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 360 / 750 }}>
                    <CustomerSwiper super={this} bannerData={testData} />
                </View>
                <Text style={styles.welcome}>
                    {`${this.state.text}`}
                </Text>
                <Button
                    title='请求-发送二维码'
                    style={[styles.button]}
                    onPress={this.sendCode}
                />
                <Button
                    title='请求-首页'
                    style={[styles.button]}
                    onPress={this.login}
                />
            </View>
        );
    }

    sendCode = async () => {
        // let request = await Api.sendPhoneCode('18700875325');
        // this.setState({
        //     text: request
        // });
        Api.search('王者荣耀','','').then((res)=>{
            console.log(res);
        });
    }

    login = async () => {
        let request = await Api.getAllGameConfig('77b727bf68656d1696e1710976bb40a6deb7fc23', '');
        console.log(request);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        height: 50,
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'blue'
    },
});