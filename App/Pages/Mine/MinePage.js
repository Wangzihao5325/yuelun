import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import PageName from '../../Config/PageName';
import * as navigator from '../../Router/NavigationService';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import { connect } from 'react-redux';
import * as SystemConfig from '../../Config/SystemConfig';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';

class MinePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VIPStatus: false,
            VIPStartTime: "",
            VIPEndTime: "",
            VIPTitle: '',
            VIPType: 3,
            VIPTimestamp : 0,
            type2Msg:'',
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            ApiModule.getTheUserInforWithSessionID().then((result) => {
                this.dealTheVIPStatus(result);
            });

            if(this.props.loginStatus){
                if(this.state.VIPStatus && this.state.VIPType == '2'){
                    this.startTheTimerInterval();
                }
            }
        });


        this._unfocusUnsubscribe = this.props.navigation.addListener('blur', () => {
            if (this.requestTimer) {
                clearInterval(this.requestTimer);
                this.requestTimer = null;
            }
        })
    }

    dealTheVIPStatus = (VIPdata = '') => {
        console.log('userInfo===>', VIPdata);
        let VIPStatus = false;
        if (VIPdata == '' || VIPdata.status == 'error') {
            this.setState({
                VIPStatus: false
            });
            return;
        }
        let VIPType = VIPdata.data.package_type
        let package_end_time = VIPdata.data.package_end_time ? VIPdata.data.package_end_time : "";
        let package_add_time = VIPdata.data.package_add_time ? VIPdata.data.package_add_time : "";
        if (package_add_time && package_end_time && package_add_time.length > 0 && package_end_time.length > 0) {
            VIPStatus = true;
        } else {

        }

        let timestamp = '';
        if(VIPType == '2'){
            timestamp = VIPdata.data.package_end_time ? VIPdata.data.package_end_time : 0;
        }

        this.setState({
            VIPStatus: VIPStatus,
            VIPStartTime: package_add_time,
            VIPEndTime: package_end_time,
            VIPTitle: VIPdata.data.package_name,
            VIPType:VIPType,
            VIPTimestamp:timestamp
        },()=>{
            if(VIPStatus && VIPType == '2'){
                this.startTheTimerInterval();
            }
        });
    }

    render() {
        let fullDevice = SystemConfig.theDeviceIsFullScreenMobilePhone();
        return (
            <View style={styles.container}>
                <ImageBackground
                    resizeMode='stretch'
                    source={require('../../resource/Image/Mine/mineBack.png')}
                    style={{ marginTop: 0, marginLeft: 0, marginBottom: fullDevice ? 50 : 20, width: SCREEN_WIDTH, height: SCREEN_WIDTH / 375 * 217.5, alignItems: 'center', }}>
                    {this.renderTheUserInforItem()}
                    {
                        this.state.VIPStatus
                            ?
                            this.renderTheVIPInfoView()
                            :
                            this.renderTheGuideToBuyVIPView()
                    }
                </ImageBackground>
                {this.renderTheSettingsItem(require('../../resource/Image/Mine/remind.png'), '公告消息', 1)}
                {this.renderTheSettingsItem(require('../../resource/Image/Mine/aboutUs.png'), '关于我们', 2)}
                {this.renderTheSettingsItem(require('../../resource/Image/Mine/setting.png'), '设置', 3)}
            </View>
        );
    }

    renderTheUserInforItem = () => {
        let fullDevice = SystemConfig.theDeviceIsFullScreenMobilePhone();
        return (
            <View style={[styles.userInfoRootView, { marginTop: fullDevice ? 120 : 90 }]}>
                {this.renderTheAvatorView()}
                {this.renderTheUserInformationView()}
            </View>
        );
    }

    renderTheAvatorView = () => {
        return (
            <View style={styles.avatorRootView}>
                <Image
                    source={require('../../resource/Image/Mine/avator.png')}
                    style={styles.avatorImageStyle}
                />
            </View>
        );
    }

    renderTheUserInformationView = () => {
        return (
            <View style={styles.inforRootView}>
                {
                    this.props.loginStatus
                        ?
                        <TouchableOpacity onPress={() => { this.clickTheCheckUserInformationFunction() }}>
                            <Text style={styles.nameStyle}>{this.props.userName}</Text>
                            <Text style={styles.showInfoText}>查看个人信息</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { this.clickTheLoginPage() }}>
                            <View style={styles.loginBtnStyle}>
                                <Text style={styles.loginTextStyle}>登录</Text>
                            </View>
                        </TouchableOpacity>

                }
            </View>
        );
    }

    renderTheGuideToBuyVIPView = () => {
        return (
            <ImageBackground
                resizeMode='stretch'
                source={require('../../resource/Image/Mine/VIPRoot.png')}
                style={styles.backImageStyle}>
                <Image style={styles.VIPIcon} source={require('../../resource/Image/Mine/VIPicon.png')} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.buyVIPRootStyle}>立即开通会员</Text>
                </View>
                <TouchableOpacity style={styles.buyBtnRoot} onPress={() => {
                    if (this.props.loginStatus) {
                        //let url = 'http://192.168.0.101:3000';
                        let url = 'https://pages.yuelun.com/mobile/pay';
                        if (this.state.VIPType === '3' || this.state.VIPType === undefined) {
                            navigator.jump(this, PageName.NORMAL_VIP_BUY_WEB, { url: url, type: 'center' });
                        } else {
                            navigator.alert({
                                title: '提示',
                                content: 'PC套餐续费请前往官网购买，移动端只支持移动端套餐续费',
                                bottomObjs: [
                                    {
                                        key: 'confirm',
                                        type: 'button',
                                        title: '确认',
                                    }
                                ]
                            });
                        }
                    } else {
                        navigator.jump(this, PageName.NORAML_LOGIN_PAGE);
                    }
                }}>
                    <Text style={styles.buyStyle}>立即开通</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    renderTheVIPInfoView = () => {
        let timeMsg = '';
        if(this.state.VIPType == '2'){
            timeMsg = '剩余' + this.state.type2Msg;
        }else{
            timeMsg = this.state.VIPEndTime;
        }

        return (
            <ImageBackground
                resizeMode='stretch'
                source={require('../../resource/Image/Mine/VIPRoot.png')}
                style={styles.backImageStyle}>
                <Image style={[styles.VIPIcon, { marginTop: -20 }]} source={require('../../resource/Image/Mine/VIPicon.png')} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.buyVIPRootStyle}>{`${this.state.VIPTitle}`}</Text>
                    <Text style={styles.VIPTimeInfoStyle}>{timeMsg + "到期"}</Text>
                </View>
                <TouchableOpacity style={styles.buyBtnRoot} onPress={() => {
                    if (this.props.loginStatus) {
                        let url = 'https://pages.yuelun.com/mobile/pay';
                        if (this.state.VIPType === '3' || this.state.VIPType === undefined) {
                            navigator.jump(this, PageName.NORMAL_VIP_BUY_WEB, { url: url, type: 'center' });
                        } else {
                            navigator.alert({
                                title: '提示',
                                content: 'PC套餐续费请前往官网购买，移动端只支持移动端套餐续费',
                                bottomObjs: [
                                    {
                                        key: 'confirm',
                                        type: 'button',
                                        title: '确认',
                                    }
                                ]
                            });
                        }
                    } else {
                        navigator.jump(this, PageName.NORAML_LOGIN_PAGE);
                    }
                }}>
                    <Text style={styles.buyStyle}>立即续费</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }

    renderTheSettingsItem = (icon, title, type) => {
        return (
            <TouchableOpacity onPress={() => {
                this.clickTheSettingFunction(type);
            }}>
                <View style={styles.settingRoot}>
                    <Image style={styles.settingIcon} source={icon} />
                    <Text style={styles.textStyle}>{title}</Text>
                    <Image
                        source={require('../../resource/Image/GameHomePage/more.png')}
                        style={styles.setIcon} />
                </View>
            </TouchableOpacity>
        );
    }

    clickTheSettingFunction = (type) => {
        if (type == 1) {
            navigator.jump(this, PageName.NORMAL_NOTICE);
        } else if (type == 2) {
            navigator.jump(this, PageName.NORMAL_ABOUT_US);
        } else if (type == 3) {
            if (this.props.loginStatus) {
                navigator.jump(this, PageName.NORMAL_PAGE_SETTING);
            } else {
                navigator.jump(this, PageName.NORAML_LOGIN_PAGE);
            }

        }
    }


    clickTheLoginPage = () => {
        navigator.jump(this, PageName.NORAML_LOGIN_PAGE);
    }

    clickTheCheckUserInformationFunction = () => {
        navigator.jump(this, PageName.NORMAL_PERSONAL_INFO);
    }

    calculateTheTimeBomb = () =>{
        let VIPTimestamp = this.state.VIPTimestamp;
        let timestamp = this.state.VIPTimestamp - 1;
        let h = parseInt(VIPTimestamp / 3600);
        VIPTimestamp = VIPTimestamp - h * 3600;
        let m = parseInt(VIPTimestamp / 60);
        let s = VIPTimestamp - m * 60;

        let type2Msg = h+'小时'+m+'分钟'+s+'秒后';
        console.log('剩余时间'+h+'小时'+m+'分钟'+s+'秒');

        this.setState({
            VIPTimestamp:timestamp,
            type2Msg:type2Msg
        });
    }

    startTheTimerInterval = () => {
        if (this.state.VIPType != '2') {
            this.destroyTheTimer();
            return;
        }

        /** 重启timer则先销毁原timer，保证定时器的唯一性，避免野指针*/
        this.destroyTheTimer();
        this.requestTimer = setInterval(() => {
            this.calculateTheTimeBomb();
        }, 1000);
    }

    destroyTheTimer = () => {
        this.requestTimer && clearInterval(this.requestTimer);
    }
}

