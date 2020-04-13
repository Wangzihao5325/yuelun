import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import ProgressRate from '../Components/Component/ProgressRate';

export default class ProgressRatePage extends PureComponent {
    render() {
        return (
            <SafeAreaView style={Styles.safeArea}>
                <ProgressRate
                    value={50}
                />
            </SafeAreaView>
        );
    }
}

const Styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});