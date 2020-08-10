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
    AsyncStorage,
    TouchableOpacity,
    Modal
} from 'react-native';
import CustomeListView from '../../Components/Component/CustomeListView';
import { SCREEN_WIDTH,SCREEN_HEIGHT } from '../../Config/UIConfig';
import _ from 'lodash';
import * as NavigationService from '../../Router/NavigationService';
import PageName from '../../Config/PageName';

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

    constructor(props) {
        super(props);

        this.state = {
            dataArray: [],
            freashData:false,
            accelerateStatus:false,
            showAlert:false
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('accelerateInfo').then(value => {
                let accelerateInfo = JSON.parse(value || '{}');
                let data = _.values(accelerateInfo);
                console.log(data);
                this.setState({
                    dataArray: data
                },()=>{
                    this.startTheTimerInterval();
                });
            });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }


    render() {
        console.log('测试触发render',this.state.showAlert);
        if(this.state.dataArray.length == 0){
            return(
                <View style={styles.container}>
                    {this.renderTheNavigation()}
                    {this.renderEmptyItem()}
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {this.renderTheNavigation()}
                <CustomeListView
                    ref={(listView) => this.listView = listView}
                    style={styles.flatlistStyle}
                    data={this.state.dataArray}
                    renderItem={({ item }) => this.renderTheItem(item)}
                    notSupportLoadMore={true}
                    showSeparator={false}
                />
                {this.stopAccelerateAlert()}
            </View>
        );
    }

    renderTheNavigation = () => {
        return (
            <View style={{ marginLeft: 0, marginTop: 0, width: SCREEN_WIDTH, height: 64, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{flex:1}}></View>
                <View style={{flex:1, alignItems: 'center'}}><Text style={{ color: 'white', marginTop: 30, fontSize: 18 }}>加速</Text></View>
                <View style={{flex:1,flexDirection:'row-reverse'}}>
                    {
                        this.state.dataArray.length > 0
                        ?
                        <TouchableOpacity onPress={()=>{this.stopAllGames()}}>
                            <Text style={{color: 'white',marginRight:15,marginTop: 30,fontSize: 18}}>全部停止</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View> 
                
            </View>
        );
    }

    /** 渲染列表单元组件 */
    renderTheItem = (item) => {
        return (
            <View style={styles.acceleratorItemRoot}>
                <View style={styles.gameIconRoot}>
                    <Image source={{ uri: item.icon }} style={styles.gameIcon} />
                </View>
                {this.renderTheInfomationItem(item.name, true)}
                <View style={styles.accelerateBtonRoot}>
                    {/* {this.renderTheButton(item)} */}
                    {this.accelarateTimeButton(item)}
                </View>
            </View>
        );
    }

    renderTheInfomationItem = (title = '', accelerateStatus = false) => {
        return (
            <View style={styles.inforRootView}>
                <Text style={{ marginBottom: 4, color: "white" }}>{title}</Text>
                {accelerateStatus ? <Text style={{ color: "white" }}>正在加速...</Text> : null}
            </View>
        );
    }

    renderTheButton = (item) => {
        return (
            <TouchableOpacity onPress={() => {
                NavigationService.navigate(PageName.ACCELERATE_DETAILS_PAGE, { data: JSON.stringify(item) });
            }}>
                <View
                    style={{ borderRadius: 20, height: 40, width: 90, backgroundColor: '#F5CC00', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        source={require('../../resource/Image/GameHomePage/lightning.png')}
                        style={{ width: 9.5, height: 16.5, marginRight: 4 }} />
                    <Text style={{ color: '#4F2F00' }}>加速</Text>
                </View>
            </TouchableOpacity>
        );
    }

    accelarateTimeButton = (data) =>{
        let date = Date.parse(new Date());
        let gameDate = Date.parse(data._timeReg);
        let alreadyAccelerate = date - gameDate;
        alreadyAccelerate = Math.floor(alreadyAccelerate / 1000);
        
        let h = Math.floor(alreadyAccelerate / 3600);
        let m = Math.floor((alreadyAccelerate - 60 * h) / 60);
        let s = alreadyAccelerate - 60 * h - 60 * m;

        if(h < 10) h = '0'+h;
        if(m < 10) m = '0'+m;
        if(s < 10) s = '0'+s;
        return(
            <TouchableOpacity onPress={() => {
                NavigationService.navigate(PageName.ACCELERATE_DETAILS_PAGE, { data: JSON.stringify(item) });
            }}>
               <View
                style={{ borderRadius: 20, height: 40, width: 90, backgroundColor: '#F5CC00', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4F2F00' }}>{h+':'+m+':'+s}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    getTheData = (pageNum = 1) => {
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

    renderEmptyItem = () =>{
        return(
            <View style={styles.emptyStyle}>
                <Image
                    source={require('../../resource/Image/AccelerateDetails/noAcc.png')} 
                    style={{width:170,height:91}}/>
                <Text style={{fontSize:13,color:'#89CBFC',marginTop:19}}>未添加游戏请到全部游戏界手动添加游戏加速吧</Text>
                <TouchableOpacity 
                     onPress={()=>{
                        this.props.navigation.navigate(PageName.NORMAL_PAGE_GAME_HOME_PAGE);
                     }}
                    style={{marginTop:30,width:168,height:40,borderRadius:20,backgroundColor:'#F2CE00',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:14,color:'#463C00'}}>立即前往</Text>
                </TouchableOpacity>
            </View>
        );
    }

    startTheTimerInterval = () =>{
        if(this.state.dataArray.length == 0){
            console.log('启动循环---数量为0');
            this.destroyTheTimer();
            return;
        }

        /** 重启timer则先销毁原timer，保证定时器的唯一性，避免野指针*/
        this.destroyTheTimer();
        this.requestTimer = setInterval(()=>{
            this.calculateTheAccelarateInfo();
        },1000);
    }

    destroyTheTimer = () =>{
        this.requestTimer && clearInterval(this.requestTimer);
    }

    calculateTheAccelarateInfo = () =>{
        this.setState({freashData:true,accelerateStatus:true});
        console.log('启动循环---计算中');
    }

    stopAllGames=()=>{
        console.log('this.setState({ showAlert: true });');
        this.setState({ showAlert: true });
    }

    stopAccelerateAlert = () =>{
        return(
            <Modal
                transparent={true}
                visible={this.state.showAlert}
                onRequestClose={() => this.hide(false)}>
                    <TouchableOpacity
                        onPress={() => { this.setState({ showAlert: false }) }}
                        style={{ marginLeft: 0, marginRight: 0, width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: 'rgba(23,23,23,0.5)',flexDirection:'column-reverse' }}>
                        <TouchableOpacity style={[styles.stopItemStyle,{marginBottom:10}]} onPress={()=>{
                            this.setState({ showAlert: false });
                        }}>
                            <Text style={{color:'#999999'}}>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.stopItemStyle,{marginBottom:6.5}]} onPress={()=>{
                            this.setState({ showAlert: false });
                            AsyncStorage.removeItem('accelerateInfo').then(value => {
                                this.setState({dataArray:[]});
                            }).catch(reason => {
                            });
                        }}>
                            <Text style={{color:'white'}}>停止所有游戏加速</Text>
                        </TouchableOpacity>
                        <View style={[styles.stopItemStyle,{marginBottom:1.5}]}>
                            <Text style={{color:'white'}}>您当前有2款游戏正在加速，停止加速可能导致游戏断线，是否停止所有游戏的加速？</Text>
                        </View>
                    </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#00132D'
    },
    flatlistStyle: {
        marginTop: 0,
        marginLeft: 0,
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: '#00132D'
    },
    acceleratorItemRoot: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 45,
        width: SCREEN_WIDTH - 60,
        height: 80,
        flexDirection: 'row',
        backgroundColor: '#072042',
        borderRadius: 10
    },
    gameIconRoot: {
        width: 100,
        marginLeft: -40,
        marginTop: 0,
        justifyContent: 'center',
        height: 80
    },
    gameIcon: {
        width: 70,
        height: 70,
        borderRadius: 5,
        marginLeft: 15,
    },
    inforRootView: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center',
        flex: 1
    },
    accelerateBtonRoot: {
        width: 110,
        marginRight: 0,
        marginTop: 0,
        height: 80,
        justifyContent: 'center'
    },
    emptyStyle:{
        marginLeft:0,
        marginTop:0,
        flex:1,
        width:SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center'
    },
    stopItemStyle:{
        marginLeft:14,
        marginRight:14,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:17,
        paddingRight:17,
        borderRadius:7,
        backgroundColor:'#153970',
        justifyContent:'center',
        alignItems:'center'
    }
});