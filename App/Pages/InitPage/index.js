import React, { Component } from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class InitPage extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <SafeAreaView
                style={styles.safe}
            >
                <Text>top</Text>
                <Text>loading!</Text>
                <Text>bottom</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});