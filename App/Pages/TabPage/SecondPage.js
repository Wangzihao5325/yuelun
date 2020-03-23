import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';

let testData = [
    { imageUrl: 'http://b.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf233e9732cb27eca8064388ffc.jpg' },
    { imageUrl: 'http://pic4.zhimg.com/v2-a328372a0afa2d242e048ce31d7ae2f7_b.jpg' },
    { imageUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151207280,533626736&fm=111&gp=0.jpg' }];

export default class SecondPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 360 / 750 }}>
                    <CustomerSwiper super={this} bannerData={testData} />
                </View>
                <Text style={styles.welcome}>
                    第二页
                </Text>
            </View>
        );
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
    }
});