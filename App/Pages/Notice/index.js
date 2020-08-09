import React, { Component } from 'react';
import { View, FlatList, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { themeColor, SCREEN_WIDTH, fontSize } from '../../Config/UIConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import _ from 'lodash';
import * as NavigationService from '../../Router/NavigationService';
import PageName from '../../Config/PageName';
/*item={
    add_time: "1579762036"
    title: "月轮悄悄地塞给你一个红包"
    title_color: ""
    url: "https://www.yuelun.com/news/content?id=234"
}*/
const Item = (props) => {
    let time = new Date(parseInt(props.add_time) * 1000);
    return (
        <View style={styles.itemContainer}>
            <TouchableHighlight onPress={props.callback}>
                <View style={styles.itemViewContainer}>
                    {/* {props.isNew && <View style={styles.redPoint} />} */}
                    <Text
                        style={styles.itemTitle}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >{`${props.title}`}</Text>
                    <Text style={styles.itemTime}>{`${time.toLocaleString()}`}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default class Notice extends Component {
    state = {
        page: 1,
        limits: 15,
        data: []
    }

    componentDidMount() {
        Api.getNewsList(`${this.state.page}`, `${this.state.limits}`)
            .then((res) => {
                let dataArr = res.data.list;
                this.setState({
                    data: dataArr,
                    page: res.data.page
                });
            })
    }
    render() {
        const { bgColor } = themeColor;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: bgColor, paddingTop: 0 }}>
                <FlatList style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item {...item} callback={() => this.itemPress(item)} />}
                    keyExtractor={(item) => item.add_time}
                    onEndReachedThreshold={0.2}
                    onEndReached={this.pageAdd}
                />
            </SafeAreaView>
        );
    }

    pageAdd = () => {
        Api.getNewsList(`${++this.state.page}`, `${this.state.limits}`)
            .then((res) => {
                let dataArr = res.data.list;
                this.setState({
                    data: [...this.state.data, ...dataArr],
                    page: res.data.page
                });
            })
    }

    itemPress = (item) => {
        NavigationService.jump(this, PageName.NORMAL_NOTICE_WEB, { url: item.url });
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