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
    Switch,
    ScrollView
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../Config/UIConfig';

export default class search extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            
        }
    }

    componentDidMount(){
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTheSearchHistorySection()}
                {this.hotGamesSection()}
            </View>
        );
    }

    renderTheSearchHistorySection = () =>{
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH}}>
            <View style={styles.searchRootView}>
                <Text style={styles.searchText}>搜索历史</Text>
                <TouchableOpacity onPress={this.clearAllSearchHistory()}>
                    <Image style={styles.clearIconStyle}/>
                </TouchableOpacity>
            </View>
            {this.renderTheHistoryTextSection()}
            </View>
        );
    }

    renderTheHistoryTextSection = () =>{
        return(
            <View style={styles.searchHistoryRoot}>
                {this.renderTheHistoryTagItem('王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀王者荣耀王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀')}
                {this.renderTheHistoryTagItem('王者荣耀123')}
                {this.renderTheHistoryTagItem('王者荣耀')}
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

    clearAllSearchHistory = () =>{
        console.log('清除搜索历史');
    }

    clickTheHistoryTextAndSearch = (historyText = '') =>{
        console.log(historyText);
    }

    hotGamesSection = () =>{
        return(
            <View style={{marginLeft:0,marginTop:10,width:SCREEN_WIDTH}}>
                <View style={styles.searchRootView}>
                <Text style={styles.searchText}>热搜</Text>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
});