const mapStateToProps = (state) => ({
    loginStatus: state.user.isLogin,
    userIcon: state.user.head_url,
    userName: state.user.username,
    sessionID: state.user.session_id,
})

export default connect(mapStateToProps)(MinePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00132D'
    },
    userInfoRootView: {
        marginTop: 90,
        marginLeft: 0,
        width: SCREEN_WIDTH,
        height: 60,
        flexDirection: 'row'
    },
    avatorRootView: {
        flex: 1,
    },
    inforRootView: {
        flex: 5,
        justifyContent: 'center'
    },
    avatorImageStyle: {
        width: 60,
        height: 60,
        marginLeft: 20,
        borderRadius: 30,
    },
    loginBtnStyle: {
        marginLeft: 30,
        width: 80,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F6CA6F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTextStyle: {
        fontSize: 13,
        color: '#4F2F00'
    },
    nameStyle: {
        fontSize: 18,
        color: 'white',
        marginLeft: 30
    },
    showInfoText: {
        fontSize: 12,
        color: 'white',
        marginTop: 8,
        marginLeft: 30
    },
    backImageStyle: {
        marginLeft: 10,
        marginTop: 19,
        width: SCREEN_WIDTH - 30,
        height: 60,
        resizeMode: 'contain',
        flexDirection: 'row',
        alignItems: 'center'
    },
    VIPIcon: {
        width: 18,
        height: 15,
        resizeMode: 'contain',
        marginLeft: 15
    },
    buyBtnRoot: {
        width: 84.5,
        height: 29,
        borderRadius: 14.5,
        backgroundColor: '#CF853C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    buyVIPRootStyle: {
        marginLeft: 8,
        fontSize: 16,
        color: '#452C00',
    },
    VIPTimeInfoStyle: {
        marginLeft: 8,
        marginTop: 2.5,
        fontSize: 12,
        color: '#452C00',
    },
    buyStyle: {
        fontSize: 11,
        color: '#452C00'
    },
    settingRoot: {
        marginTop: 0,
        marginLeft: 0,
        width: SCREEN_WIDTH,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 24,
        height: 24,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    setIcon: {
        width: 7,
        height: 12,
        marginRight: 30
    },
    textStyle: {
        fontSize: 17,
        color: 'white',
        marginLeft: 28.5,
        flex: 1
    }
});