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
       const { params } = this.props.route.params;
        
    }

    render() {
        return (
            <View style={styles.container}>
               <CustomeListView
                   ref = {(listView) => this.listView = listView}
                   style={styles.flatlistStyle}
                   data={this.state.dataArray}
                   renderItem={({item})=>this.renderTheItem(item)}
                   notSupportLoadMore={true}
                />
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
                <Text style={{marginBottom:4}}>{title}</Text>
                {accelerateStatus?<Text>正在加速...</Text>:null}
            </View>
        );
    }

    renderTheButton = () =>{
        return(
            <TouchableOpacity onPress={()=>{
                console.log('点击点击点击啊');}}>
            <View 
                style={{borderRadius:20,height:40,width:90,backgroundColor:'red',flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                 >
                <Image style={{width:15,height:25,backgroundColor:'blue',marginRight:4}}/>
                <Text>加速</Text>
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
        backgroundColor: 'white',
    },
    flatlistStyle: {
        marginTop  : 0,
        marginLeft : 0,
        width:SCREEN_WIDTH,
        flex:1,
        backgroundColor:'white',
    },
    acceleratorItemRoot:{
        marginTop:0,
        marginLeft:0,
        width:SCREEN_WIDTH,
        height:80,
        flexDirection:'row'

    },
    gameIconRoot:{
        width:100,
        marginLeft:0,
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