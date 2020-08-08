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
    TouchableOpacity
} from 'react-native';
import CustomeListView from '../../Components/Component/CustomeListView';
import {SCREEN_WIDTH} from '../../Config/UIConfig';

export default class acceleratorPage extends Component {
    static navigationOptions = {
        title: '加速',
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
            dataArray:['1','2','3','4'],
        }
    }

    componentDidMount(){
        
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderTheNavigation()}
               <CustomeListView
                   ref = {(listView) => this.listView = listView}
                   style={styles.flatlistStyle}
                   data={this.state.dataArray}
                   renderItem={({item})=>this.renderTheItem(item)}
                   notSupportLoadMore={true}
                   showSeparator = {false}
                />
            </View>
        );
    }

    renderTheNavigation = () =>{
        return(
            <View style={{marginLeft:0,marginTop:0,width:SCREEN_WIDTH,height:64,flexDirection:'row',justifyContent:'center'}}>
                <Text style={{color:'white',marginTop:30,fontSize:18}}>加速</Text>
            </View>
        );
    }


    /** 渲染列表单元组件 */
    renderTheItem = (textString='') =>{
        return(
            <View style={styles.acceleratorItemRoot}>
                <View style={styles.gameIconRoot}>
                    <Image style={styles.gameIcon}/>
                </View>
                {this.renderTheInfomationItem('王者荣耀',true)}
                <View style={styles.accelerateBtonRoot}>
                    {this.renderTheButton()}
                </View>
            </View>
        );
    }

    renderTheInfomationItem = (title='',accelerateStatus=false) =>{
        return(
            <View style={styles.inforRootView}>
                <Text style={{marginBottom:4,color:"white"}}>{title}</Text>
                {accelerateStatus?<Text style={{color:"white"}}>正在加速...</Text>:null}
            </View>
        );
    }

    renderTheButton = () =>{
        return(
            <TouchableOpacity onPress={()=>{
                console.log('点击点击点击啊');}}>
            <View 
                style={{borderRadius:20,height:40,width:90,backgroundColor:'#F5CC00',flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                 >
                <Image 
                    source = {require('../../resource/Image/GameHomePage/lightning.png')} 
                    style={{width:9.5,height:16.5,marginRight:4}}/>
                <Text style={{color:'#4F2F00'}}>加速</Text>
            </View>
            </TouchableOpacity>
        );
    }

    getTheData = (pageNum=1) =>{
        // let testData = [];
        // for(let until in testUntilArray){
        //     until = pageNum + '----' +until;
        //     testData.push(until);
        // }

        // console.log('触发下拉刷新-----请求第'+pageNum+'页数据++++++++++'+testData.length);
        // Loading.show();
        // this.timer = setTimeout(()=>{
        //     Loading.hidden();
        //     console.log('触发下拉刷新-----成功'+pageNum);
        //     this.listView.asyncSuccess(testData,pageNum);
        // },3000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00132D'
    },
    flatlistStyle: {
        marginTop  : 0,
        marginLeft : 0,
        width:SCREEN_WIDTH,
        flex:1,
        backgroundColor: '#00132D'
    },
    acceleratorItemRoot:{
        marginTop:10,
        marginBottom:10,
        marginLeft:45,
        width:SCREEN_WIDTH-60,
        height:80,
        flexDirection:'row',
        backgroundColor:'#072042',
        borderRadius:10
    },
    gameIconRoot:{
        width:100,
        marginLeft:-40,
        marginTop:0,
        justifyContent:'center',
        height:80
    },
    gameIcon:{
        width:70,
        height:70,
        borderRadius:5,
        marginLeft:15,
        backgroundColor:'red'
    },
    inforRootView:{
        marginTop:0,
        marginBottom:0,
        marginLeft:0,
        marginRight:0,
        justifyContent:'center',
        flex:1
    },
    accelerateBtonRoot:{
        width:110,
        marginRight:0,
        marginTop:0,
        height:80,
        justifyContent:'center'
    }
});