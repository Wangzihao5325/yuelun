import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { themeColor } from '../../Config/UIConfig';


import { SafeAreaView } from 'react-native-safe-area-context';

export default class ChangeNickName extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            </SafeAreaView>
        );
    }
}