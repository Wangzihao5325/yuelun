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
    Keyboard,
    AsyncStorage,
    Modal
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';
import * as mock_home from '../../Mock/home';
import * as UIConfig from '../../Config/UIConfig';
import GameNormalItem from '../../Components/Component/Game/GameNormalItem';
import SearchNavigator from '../../Components/Component/Game/SearchNavigator';
import * as navigator from '../../Router/NavigationService';
import { TextInput } from 'react-native-gesture-handler';

const NoramType  = 1;
const searchType = 2;

export default class search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            hotGames:[],
            resultGames:[],
            searchText:'',
            pageType:NoramType,
            searchHistory:[],
            test:false
        }
    }

    componentWillMount () {
    }

    componentWillUnmount () {
        
    }

    componentDidMount(){
       const { params } = this.props.route.params;

       //模拟数据
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
       this.setState({hotGames:overseas_games});

       this.loadTheSearchHistoryData();
    }

    render() {
        return (
            <View>
                <SearchNavigator
                    searchText = {this.state.searchText}
                    changeTheTextFunction = {(text)=>{this.setState({searchText:text});}}
                    onEndEditing = {()=>{
                        this.setState({pageType:searchType});
                        this.clickTheHistoryTextAndSearch(this.state.searchText);
                        console.log('搜索',this.state.searchText);}}
                    cancleFunction = {()=>{
                        navigator.back(this);
                    }}
                />
            <ScrollView style={[styles.scrollRoot,{height:SCREEN_HEIGHT - UIConfig.NavigatorViewHeight}]}>
                {this.renderThePageView()}
            </ScrollView>

            <Modal 
                transparent={true}
                visible={this.state.test}
                onRequestClose={() => this.hide(false)}>
                    <TouchableOpacity 
                        onPress={()=>{this.setState({test:false})}}
                       style={{marginLeft:0,marginRight:0,width:SCREEN_WIDTH,height:SCREEN_HEIGHT,backgroundColor:'rgba(23,23,23,0.5)'}}>
                           <View style={{width:SCREEN_WIDTH,height:91.5,backgroundColor:'white',marginTop:(SCREEN_HEIGHT/2 - 50)}}>
                           <Text style={{color:'#333333',fontSize:14,marginTop:16,marginLeft:18.5}}>请提交想要加速的游戏</Text>
                           <TextInput style={{marginLeft:20,marginTop:12,height:35,width:250,backgroundColor:'#E5E5E5'}}/>
                           </View>
                    </TouchableOpacity>
            </Modal>
            </View>
        );
    }

    renderThePageView = () =>{
        if(this.state.pageType == NoramType){
            return(
                <View style={styles.container}>
                    {this.renderTheSearchHistorySection()}
                    {this.hotGamesSection()}
                </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    {this.renderTheSearchResultSection()}
                </View>
            );
        }
    }


    renderTheSearchHistorySection = () =>{
        if(this.state.searchHistory.length == 0){
            return null;
        }
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH}}>
                <View style={styles.searchRootView}>
                    <Text style={styles.searchText}>搜索历史</Text>
                    <TouchableOpacity onPress={()=>{this.clearAllSearchHistory()}}>
                        <Image style={styles.clearIconStyle}/>
                    </TouchableOpacity>
                </View>
                {this.renderTheHistoryTextSection()}
            </View>
        );
    }

    renderTheHistoryTextSection = () =>{
        let weakThis = this;
        return(
            <View style={styles.searchHistoryRoot}>
                {
                    this.state.searchHistory.map((renderNormalCell = (item, index) => {
                       return weakThis.renderTheHistoryTagItem(item)
                    }))
                }
            </View>
        );
    }

    renderTheSearchResultSection = () =>{
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH,alignItems:'center'}}>
                <View style={styles.normalRootViewStyle}>
                    {this.renderTheHotGamesSection()}
                </View>
                <Text style={{fontSize:14,color:'white',marginTop:54}}>找不到想要加速的游戏？</Text>
                <TouchableOpacity 
                    style={{width:155,height:33,borderRadius:17,backgroundColor:'#F5CC00',justifyContent:'center',alignItems:'center',marginTop:8}}
                    onPress={()=>{
                        this.setState({test:true});
                    }}>
                    <Text style={{color:'#503000',fontSize:14}}>告诉我们</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderTheHistoryTagItem = (historyText='',key) =>{
        return(
            <TouchableOpacity onPress = {()=>{this.clickTheHistoryTextAndSearch(historyText)} }>
                <View style={[styles.tagRoot,{marginRight:14.5,marginBottom:10}]}>
                    <Text style={styles.tagText}>{historyText}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    loadTheSearchHistoryData = () =>{
        AsyncStorage.getItem('historyData').then(value=>{
            let historyData;
            if(value == null){
                historyData = [];
            }else{
                historyData = JSON.parse(value);
            }
            this.setState({searchHistory:historyData});
        }).catch(reason =>{

        });
    }

    setTheSearchHistoryData = () =>{
        AsyncStorage.setItem('historyData',JSON.stringify(this.state.searchHistory)).then(value=>{

        }).catch(reason =>{

        });
    }

    deleteTheSearchHistoryData = () =>{

    }

    searchTheTextInputGame = (games = '') =>{
        if(games == ''){
            this.setState({pageType:NoramType});
        }else{
            this.setState({pageType:searchType});
        }
    }

    /**
     * 清空所有搜索历史
     * 
    */
    clearAllSearchHistory = () =>{
        this.setState({searchHistory:[]});
        AsyncStorage.removeItem('historyData').then(value =>{
        }).catch(reason=>{
        });
    }

    /**
     * 检索搜索历史点击事件
     * 
    */
    clickTheHistoryTextAndSearch = (historyText = '') =>{
        console.log(historyText);
        if(historyText == ''){
            return;
        }

        let historyData = this.state.searchHistory; 
        let containsText = false;
        if(historyData.length > 0){
            for(let i = 0; i < historyData.length; i++){
                if(historyData[i] == historyText){
                    containsText = true;
                }
            }

            if(containsText) return;
        }

        historyData.push(historyText);
        this.setState({searchHistory:historyData});
        this.setTheSearchHistoryData();
    }

    hotGamesSection = () =>{
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH}}>
                <View style={styles.searchRootView}>
                    <Text style={styles.searchText}>热搜</Text>
                </View>
                <View style={styles.normalRootViewStyle}>
                    {this.renderTheHotGamesSection()}
                </View>
            </View>
        );
    }

    /**
     * 热门游戏列表
     * 
    */
    renderTheHotGamesSection = () =>{
        let dataArrya = this.state.pageType == NoramType ? this.state.hotGames : this.state.resultGames;
        let unitItems = [];

        dataArrya.map(renderNormalCell = (item, index) =>{
            let unitItem = this.renderTheNormalGameItem(item, index);
            unitItems.push(unitItem);
        });

        return unitItems;
    }

    /**
     * 搜索结果列表
     * 
    */
    renderTheResultGamesSection = () =>{
        let unitItems = [];

        this.state.resultGames.map(renderNormalCell = (item, index) =>{
            let unitItem = this.renderTheNormalGameItem(item, index);
            unitItems.push(unitItem);
        });

        return unitItems;
    }

    /**
     * 单个游戏模块渲染
     * 
    */
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
    scrollRoot:{
        backgroundColor: '#00132C',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00132C',
    },
    searchRootView:{
        width:SCREEN_WIDTH-30,
        marginTop:11,
        marginLeft:15,
        marginRight:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    searchHistoryRoot:{
        width:SCREEN_WIDTH,
        marginTop:15,
        marginLeft:0,
        marginRight:0,
        paddingLeft:15,
        paddingRight:15,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    searchText:{
        fontSize:14,
        color:'#666666',
        textAlign:'left',
    },
    clearIconStyle:{
        width:16.5,
        height:18,
        backgroundColor:'red'
    },
    tagRoot:{
        height:27,
        paddingLeft:8,
        paddingRight:8,
        borderRadius:12.5,
        borderWidth:0.5,
        borderColor:'#91ADD7',
        justifyContent:'center'
    },
    tagText:{
        fontSize:14,
        color:'#91ADD7'
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