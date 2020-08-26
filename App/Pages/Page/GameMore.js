/**
 * More Game Page
 * Info:click and test the communication between local and react-native
 * */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    RefreshControl,
} from 'react-native';
import CustomeListView from '../../Components/Component/CustomeListView';
import { SCREEN_WIDTH, NavigatorBarHeight, NavigatorTop, NavigatorViewHeight } from '../../Config/UIConfig';
import GameHomeNavigation from '../../Components/Component/NavigationItem/GameHomeNavigation';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import GameUnitItem from '../../Components/Component/Game/GameUnitItem';
import GameTitleItem from '../../Components/Component/Game/GameTitleItem';
import GameNormalItem from '../../Components/Component/Game/GameNormalItem';

import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';

export default class GameMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNo: 0,
            selectStatus: 1,
            isRefreshingStatus: false,

            allGame: {},
            overseasGames: {},
            upcomingGames: {},

            more_games: [],

            type_name: '',
            classification: '',
        }
    }

    componentDidMount() {
        const { title, type_name, classification } = this.props.route.params;
        this.props.navigation.setOptions({
            title: title ? title : '',
            type_name: type_name ? type_name : '',
            classification: classification ? classification : ''
        });

        this.getTheMoreGamesData(type_name, this.state.pageNo, classification);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    onMomentumScrollEnd={this._contentViewScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshingStatus}
                            onRefresh={() => {
                                this.setState({ isRefreshingStatus: false });
                            }}
                            colors={['red', 'blue', 'green']}
                            progressBackgroundColor='#ffff00'
                            enabled={true}
                        />
                    }>
                    {this.renderTheNormalGamePage()}
                </ScrollView>
            </View>
        );
    }
    _contentViewScroll = (e) => {

        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度


        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            this.loadMore();
        } else if (offsetY + oriageScrollHeight <= 1) {
            //   这个是没有数据了然后给了false得时候还在往上拉
        } else if (offsetY == 0) {
            //这个地方是下拉刷新，意思是到顶了还在指行，可以在这个地方进行处理需要刷新得数据
            //  console.log('下啦');
        }
    }

    loadMore = () => {

        const { type_name, classification } = this.props.route.params;
        let pageNum = this.state.pageNo + 1;
        this.setState({ pageNo: pageNum });
        console.log('下啦', this.state.pageNo);
        this.getTheMoreGamesData(type_name, pageNum, classification);
        // const {type_name,classification } = this.props.route.params;
        // this.getTheMoreGamesData(type_name,classification);
    }

    //渲染常规四列一纵的游戏页面
    renderTheNormalGamePage = () => {
        return (
            <View style={styles.normalRootViewStyle}>
                {this.renderTheNormalGameItems(this.state.more_games)}
            </View>
        );
    }

    renderTheNormalGameItems = (dataArray = []) => {
        let unitItems = [];

        dataArray.map(renderNormalCell = (item, index) => {
            let unitItem = this.renderTheNormalGameItem(item, index);
            unitItems.push(unitItem);
        });

        return unitItems;
    }

    renderTheNormalGameItem = (item, index) => {
        let unitWidth = SCREEN_WIDTH / 4;
        return (
            <View style={[styles.normalItemRootCell, { width: unitWidth }]}>
                <GameNormalItem
                    index={index}
                    source={{ uri: item.icon }}
                    title={item['name']}
                    favorator={false}
                    pressCallback={() => { this.clickGameNormalItemBtn(item) }}
                />
            </View>
        );
    }

    getTheMoreGamesData = (type_name, page, classification) => {
        let pageNumber = page;
        pageNumber = pageNumber.toString();
        ApiModule.getSearchGamesData('', '', type_name, pageNumber, classification)
            .then((result) => {
                let allGameData = result;
                console.log('hahahahhahahahah', allGameData);
                if (allGameData['status'] == 'ok') {
                    let allData = this.state.more_games;
                    let dataList = allGameData['data']['list'];
                    allData = allData.concat(dataList);
                    this.setState({
                        more_games: allData
                    });
                }
            });
    }

    clickGameNormalItemBtn = (item) => {
        console.log("测试单个点击", item);
        let payload = { data: JSON.stringify(item) }
        navigator.jump(this, PageName.ACCELERATE_DETAILS_PAGE, payload);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00132D'
    },
    normalRootViewStyle: {
        marginLeft: 0,
        marginTop: 0,
        width: SCREEN_WIDTH,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
});