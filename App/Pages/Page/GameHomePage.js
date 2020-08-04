/**
 * BridgePage
 * Info:click and test the communication between local and react-native
 * Crate by Charlie on 2019-08-19
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
    RefreshControl
} from 'react-native';
import { SCREEN_WIDTH, BannerWidth, BannerHeight } from '../../Config/UIConfig';
import GameHomeNavigation from '../../Components/Component/NavigationItem/GameHomeNavigation';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import GameUnitItem from '../../Components/Component/Game/GameUnitItem';
import GameTitleItem from '../../Components/Component/Game/GameTitleItem';
import GameNormalItem from '../../Components/Component/Game/GameNormalItem';

import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';

let testData = [
    { imageUrl: 'http://b.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf233e9732cb27eca8064388ffc.jpg' },
    { imageUrl: 'http://pic4.zhimg.com/v2-a328372a0afa2d242e048ce31d7ae2f7_b.jpg' },
    { imageUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151207280,533626736&fm=111&gp=0.jpg' }];

export default class acceleratorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectStatus: 1,
            isRefreshingStatus: false,

            allGame: {},
            overseasGames: {},
            upcomingGames: {},

            all_game_collection: [],
            all_game_hot: [],
            all_game_new: [],

            overseas_games: [],
            upcoming_games: [],

            bannerArray:[],

            collection_games_array : [],
        }
    }

    componentDidMount() {
        this.getTheBannerData();
        this.getAllGames();
        this.getTheCollectionGames();
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode='stretch'
                    source={require('../../resource/Image/GameHomePage/gameBack.png')}
                    style={{ marginTop: 0, marginLeft: 0, width: SCREEN_WIDTH, height: SCREEN_WIDTH / 375 * 200, alignItems: 'center', }}>
                    {this.renderTheNavigationBar()}
                    {this.renderTheBannerItem()}
                </ImageBackground>

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
                    }
                    style={{ marginTop: 50 }}>

                    {this.state.selectStatus == 1 ? this.renderTheAllGamePage() : null}
                    {this.state.selectStatus == 2 ? this.renderTheNormalGamePage() : null}
                    {this.state.selectStatus == 3 ? this.renderTheNormalGamePage() : null}
                </ScrollView>
            </View>
        );
    }

    renderTheNavigationBar = () => {
        return (
            <GameHomeNavigation
                selectStatus={this.state.selectStatus}
                selectedGameButton={(status) => { this.selectedGameItemButton(status) }}
                searchClickFunction={() => { this.clickTheSearchItemButton() }}
            />
        );
    }

    renderTheBannerItem = () => {
        return (
            <View style={styles.bannerRootView}>
                <CustomerSwiper borderRadius={10} super={this} bannerData={this.state.bannerArray} />
            </View>
        );
    }

    //渲染全部游戏页面
    renderTheAllGamePage = () => {
        return (
            <View>
                {this.renderTheGameSection(1, '精选游戏', require('../../resource/Image/GameHomePage/diamond.png'), this.state.all_game_collection)}
                {this.renderTheGameUnitSection(2, '热门游戏', require('../../resource/Image/GameHomePage/new.png'), this.state.all_game_hot)}
                {this.renderTheGameUnitSection(3, '最新游戏', require('../../resource/Image/GameHomePage/hot.png'), this.state.all_game_new)}
            </View>
        );
    }

    //渲染常规四列一纵的游戏页面
    renderTheNormalGamePage = () => {
        let dataArray = [];
        if (this.state.selectStatus == 2) {
            dataArray = this.state.overseas_games;
        } else if (this.state.selectStatus == 3) {
            dataArray = this.state.upcoming_games;
        }
        return (
            <View style={styles.normalRootViewStyle}>
                {this.renderTheNormalGameItems(dataArray)}
            </View>
        );
    }


    renderTheGameSection = (type = 0, title = '', iconSource = require('../../resource/Image/GameHomePage/diamond.png'), dataArray = []) => {
        return (
            <View style={{ marginLeft: 0, marginTop: 10, width: SCREEN_WIDTH, }}>
                <GameTitleItem
                    iconSource={iconSource}
                    title={title}
                    clickFunction={() => {
                        console.log('查看', title, '的更多');
                        this.clickTheMoreGamesButton(title);
                    }} />

                <ScrollView
                    contentContainerStyle={{ flexWrap: "nowrap" }}
                    height={dataArray.length <= 4 ? 100 : 200}
                    horizontal={true}
                    keyboardDismissMode='on-drag'
                >
                    {this.renderTheGanmeItems(type, dataArray)}
                </ScrollView>
            </View>
        );
    }

    renderTheGameUnitSection = (type = 0, title = '', iconSource = require('../../resource/Image/GameHomePage/diamond.png'), dataArray = []) => {
        return (
            <View style={{ marginLeft: 0, marginTop: 10, width: SCREEN_WIDTH, }}>
                <GameTitleItem
                    iconSource={iconSource}
                    title={title}
                    clickFunction={() => {
                        console.log('查看', title, '的更多');
                        let type_name = '国内';
                        let classification;
                        if(type == 1){
                            classification = '精选';
                        }else if(type == 2){
                            classification = '热门';
                        }else if(type == 3){
                            classification = '最新';
                        }
                        this.clickTheMoreGamesButton(title,type_name,classification,);
                    }} />

                <ScrollView
                    contentContainerStyle={{ flexWrap: "nowrap" }}
                    height={dataArray.length > 2 ? 270 : 135}
                    horizontal={true}
                    keyboardDismissMode='on-drag'
                >
                    {this.renderTheGanmeItems(type, dataArray)}
                </ScrollView>
            </View>
        );
    }

    /**
     * 渲染游戏列表展示区域
     * 
    */
    renderTheGanmeItems = (type = 0, dataArray = []) => {
        let gameItems;
        if (type == 1) {
            gameItems = [this.renderTheGameNormalUnitItem(dataArray)];
        } else {
            gameItems = [this.renderTheGameUnitItem(dataArray)];
        }
        return gameItems;
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
                    favorator={false} 
                    clickTheCollecButton={()=>{
                        this.saveTheCollectionGames(item['id']);
                    }}/>
            </View>
        );
    }

    /**
     * 渲染最新、热门游戏的UI布局
     * 
    */
    renderTheGameUnitItem = (dataArray = []) => {
        return (
            <View style={[styles.scrollViewStyleOne, { height: dataArray.length > 2 ? 270 : 135 }]}>
                {
                    dataArray.map((item, inedx) => {
                        return (
                            <View style={{ marginLeft: 10 }}>
                                <GameUnitItem
                                    key={inedx+200}
                                    nameText={item['name']}
                                    source={{ uri: item.icon }} 
                                    pressCallback={() => {this.clickGameNormalItemBtn(item)}}
                                />
                            </View>);
                    })
                }
            </View>
        );
    }

    /**
     * 渲染常规的游戏icon布局
     * 
    */
    renderTheGameNormalUnitItem = (dataArray = []) => {
        return (
            <View style={[styles.scrollViewStyleOne, { height: dataArray.length > 4 ? 200 : 100 }]}>
                {
                    dataArray.map((item, inedx) => {
                        return (
                            <View style={{ marginLeft: 5 }}>
                                <GameNormalItem
                                    key={inedx}
                                    title={item['name']}
                                    source={{ uri: item.icon }}
                                    pressCallback={() => {this.clickGameNormalItemBtn(item)}}
                                />
                            </View>);
                    })
                }
            </View>
        );
    }

    clickGameNormalItemBtn = (item) => {
        console.log("测试单个点击",item);
        let payload = { data: JSON.stringify(item) }
        navigator.jump(this, PageName.ACCELERATE_DETAILS_PAGE, payload);
    }

    selectedGameItemButton = (status = 0) => {
        console.log('statusstatus', status);
        this.setState({ selectStatus: status });
    }

    clickTheSearchItemButton = () => {
        navigator.jump(this, PageName.NORMAL_PAGE_SEARCH);
    }

    clickTheMoreGamesButton = (gameType = '') =>{
        navigator.jump(this, PageName.NORMAL_PAGE_GAME_MORE_PAGE,{title:gameType});
    }

    /**
     * 获取banner数据
     * 
    */
    getTheBannerData = () =>{
        ApiModule.getTheBannerData((data)=>{
            let bannerData = JSON.parse(data);
            let ad_list = bannerData.data.ad_list;
            console.log('return data',ad_list);
            let bannerList = [];
            for(let i = 0; i < ad_list.length;i++){
                let unitItem = ad_list[i];
                bannerUnit = {imageUrl:unitItem.image_url};
                bannerList.push(bannerUnit);
            }

            this.setState({bannerArray:bannerList});
        });
    }

    /**
     * 获取所有的游戏数据
    */
    getAllGames = () =>{
        ApiModule.getAllGameConfig('',(data)=>{
            let allGameData = JSON.parse(data);
            console.log('allGameDataallGameData',allGameData);
            this.parseAllGameData(allGameData);
        });
    }

    parseAllGameData = (allGameData) =>{
        //国服数据解析
        let all_game_collection = allGameData['data']['gameList'][1]['game_list']['精选'];
        let all_game_hot        = allGameData['data']['gameList'][1]['game_list']['热门'];
        let all_game_new        = allGameData['data']['gameList'][1]['game_list']['最新'];

        //外服数据解析
        let overseas_game_colloection = allGameData['data']['gameList'][2]['game_list']['精选'];
        let overseas_game_hot         = allGameData['data']['gameList'][2]['game_list']['热门'];
        let overseas_game_new         = allGameData['data']['gameList'][2]['game_list']['最新'];

        if (!overseas_game_colloection) overseas_game_colloection = [];
        if (!overseas_game_hot) overseas_game_hot = [];
        if (!overseas_game_new) overseas_game_new = [];
        let overseas_games = [];
        overseas_games.push(...overseas_game_colloection);
        overseas_games.push(...overseas_game_hot);
        overseas_games.push(...overseas_game_new);

        //解析即将上线
        let upcoming_game_collection = allGameData['data']['gameList'][0]['game_list']['精选'];
        let upcoming_game_hot        = allGameData['data']['gameList'][0]['game_list']['热门'];
        let upcoming_game_new        = allGameData['data']['gameList'][0]['game_list']['最新'];
        if (!upcoming_game_collection) upcoming_game_collection = [];
        if (!upcoming_game_hot)        upcoming_game_hot        = [];
        if (!upcoming_game_new)        upcoming_game_new        = [];
        let upcoming_games = [];
        upcoming_games.push(...upcoming_game_collection);
        upcoming_games.push(...upcoming_game_hot);
        upcoming_games.push(...upcoming_game_new);

        this.setState({
            all_game_collection: all_game_collection,
            all_game_hot: all_game_hot,
            all_game_new: all_game_new,
            overseas_games: overseas_games,
            upcoming_games: upcoming_games
        });
    }

    getTheCollectionGames = () =>{
        let sessionID = 'd6eb14382b7bd59a5d9b2557b1589fd510b4e2f1';
        ApiModule.getAllUserCollectGames(sessionID,(data)=>{
            let collections = JSON.parse(data);
            console.log('collect data',collections);
        });
    }

    saveTheCollectionGames = (gameID = '') =>{
        let sessionID = 'd6eb14382b7bd59a5d9b2557b1589fd510b4e2f1';
        let gameIDArray = [];
        gameIDArray.push(gameID);
        ApiModule.YuelunSverCollection(sessionID,gameIDArray,(data)=>{
            let collections = JSON.parse(data);
            console.log('save collect data',collections);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00132D'
    },
    bannerRootView: {
        marginTop: 20,
        width: BannerWidth,
        height: BannerHeight,
    },
    scrollViewStyle: {
        height: 270,
        justifyContent: 'space-around',
        marginLeft: 10.5
    },
    scrollViewStyleOne: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    normalItemRootCell: {
        height: 100,
        marginTop: 10,
        alignItems: 'center'
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