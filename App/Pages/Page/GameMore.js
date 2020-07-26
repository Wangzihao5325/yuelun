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
import { SCREEN_WIDTH, NavigatorBarHeight,NavigatorTop,NavigatorViewHeight} from '../../Config/UIConfig';
import GameHomeNavigation from '../../Components/Component/NavigationItem/GameHomeNavigation';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import GameUnitItem from '../../Components/Component/Game/GameUnitItem';
import GameTitleItem from '../../Components/Component/Game/GameTitleItem';
import GameNormalItem from '../../Components/Component/Game/GameNormalItem';

import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';
import * as mock_home from '../../Mock/home';

export default class GameMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectStatus: 1,
            isRefreshingStatus: false,

            allGame: {},
            overseasGames: {},
            upcomingGames: {},

            more_games: [],
        }
    } 

    componentDidMount() {
        //外服数据解析
        let overseas_game_colloection = mock_home['default']['data']['gameList'][2]['game_list']['精选'];
        let overseas_game_hot = mock_home['default']['data']['gameList'][2]['game_list']['热门'];
        let overseas_game_new = mock_home['default']['data']['gameList'][2]['game_list']['最新'];
        if (!overseas_game_colloection) overseas_game_colloection = [];
        if (!overseas_game_hot) overseas_game_hot = [];
        if (!overseas_game_new) overseas_game_new = [];
        let overseas_games = [];
        overseas_games.push(...overseas_game_colloection);
        overseas_games.push(...overseas_game_hot);
        overseas_games.push(...overseas_game_new);

        this.setState({
            isRefreshingStatus:false,
            more_games: overseas_games
        });

        const { title } = this.props.route.params;
        this.props.navigation.setOptions({
            title:title?title:'',
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView 
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
                    showFavoratorIcon={true}
                    favorator={false} />
            </View>
        );
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