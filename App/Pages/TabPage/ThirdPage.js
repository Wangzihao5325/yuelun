import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';

export default class ThirdPage extends Component {

    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});