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
import { SCREEN_WIDTH, SCREEN_HEIGHT, NavigatorBarHeight, NavigatorTop, NavigatorViewHeight } from '../../Config/UIConfig';
import _ from 'lodash';
import * as NavigationService from '../../Router/NavigationService';
import PageName from '../../Config/PageName';
import { SwipeListView } from 'react-native-swipe-list-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Api from '../../Functions/NativeBridge/ApiModule';
import { _sessionId } from '../../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';

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
            freashData: false,
            accelerateStatus: false,
            showAlert: false,
            accelerateInfo: {}
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('accelerateInfo').then(value => {
                let accelerateInfo = JSON.parse(value || '{}');
                let data = _.values(accelerateInfo);
                console.log('---here---', accelerateInfo);
                this.setState({
                    dataArray: data,
                    accelerateInfo: accelerateInfo
                }, () => {
                    this.startTheTimerInterval();
                });
            });
        });

        this._unfocusUnsubscribe = this.props.navigation.addListener('blur', () => {
            if (this.requestTimer) {
                clearInterval(this.requestTimer);
                this.requestTimer = null;
            }
        })
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._unfocusUnsubscribe();
    }


    render() {
        console.log('测试触发render', this.state.dataArray);
        if (this.state.dataArray.length == 0) {
            return (
                <View style={styles.container}>
                    {this.renderTheNavigation()}
                    {this.renderEmptyItem()}
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {this.renderTheNavigation()}
                <SwipeListView
                    style={{ marginLeft: 0, marginTop: 0, width: SCREEN_WIDTH, flex: 1 }}
                    data={this.state.dataArray}
                    renderItem={(data, rowMap) => (
                        <View style={styles.rowFront}>{this.renderTheItem(data.item)}</View>
                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Text></Text>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => { this.deleteTheItem(data) }}>
                                <Text style={{ color: "white" }}>删除</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    leftOpenValue={0}
                    rightOpenValue={-75}
                    keyExtractor={(item) => `${item.id}`}
                />

                {this.stopAccelerateAlert()}
            </View>
        );
    }

    deleteTheItem = (item) => {
        const { dataArray, accelerateInfo } = this.state;
        let idKey = dataArray[item.index]["id"];
        console.log('deletedelete', idKey);
        delete accelerateInfo[idKey];
        dataArray.splice(item.index, 1);
        this.setState({ "dataArray": dataArray, "accelerateInfo": accelerateInfo });
        AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {

        });
    }

    renderTheNavigation = () => {
        return (
            <View style={{ marginLeft: 0, marginTop: 0, width: SCREEN_WIDTH, height: NavigatorBarHeight, flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, alignItems: 'center' }}><Text style={{ color: 'white', marginTop: NavigatorTop + 6, fontSize: 18 }}>加速</Text></View>
                <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    {
                        this.state.dataArray.length > 1
                            ?
                            <TouchableOpacity onPress={() => { this.stopAllGames() }}>
                                <Text style={{ color: 'white', marginRight: 15, marginTop: NavigatorTop + 6, fontSize: 18 }}>全部停止</Text>
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
            <TouchableOpacity
                style={styles.acceleratorItemRoot}
                onPress={() => {
                    NavigationService.navigate(PageName.ACCELERATE_DETAILS_PAGE, { data: JSON.stringify(item) });
                }}>
                <View style={styles.gameIconRoot}>
                    <Image source={{ uri: item.icon }} style={styles.gameIcon} />
                </View>
                {this.renderTheInfomationItem(item.name, true)}
                <View style={styles.accelerateBtonRoot}>
                    {/* {this.renderTheButton(item)} */}
                    {this.accelarateTimeButton(item)}
                </View>
            </TouchableOpacity>
        );
    }

    updateSpeedUpStatusToLocal = (id = '') => {
        const { accelerateInfo } = this.state;
        console.log('sadasdadasd', accelerateInfo, accelerateInfo[id]);
        if (accelerateInfo[id]["speedup"] === "1") {
            let _date = new Date();
            accelerateInfo[id]["_timeReg"] = _date;
        }

        this.setState({ accelerateInfo: accelerateInfo });
        AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {

        });

        if (accelerateInfo[id]["speedup"] === "1") {
            this.startTheVPN(id, accelerateInfo[id]);
        } else {
            vpnModule.stopVPN();
        }

    }

    freashTheAccelerateData = () => {
        AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {

        });
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
                // NavigationService.navigate(PageName.ACCELERATE_DETAILS_PAGE, { data: JSON.stringify(item) });
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

    accelarateTimeButton = (data) => {
        if (data["speedup"] == '0') {
            return (
                <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                    console.log('item["speedup"]', data);
                    if(data["speedup"] == '0'){
                        let accelerateStatus = this.checkHasGameAcceleratedOrNot();
                        if(accelerateStatus){
                            NavigationService.alert({
                                title: '提示',
                                content: '当前有游戏正在加速中，不可同时开启',
                                bottomObjs: [
                                    {
                                        key: 'cancel',
                                        type: 'button',
                                        title: '确定'
                                    }
                                ]
                            });
                            return;
                        }
                    }
                    if (data["speedup"] == '1') {
                        data["speedup"] = '0';
                    } else {
                        data["speedup"] = '1';
                    }

                    this.updateSpeedUpStatusToLocal(data["id"]);
                }}>
                    <Image
                        source={require('../../resource/Image/GameHomePage/lightning.png')}
                        style={styles.iconStyle} />
                    <Text style={styles.activeText}>加速</Text>
                </TouchableOpacity>
            );
        }
        let date = Date.parse(new Date());
        let gameDate = Date.parse(data._timeReg);
        let alreadyAccelerate = date - gameDate;
        alreadyAccelerate = Math.floor(alreadyAccelerate / 1000);

        let h = Math.floor(alreadyAccelerate / 3600);
        let m = Math.floor((alreadyAccelerate - 3600 * h) / 60);
        let s = alreadyAccelerate - 3600 * h - 60 * m;

        if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;
        return (
            <TouchableOpacity onPress={() => {
                console.log('item["speedup"]', data);
                if (data["speedup"] == '1') {
                    data["speedup"] = '0';
                } else {
                    data["speedup"] = '1';
                }

                this.updateSpeedUpStatusToLocal(data["id"]);
            }}>
                <View
                    style={{ borderRadius: 20, height: 40, width: 90, backgroundColor: '#F5CC00', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#4F2F00' }}>{h + ':' + m + ':' + s}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderEmptyItem = () => {
        return (
            <View style={styles.emptyStyle}>
                <Image
                    source={require('../../resource/Image/AccelerateDetails/noAcc.png')}
                    style={{ width: 170, height: 91 }} />
                <Text style={{ fontSize: 13, color: '#89CBFC', marginTop: 19 }}>未添加游戏请到全部游戏界手动添加游戏加速吧</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate(PageName.NORMAL_PAGE_GAME_HOME_PAGE);
                    }}
                    style={{ marginTop: 30, width: 168, height: 40, borderRadius: 20, backgroundColor: '#F2CE00', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#463C00' }}>立即前往</Text>
                </TouchableOpacity>
            </View>
        );
    }

    startTheTimerInterval = () => {
        if (this.state.dataArray.length == 0) {
            console.log('启动循环---数量为0');
            this.destroyTheTimer();
            return;
        }

        /** 重启timer则先销毁原timer，保证定时器的唯一性，避免野指针*/
        this.destroyTheTimer();
        this.requestTimer = setInterval(() => {
            this.calculateTheAccelarateInfo();
        }, 1000);
    }

    destroyTheTimer = () => {
        this.requestTimer && clearInterval(this.requestTimer);
    }

    calculateTheAccelarateInfo = () => {
        this.setState({ freashData: true, accelerateStatus: true });
        console.log('启动循环---计算中');
    }

    stopAllGames = () => {
        console.log('this.setState({ showAlert: true });');
        this.setState({ showAlert: true });
    }

    stopAccelerateAlert = () => {
        let gamecount = this.state.dataArray.length;
        return (
            <Modal
                transparent={true}
                visible={this.state.showAlert}
                onRequestClose={() => this.hide(false)}>
                <TouchableOpacity
                    onPress={() => { this.setState({ showAlert: false }) }}
                    style={{ marginLeft: 0, marginRight: 0, width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: 'rgba(23,23,23,0.5)', flexDirection: 'column-reverse' }}>
                    <TouchableOpacity style={[styles.stopItemStyle, { marginBottom: 10 }]} onPress={() => {
                        this.setState({ showAlert: false });
                    }}>
                        <Text style={{ color: '#999999' }}>取消</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.stopItemStyle, { marginBottom: 6.5 }]} onPress={() => {
                        this.setState({ showAlert: false });
                        // AsyncStorage.removeItem('accelerateInfo').then(value => {
                        //     this.setState({ dataArray: [] });
                        // }).catch(reason => {
                        // });
                        this.stopAllGameSpeedUp();
                    }}>
                        <Text style={{ color: 'white' }}>停止所有游戏加速</Text>
                    </TouchableOpacity>
                    <View style={[styles.stopItemStyle, { marginBottom: 1.5 }]}>
                        <Text style={{ color: 'white' }}>{gamecount + "款游戏正在加速，停止加速可能导致游戏断线，是否停止所有游戏的加速？"}</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    stopAllGameSpeedUp = () => {
        const { dataArray, accelerateInfo } = this.state;
        for (let i = 0; i < dataArray.length; i++) {
            let gameInfo = dataArray[i];
            gameInfo["speedup"] = "0";
        }

        this.setState({ "dataArray": dataArray, "accelerateInfo": accelerateInfo });
        AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {

        });

        vpnModule.stopVPN();
    }

    startTheVPN = (id, accelerateInfo) => {
        console.log('测试加速点击', accelerateInfo);
        var iplist = accelerateInfo["ip_list"];
        var iplistArray;
        if (iplist === '') {
            iplistArray = [];
        } else {
            iplist = iplist.replace("[", "");
            iplist = iplist.replace("]", "");
            iplistArray = iplist.split(',');
        }

        let IPArray = [];
        for (let i = 0; i < iplistArray.length; i++) {
            let IPUntil = iplistArray[i];
            let index = IPUntil.indexOf("/");
            let IP = IPUntil.substring(1, index - 1);
            let DNS = IPUntil.substring(index + 1, IPUntil.length - 1);
            let newUnitItem = [IP, DNS];
            IPArray.push(newUnitItem);
        }

        let use_server_id = accelerateInfo["use_server_id"];
        if (use_server_id.length > 0) {
            Api.connectServer(id, use_server_id[0]).then((res) => {
                console.log('测试加速点击---res', res);
                if (res.status === 'ok' && res.data.consult_ip) {
                    //各种连接操作
                    vpnModule.prepare()
                        .then(() => {
                            vpnModule.startVpn(_sessionId, id, IPArray);
                            let _date = new Date();
                            this.state.gameFullInfo._timeReg = _date;
                            accelerateInfo[this.state.id] = this.state.gameFullInfo;
                            accelerateInfo[this.state.id]["speedup"] = "1";
                            this.state.gameFullInfo
                            console.log('JSON.stringify(accelerateInfo)', accelerateInfo);
                            AsyncStorage.setItem('accelerateInfo', JSON.stringify(accelerateInfo)).then(value => {
                                this.setState({
                                    isAccelerate: true
                                });
                            });
                        });
                } else {
                    if (res.status === 'ok') {
                        NavigationService.alert(this.alertPayload("后台服务正忙，请重试"));
                    } else {
                        NavigationService.alert(this.alertPayload(res.msg));
                    }

                }
            })
        }
    }

    checkHasGameAcceleratedOrNot = () =>{
        let allValues = Object.values(this.state.accelerateInfo);
        if(allValues.length == 0){
            return false;
        }

        for(var i = 0; i < allValues.length; i++){
            let acceleratUnitDic = allValues[i];
            if (acceleratUnitDic["speedup"] === "1") {
                return true;
            }
        }

        return false;
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
    emptyStyle: {
        marginLeft: 0,
        marginTop: 0,
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stopItemStyle: {
        marginLeft: 14,
        marginRight: 14,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 17,
        paddingRight: 17,
        borderRadius: 7,
        backgroundColor: '#153970',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonStyle: {
        width: 90,
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5CC00'
    },
    iconStyle: {
        width: 9.5,
        height: 16.5,
    },
    activeText: {
        marginLeft: 3,
        fontSize: 15,
        color: '#4F2F00'
    },
    rowFront: {
        backgroundColor: '#00132D',
        justifyContent: 'center',
        height: 90,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        backgroundColor: '#00132D'
    },
    deleteButton: {
        height: 90,
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
});