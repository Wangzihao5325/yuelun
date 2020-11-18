import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    FlatList,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
    AsyncStorage,
    Alert,
    Modal,
    Linking,
    PermissionsAndroid
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import CustomButton from '../../Components/Component/CustomButton';
import store from '../../store';
import { login_user_info_init } from '../../store/actions/userAction';
import { init_can_scroll, app_login, app_start_app } from '../../store/actions/appAction';
import { getTheUserInforWithSessionID, _unsafe_setSession, getAppNewConfig } from '../../Functions/NativeBridge/ApiModule';
import { appVersion } from '../../Config/SystemConfig';
import { HeartParams } from '../../store/actions/userAction';
import Progress from '../../Components/Component/ProgressRate';
import RNFetchBlob from 'rn-fetch-blob';
const SPLASH_DATA = [
    {
        title: '精选游戏',
        source: require('../../resource/Image/Splash/splash_1.png'),
        index: 1,
        key: 'splash_1'
    },
    {
        title: '智能加速',
        source: require('../../resource/Image/Splash/splash_2.png'),
        index: 2,
        key: 'splash_2'
    },
    {
        title: '月轮加速',
        source: require('../../resource/Image/Splash/splash_3.png'),
        index: 3,
        key: 'splash_3'
    }
];

const Item = (props) => {
    return (
        <ImageBackground
            style={styles.imageBg}
            resizeMode='contain'
            source={props.source}
        >
            <SafeAreaView style={styles.safe}>
                <Text style={styles.title}>{`${props.title}`}</Text>
                <View style={styles.bottomContainer}>
                    <Text style={styles.sologan}>{'月轮手游加速器\n多款游戏尽情畅玩'}</Text>
                    {
                        props.index === 3 &&
                        <CustomButton
                            title='立即体验'
                            buttonStyle={styles.startAppBtn}
                            titleStyle={{ color: '#503000', fontSize: 18.5 }}
                            clickEvent={props.itemClick}
                        />
                    }
                    <View style={styles.indexPtContainer}>
                        {
                            [1, 2, 3].map((item) => {
                                let highlightStyle = item === props.index ? { backgroundColor: '#3f7fff' } : null
                                return <View key={item} style={[styles.defaultPt, highlightStyle]} />
                            })
                        }
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default class InitPage extends Component {
    state = {
        isShow: false,
        testDirs: ''
    }
    _appInit = () => {
        AsyncStorage.getItem('isFirstUse').then(useValue => {
            if (!useValue) {
                AsyncStorage.setItem('isFirstUse', 'done');
                store.dispatch(init_can_scroll());
            } else {
                AsyncStorage.getItem('userInfo').then(value => {
                    if (value) {
                        let userData = JSON.parse(value);
                        let sessionId = userData.data.session_id;
                        if (sessionId) {
                            _unsafe_setSession(sessionId);
                            //使用本地token来获取用户信息，以此验证token的有效性
                            getTheUserInforWithSessionID().then((res) => {
                                if (res.status == 'ok' && res?.data?.type == 'normal') {
                                    store.dispatch(login_user_info_init({
                                        ...userData.data,
                                        mobile: res.data.tel,
                                        username: res.data.nickname,
                                        package_name: res.data.package_name,
                                        package_end_time: res.data.package_end_time
                                    }));
                                    store.dispatch(app_start_app());
                                } else {
                                    //自动登录失败，跳转登录界面
                                    store.dispatch(app_login());
                                }
                            })
                        } else {
                            store.dispatch(app_login());
                        }
                    } else {
                        store.dispatch(app_login());
                    }
                }).catch(reason => {
                    store.dispatch(init_can_scroll());
                });
            }
        })
    }

    componentDidMount() {

        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#00132C');
        }
        getAppNewConfig().then(res => {
            let last_version = res?.data?.last_version ?? '';
            if (last_version === appVersion) {
                let interval = parseInt(res?.data?.interval ?? '300') * 1000;
                HeartParams.stepReg = interval >= 10000 ? interval : 10000;
                this._appInit()
            } else {
                let url = Platform.OS === 'ios' ? res.data.ios_download_url : res.data.android_download_url;
                Alert.alert(
                    "请更新App",
                    "点击确认，下载最新版本",
                    [
                        {
                            text: "OK", onPress: async () => {
                                if (url) {
                                    const granted = await PermissionsAndroid.request(
                                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                                        {
                                            title: "请求权限",
                                            message: "系统需要权限来下载最新版本",
                                            buttonNegative: "Cancel",
                                            buttonPositive: "OK"
                                        }
                                    );
                                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                        this.setState({
                                            isShow: true,
                                            progress: 0
                                        })

                                        const android = RNFetchBlob.android;
                                        let dirs = RNFetchBlob.fs.dirs;
                                        this.setState({
                                            testDirs: dirs.DownloadDir
                                        })
                                        RNFetchBlob.config({
                                            useDownloadManager: true,
                                            title: "xxxxx.apk",
                                            description: "An APK that will be installed",
                                            mime: "application/vnd.android.package-archive",
                                            path: `${dirs.DownloadDir}/yuelun.apk`,
                                            mediaScannable: true,
                                            notification: true
                                        })
                                            .fetch('GET', url)
                                            .progress((received, total) => {
                                                let progress = Math.floor((received / total) * 100);
                                                this.setState({
                                                    progress
                                                })
                                            })
                                            .then((res) => {
                                                this.setState({
                                                    progress: 100
                                                })
                                                android.actionViewIntent(
                                                    res.path(),
                                                    "application/vnd.android.package-archive"
                                                );
                                            })
                                    } else {
                                    }
                                }
                            }
                        }

                    ]
                );
            }
        })
    }

    hide = () => {
        this.setState({
            isShow: false
        })
    }
    render() {
        return (
            <>
                <Modal
                    transparent={true}
                    visible={this.state.isShow}
                    onRequestClose={this.hide}>
                    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center' }}>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ color: 'red' }}>{`${this.state.testDirs}`}</Text>
                            <Progress value={this.state.progress} />
                        </View>
                    </View>
                </Modal>
                <FlatList
                    style={{ backgroundColor: '#00132C' }}
                    horizontal={true}
                    pagingEnabled={true}
                    data={SPLASH_DATA}
                    renderItem={({ item }) => <Item {...item} itemClick={this.goToLogin} />}
                    scrollEnabled={this.props.scrollEnabled}
                />
            </>
        );
    }

    goToLogin = () => {
        store.dispatch(app_login());
    }
}

const styles = StyleSheet.create({
    imageBg: {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: '#00132C'
    },
    safe: {
        flex: 1,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 39.64,
        marginTop: 43.5,
        alignSelf: 'center',
        color: '#fff'
    },
    sologan: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'PingFang-SC-Medium',
        letterSpacing: 13,
        lineHeight: 31,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: '400'
    },
    bottomContainer: {
        height: 180,
        width: 300,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    indexPtContainer: {
        flexDirection: 'row',
        width: 37,
        height: 8,
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    defaultPt: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#224281'
    },
    startAppBtn: {
        display: 'flex',
        height: 36.5,
        width: 131,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5cc00',
        borderRadius: 18.25,
        alignSelf: 'center',
    }
});