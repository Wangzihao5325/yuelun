import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { themeColor, SCREEN_WIDTH, fontSize } from '../../Config/UIConfig';


import { SafeAreaView } from 'react-native-safe-area-context';

const TestData = [
    {
        title: '上官网，领取神秘大奖1',
        time: '2020-09-09 16:20:01',
        isNew: false
    },
    {
        title: '上官网，领取神秘大奖2',
        time: '2020-09-09 16:20:02',
        isNew: false
    },
    {
        title: '上官网，领取神秘大奖3',
        time: '2020-09-09 16:20:03',
        isNew: true
    }
];

/*item={
    title:string,
    time:string,
    isNew:boolean
}*/
const Item = (props) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableHighlight onPress={props.callback}>
                <View style={styles.itemViewContainer}>
                    {props.isNew && <View style={styles.redPoint} />}
                    <Text style={styles.itemTitle}>{`${props.title}`}</Text>
                    <Text style={styles.itemTime}>{`${props.time}`}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default class Notice extends Component {
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <FlatList style={{ flex: 1 }}
                    data={TestData}
                    renderItem={({ item }) => <Item {...item} callback={() => this.itemPress(item)} />}
                />
            </SafeAreaView>
        );
    }

    itemPress = (item) => {
        console.log(item);
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 70,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    itemViewContainer: {
        height: 60,
        width: SCREEN_WIDTH - 30,
        backgroundColor: '#031d3d',
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    itemTitle: {
        color: 'white',
        fontSize: 17
    },
    itemTime: {
        marginTop: 5,
        color: '#666'
    },
    redPoint: {
        position: 'absolute',
        top: 6,
        right: 8,
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: 'red'
    }
});