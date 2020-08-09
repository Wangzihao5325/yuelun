import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutUs extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <View style={{ alignSelf: 'center',marginTop:20 }}>
                    <Icon name='twitter' size={80} color="#666" />
                </View>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>V1.0</Text>
                <Text style={{ color: 'white', marginHorizontal: 15, marginTop: 20,alignSelf:'center',fontSize:20 }}>开启月轮，进入流畅游戏新世代</Text>
                <Text style={{ color: 'white', marginHorizontal: 15, marginTop: 20,alignSelf:'center' }}>极致自研加速引擎 · 低延迟全球链路覆盖</Text>
            </SafeAreaView>
        );
    }
}