import React, { Component } from 'react';
import {
    Button,
    Text,
    View,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { test_add, test_min } from '../../store/actions/testAction';
import store from '../../store/index';

class ThirdPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Button title='+' onPress={this.add}/>
                <Text>{`${this.props.num}`}</Text>
                <Button title='-' onPress={this.min}/>
            </View>
        );
    }

    add = () => {
        store.dispatch(test_add());
    }

    min = () => {
        store.dispatch(test_min());
    }
}

function mapState2Props(store) {
    return {
        num: store.test.num
    }
}

export default connect(mapState2Props)(ThirdPage);


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