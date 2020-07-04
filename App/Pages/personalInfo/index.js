import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColor } from '../../Config/UIConfig';
export default class PersonalInfo extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
                <View style={{ flex: 1 }}>
                    <Text>123456</Text>
                </View>
            </SafeAreaView>
        );
    }
}