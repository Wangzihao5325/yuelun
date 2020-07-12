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
    Switch
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';
import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';

export default class setting extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            switchValue:false
        }
    }

    componentDidMount(){
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.setViewRoot}>
                    {this.renderTheAcceleratorAutoItem()}
                    {this.renderTheSuggestionItem()}
                </View>
                <View style={styles.logoutRoot}>
                    <TouchableOpacity 
                        onPress = {()=>{console.log('logout-----');}}>
                            <View style={styles.logoutBtnBtn}>
                                 <Text style={{color:'yellow'}}>退出登录</Text>
                            </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderTheAcceleratorAutoItem = () =>{
        return(
            <View style={styles.setRootView}>
                <Text style={styles.textStyle}>下次启动自动加速</Text>
                <Switch 
                    onValueChange = {(event)=>{
                        this.setState({switchValue:event});
                    }}
                    value = {this.state.switchValue}
                />
            </View>
        );
    }

    renderTheSuggestionItem = () =>{
        return(
            <TouchableOpacity onPress={()=>{
                this.pushToSuggestionView();
            }}>
                <View style={styles.setRootView}>
                    <Text style={styles.textStyle}>意见反馈</Text>
                    <Image
                         source = {require('../../resource/Image/GameHomePage/more.png')} 
                         style={styles.setIcon}/>
                </View>
            </TouchableOpacity>
        );
    }

    pushToSuggestionView = () =>{
        navigator.jump(this, PageName.NORMAL_PAGE_SUGGESTION);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor:'#00132D'
    },
    setViewRoot:{
        flex:1,
        marginTop:0,
        marginLeft:0,
        marginRight:0,
        width:SCREEN_WIDTH,
        backgroundColor:'#00132D'
    },
    logoutRoot:{
        marginLeft:0,
        marginRight:0,
        marginBottom:0,
        width:SCREEN_WIDTH,
        height:90,
        alignItems:'center',
        backgroundColor:'#00132D'
    },
    logoutBtnBtn:{
        borderWidth:1.0,
        borderRadius:24,
        borderColor:'yellow',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:30,
        marginRight:30,
        width:SCREEN_WIDTH-60,
        height:50,
    },
    setRootView:{
        marginTop:0,
        marginLeft:0,
        width:SCREEN_WIDTH,
        height:70,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    setIcon:{
        width:10,
        height:20,
    },
    textStyle:{
        fontSize:14,
        color:'white'
    }
});