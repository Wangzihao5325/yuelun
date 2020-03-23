import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class ModalWraper extends Component {
    render() {
        return (
            <SafeAreaView
                style={styles.safe}
            >
                <Text style={{ color: 'white' }}>top</Text>
                <Text style={{ color: 'white' }}>modal wrapper-下拉关闭!</Text>
                <Text style={{ color: 'white' }}>bottom</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});