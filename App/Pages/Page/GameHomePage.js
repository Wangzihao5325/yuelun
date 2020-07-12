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
import CustomeListView from '../../Components/Component/CustomeListView';
import {SCREEN_WIDTH,BannerWidth,BannerHeight} from '../../Config/UIConfig';
import GameHomeNavigation from '../../Components/Component/NavigationItem/GameHomeNavigation';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import GameUnitItem from '../../Components/Component/Game/GameUnitItem';
import GameTitleItem from '../../Components/Component/Game/GameTitleItem';
import GameNormalItem from '../../Components/Component/Game/GameNormalItem';

import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';

let testData = [
    { imageUrl: 'http://b.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf233e9732cb27eca8064388ffc.jpg' },
    { imageUrl: 'http://pic4.zhimg.com/v2-a328372a0afa2d242e048ce31d7ae2f7_b.jpg' },
    { imageUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151207280,533626736&fm=111&gp=0.jpg' }];

export default class acceleratorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectStatus:1,
            isRefreshingStatus:false,
        }
    }

    componentDidMount(){
       
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground 
                     resizeMode = 'stretch'
                     source={require('../../resource/Image/GameHomePage/gameBack.png')}
                     style={{marginTop:0,marginLeft:0,width:SCREEN_WIDTH,height:SCREEN_WIDTH/375*200,alignItems: 'center',}}>
               {this.renderTheNavigationBar()}
               {this.renderTheBannerItem()}
               </ImageBackground>

               <ScrollView
                     refreshControl={
                        <RefreshControl
                          refreshing={this.state.isRefreshingStatus}
                          onRefresh={()=>{
                              this.setState({isRefreshingStatus:false});
                          }}
                          colors={['red', 'blue', 'green']}
                          progressBackgroundColor='#ffff00'
                          enabled={true}
                        />
                      }                      
                     style={{marginTop:50}}>
                 
                 {this.state.selectStatus == 1 ? this.renderTheAllGamePage() : null}
                 {this.state.selectStatus == 2 ? this.renderTheNormalGamePage() : null}
                 {this.state.selectStatus == 3 ? this.renderTheNormalGamePage() : null}
                </ScrollView>
            </View>
        );
    }

    renderTheNavigationBar = () =>{
        return(
            <GameHomeNavigation
                 selectStatus = {this.state.selectStatus}
                 selectedGameButton = {(status)=>{this.selectedGameItemButton(status)}}
                 searchClickFunction = {()=>{this.clickTheSearchItemButton()}}
          />
        );
    }

    renderTheBannerItem = () =>{
        return(
            <View style={styles.bannerRootView}>
                <CustomerSwiper borderRadius={10} super={this} bannerData={testData} />
            </View>
        );
    }
    
    //渲染全部游戏页面
    renderTheAllGamePage = () =>{
        return(
            <View>
                {this.renderTheGameSection(1,'精选游戏',require('../../resource/Image/GameHomePage/diamond.png'))}
                {this.renderTheGameSection(2,'热门游戏',require('../../resource/Image/GameHomePage/new.png'))}
                {this.renderTheGameSection(3,'最新游戏',require('../../resource/Image/GameHomePage/hot.png'))}  
            </View>
        );
    }

    //渲染常规四列一纵的游戏页面
    renderTheNormalGamePage = () =>{
        return(
            <View>
                {this.renderTheNormalGameItems()}
            </View>
        );
    }


    renderTheGameSection = (type=0,title = '',iconSource = require('../../resource/Image/GameHomePage/diamond.png'), dataArray = []) =>{
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH,}}>
                <GameTitleItem
                     iconSource = {iconSource} 
                     title={title}
                     clickFunction = {()=>{

                     }}/>
                     
                <ScrollView      
                     horizontal = {true}
                     keyboardDismissMode = 'on-drag'
                     >
                         {this.renderTheGanmeItems(type)}
                </ScrollView>
            </View>
        );
    }



    renderTheGanmeItems = (type=0) =>{
        let test;
        if(type == 1){
            test = [this.renderTheGameNormalUnitItem(),this.renderTheGameNormalUnitItem(),this.renderTheGameNormalUnitItem(),this.renderTheGameNormalUnitItem(),this.renderTheGameNormalUnitItem(),this.renderTheGameNormalUnitItem()];
        }else{
            test = [this.renderTheGameUnitItem(),this.renderTheGameUnitItem(),this.renderTheGameUnitItem(),this.renderTheGameUnitItem()];
        }
        return test;
    }

    renderTheNormalGameItems = () =>{
        let test = [this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell(),this.renderTheNormalItemCell()];
        return test;
    }


    renderTheGameUnitItem = () =>{
        return(
            <View style={styles.scrollViewStyle}>
                <GameUnitItem nameText={'steam移动版\n(亚服)'}/>
                <GameUnitItem nameText={'steam移动版\n(亚服)'}/>
            </View>
        );
    }

    renderTheGameNormalUnitItem = () =>{
        return(
            <View style={[styles.scrollViewStyle,{height:200}]}>
                <GameNormalItem title={'和平精英'}/>
                <GameNormalItem title={'PUBG MOBILE\n(亚服)'}/>
            </View>
        );
    }

    renderTheNormalItemCell = (dataArrya=[]) =>{
        return(
            <View style={styles.normalItemRootCell}>
                <GameNormalItem title={'和平精英'} showFavoratorIcon={true} favorator={false}/>
                <GameNormalItem title={'和平精英'} showFavoratorIcon={true} favorator={false}/>
                <GameNormalItem title={'和平精英'} showFavoratorIcon={true} favorator={true}/>
                <GameNormalItem title={'和平精英'} showFavoratorIcon={true} favorator={true}/>
            </View>
        );
    }

    selectedGameItemButton = (status = 0) =>{
        console.log('statusstatus',status);
        this.setState({selectStatus:status});
    }

    clickTheSearchItemButton = () =>{
        navigator.jump(this, PageName.NORMAL_PAGE_SETTING);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#00132D'
    },
    bannerRootView:{
        marginTop:20,
        width: BannerWidth, 
        height: BannerHeight,
    },
    scrollViewStyle:{
        height:270,
        justifyContent:'space-around',
        marginLeft:10.5
    },
    normalItemRootCell:{
        width:SCREEN_WIDTH,
        height:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around'
    }
   
});