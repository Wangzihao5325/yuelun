/**
 * custome Home Game page Navigation Bar
 * 
 * Creat by YC Wang
 * 
*/
import React, {Component} from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {interceptTime} from '../../../Config/SystemConfig';
import * as UIConfig from '../../../Config/UIConfig';
import * as TimerManager from '../../../Functions/Time/TimeManager';
import * as LogManager from '../../../Functions/LogManager/LogManager';

export default class GameHomeNavigation extends Component{
    constructor(props){
        super(props);

        this.state = {
            clickType : this.props.clickType ? this.props.clickType : this.props.title
        };
    }

    render(){
        return(
            <View style={[styles.rootView]}>
                <View style={[styles.gameItemRootView]}>
                    {this.renderTheSelectItemRootView('全部游戏',1)}
                    {this.renderTheSelectItemRootView('海外游戏',2)}
                    {this.renderTheSelectItemRootView('即将上线',3)}
                </View>
                <TouchableOpacity 
                    onPress = {()=>{
                        this.props.searchClickFunction();
                    }}
                    style={[styles.searchRootView]}>
                </TouchableOpacity>
            </View>
        );
    }

    renderTheSelectItemRootView = (title='',status = 0) =>{
        return(
            <TouchableOpacity 
                style={[styles.searchItemRootView]}
                onPress = {()=>{
                    this.props.selectedGameButton(status);
            }}>
                 <Text style={[styles.titleStyle,{
                    marginTop:this.props.selectStatus == status ? 8 : 0,
                    color:this.props.selectStatus == status ? 'white' : '#FFFFFF'}]}>{title}</Text>
                {
                    this.props.selectStatus == status
                    ?
                    <View style={[styles.focusLineStyle]}/>
                    :
                    null
                }
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    rootView:{
        marginTop:0,
        marginLeft:0,
        width:UIConfig.SCREEN_WIDTH,
        height:UIConfig.NavigatorBarHeight,
        paddingTop:UIConfig.NavigatorTop,
        flexDirection:'row'
    },
    gameItemRootView:{
        flex:7,
        height:UIConfig.NavigatorViewHeight,
        backgroundColor:'#00132D',
        flexDirection:'row'
    },
    searchRootView:{
        flex:1,
        height:UIConfig.NavigatorViewHeight,
        backgroundColor:'yellow'
    },
    searchItemRootView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    titleStyle:{
        color:'white',
        fontSize:17,
        fontWeight:'bold'
    },
    focusLineStyle:{
        width:30,
        height:3,
        borderRadius:1.5,
        backgroundColor:'white',
        marginTop:5
    }
   
});