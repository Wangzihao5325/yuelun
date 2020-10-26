import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default class AcceleratingProgress extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.pop()
        }, 5000)
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={styles.container}>
                    <Text style={{ color: '#fff' }}>正在加速中</Text>
                </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00132D'
    }
})