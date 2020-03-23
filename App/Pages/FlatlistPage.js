/**
 * FlatlistPage
 * Info:test Flatlist Component item
 * Crate by Charlie on 2020-01-07
 * */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList
} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../Config/UIConfig';
import CustomeListView from '../Components/Component/CustomeListView';
 import {Loading} from '../Components/Toast/Loading';

let testUntilArray = ['1','2','3','4','5','6','7','8','9','10'];

export default class FlatlistPage extends Component{
    static navigationOptions = {
        title: 'FlatlistPage',
        headerStyle: {
          backgroundColor: '#F34966',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props);
        
        this.state = {
            dataArray : [],
        }
    }

    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.listView.asyncSuccess(testUntilArray,1);
        },5000);
    }

    render(){
        return(
            <View style={styles.container}>
                <CustomeListView
                   ref = {(listView) => this.listView = listView}
                   style={styles.flatlistStyle}
                   data={this.state.dataArray}
                   renderItem={({item})=>this.renderTheItem(item)}
                   asyncFunc={(pageNum)=>{this.getTheData(pageNum)}}
                />
            </View>
        );
    }

    /** 渲染列表单元组件 */
    renderTheItem = (textString='') =>{
        return(
            <View style={{backgroundColor:'white',alignItems:'center',height:50}}>
                <Text style={styles.textStyle}>{textString}</Text>
            </View>
        );
    }

    /** 数据请求函数 */
    getTheData = (pageNum=1) =>{
        let testData = [];
        for(let until in testUntilArray){
            until = pageNum + '----' +until;
            testData.push(until);
        }

        console.log('触发下拉刷新-----请求第'+pageNum+'页数据++++++++++'+testData.length);
        Loading.show();
        this.timer = setTimeout(()=>{
            Loading.hidden();
            console.log('触发下拉刷新-----成功'+pageNum);
            this.listView.asyncSuccess(testData,pageNum);
        },3000);
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
        marginTop  : 0,
        marginLeft : 0,
        width:SCREEN_WIDTH,
        flex:1,
        backgroundColor:'white',

    },
    textStyle: {
        fontSize: 30,
        color: 'black',
    },
    separatorLineStyle:{
        width:SCREEN_WIDTH,
        height:1,
        backgroundColor:'green',
    },
    emptyViewStyle:{
        marginTop:0,
        marginLeft:0,
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    },
    listComponentStyle:{
        width:SCREEN_WIDTH,
        height:50,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    }
});