/**
 * custome flatlist view component
 * 
 * Creat by charlie
 * 
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    Text,
    RefreshControl,
    View,
} from 'react-native';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';

export default class CustomeListView extends Component {
    pageNum = 0; //默认页数
    freashStatus = false;  //刷新状态，若为YES表示正在刷新未取得回调，过滤此后请求；若为NO，表示可正常触发请求数据

    constructor(props) {
        super(props);

        this.state = {
            dataArray: this.props.data ? this.props.data : [],
            isRefreshing: this.props.autoFreshing ? this.props.autoFreshing : false,
            notSupportLoadMore: this.props.notSupportLoadMore ? this.props.notSupportLoadMore : false,
            showHearder: this.props.showHearder ? this.props.showHearder : false,
            showFooter: this.props.showFooter ? this.props.showFooter : false,
            showSeparator: this.props.showSeparator ? this.props.showSeparator : false
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            dataArray: props.data ? props.data : []
        }
    }

    render() {
        return (
            <FlatList
                style={styles.flatlistStyle}
                data={this.state.dataArray}
                renderItem={this.props.renderItem}
                ItemSeparatorComponent={this.renderTheSeparatorLine}
                ListEmptyComponent={this.renderTheEmptyViewItem}
                ListHeaderComponent={this.renderTheHeaderItem}
                ListFooterComponent={this.renderTheFooterItem}
                onEndReached={() => { this._onEndReached() }}
                onEndReachedThreshold={0.1} /** 滑动到距离底部x单元时，触发onEndReached函数 */
                refreshControl={this.renderTheHeaderFreashItem()}
                refreshing={this.state.isRefreshing}
            />
        );
    }

    /** 渲染分割线 */
    renderTheSeparatorLine = () => {
        if (!this.state.showSeparator) return null;
        return (
            <View style={styles.separatorLineStyle}></View>
        );
    }

    /** 渲染数据为空时展示数据 */
    renderTheEmptyViewItem = () => {
        return (
            <View style={styles.emptyViewStyle}>
                <Text style={styles.textStyle}>当前数据为空</Text>
            </View>
        );
    }

    /** 渲染头部组建 */
    renderTheHeaderItem = () => {
        if (!this.state.showHearder) return null;
        return (
            <View style={styles.listComponentStyle}>
                <Text style={styles.textStyle}>header item</Text>
            </View>
        );
    }

    /** 渲染尾部组建 */
    renderTheFooterItem = () => {
        if (!this.state.showFooter) return null;
        return (
            <View style={styles.listComponentStyle}>
                <Text style={styles.textStyle}>footer item</Text>
            </View>
        );
    }

    /** 渲染下拉刷新的组件 */
    renderTheHeaderFreashItem = () => {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                tintColor="gray"
                title="正在刷新"
                onRefresh={() => { this._onRefresh() }}
            />
        );
    }

    /** 下拉刷新执行函数 */
    _onRefresh = () => {
        if (!this.props.asyncFunc){
            return;
        }

        if (this.freashStatus) {
            console.log('触发下拉刷新---过滤');
            return;
        };
        console.log("触发下拉刷新---顶部刷新");
        this.pageNum = 1;
        this.freashStatus = true;
        this.setState({ isRefreshing: true });
        if (this.props.asyncFunc) {
            this.props.asyncFunc(this.pageNum);
        }
    }

    /** 上拉加载执行函数 */
    _onEndReached = () => {
        if (this.state.notSupportLoadMore) {
            return;
        }

        if (this.freashStatus) {
            console.log('触发下拉刷新---过滤');
            return;
        };
        console.log('触发下拉刷新');
        this.pageNum++;
        this.freashStatus = true;
        if (this.props.asyncFunc) {
            this.props.asyncFunc(this.pageNum);
        }
    }

    /** 成功获取数据，刷新列表 */
    asyncSuccess = (data, index = 1) => {
        console.log('触发下拉刷新-----请求第---组件接收的数据长度' + data.length + '第' + index + '页');
        this.freashStatus = false;
        if (index == 1) {
            this.setState({
                dataArray: data,
                isRefreshing: false
            });
        } else {
            let dataArray = this.state.dataArray;
            dataArray.push(...data);
            this.setState({ dataArray: dataArray });
        }
    }

    /** 获取数据失败 */
    asyncFail = () => {
        this.freashStatus = false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    flatlistStyle: {
        marginTop: 0,
        marginLeft: 0,
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: '#00132D'

    },
    textStyle: {
        fontSize: 30,
        color: 'black',
    },
    separatorLineStyle: {
        width: SCREEN_WIDTH,
        height: 1,
        backgroundColor: 'green',
    },
    emptyViewStyle: {
        marginTop: 0,
        marginLeft: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    listComponentStyle: {
        width: SCREEN_WIDTH,
        height: 50,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
