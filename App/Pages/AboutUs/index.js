import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { themeColor } from '../../Config/UIConfig';

import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AboutUs extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <View style={{ alignSelf: 'center' }}>
                    <Icon name='twitter' size={80} color="#666" />
                </View>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>V1.0</Text>
                <Text style={{ color: 'white', marginHorizontal: 15, marginTop: 20 }}>说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字</Text>
            </SafeAreaView>
        );
    }
}