import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export default class AcceleratingProgress extends Component {
    constructor(props) {
        super(props)
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.spin();
        // setTimeout(() => {
        //     this.props.navigation.pop()
        // }, 5000)
    }

    componentWillUnmount() {
        if (this.spinValue) {
            this.spinValue.stopAnimation()
        }
    }

    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue, {
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 10000,
            easing: Easing.linear
        }).start(() => this.spin())
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        })
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <View style={styles.container}>
                    <Animated.View style={{ height: 250, width: 250, transform: [{ rotate: spin }] }}>
                        <LinearGradient colors={['#4c669f', '#192f6a', '#4c669f']} style={styles.linearGradient}>
                            <View style={styles.wrapper}>

                            </View>
                        </LinearGradient>
                    </Animated.View>
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
    },
    linearGradient: {
        height: 250,
        width: 250,
        borderRadius: 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        height: 246,
        width: 246,
        borderRadius: 123,
        backgroundColor: '#00132D'
    }
})