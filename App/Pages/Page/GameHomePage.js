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
    ScrollView
} from 'react-native';
import CustomeListView from '../../Components/Component/CustomeListView';
import {SCREEN_WIDTH,BannerWidth,BannerHeight} from '../../Config/UIConfig';
import GameHomeNavigation from '../../Components/Component/NavigationItem/GameHomeNavigation';
import CustomerSwiper from '../../Components/Component/CustomeSwiper';
import GameUnitItem from '../../Components/Component/GameUnitItem';

let testData = [
    { imageUrl: 'http://b.hiphotos.baidu.com/zhidao/pic/item/c75c10385343fbf233e9732cb27eca8064388ffc.jpg' },
    { imageUrl: 'http://pic4.zhimg.com/v2-a328372a0afa2d242e048ce31d7ae2f7_b.jpg' },
    { imageUrl: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1151207280,533626736&fm=111&gp=0.jpg' }];

export default class acceleratorPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectStatus:1,
        }
    }

    componentDidMount(){
       
        
    }

    render() {
        return (
            <View style={styles.container}>
               {this.renderTheNavigationBar()}
               {this.renderTheBannerItem()}
              
               <ScrollView 
                     horizontal = {true}
                     keyboardDismissMode = 'on-drag'
                     >
                         {this.renderTheGanmeItems()}
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

    renderTheGanmeItems = () =>{
        
        let test = [this.renderTheGameUnitItem(),this.renderTheGameUnitItem(),this.renderTheGameUnitItem(),this.renderTheGameUnitItem()];
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

    selectedGameItemButton = (status = 0) =>{
        console.log('statusstatus',status);
        this.setState({selectStatus:status});
    }

    clickTheSearchItemButton = () =>{
        console.log('click the search button');
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
    }
   
});