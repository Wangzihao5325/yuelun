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
    Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import CustomButton from '../../Components/Component/CustomButton';
import store from '../../store';
import { login_user_info_init } from '../../store/actions/userAction';
import { init_can_scroll, app_login, app_start_app } from '../../store/actions/appAction';
import { getTheUserInforWithSessionID, _unsafe_setSession, getAppNewConfig } from '../../Functions/NativeBridge/ApiModule';
import { appVersion } from '../../Config/SystemConfig';

const SPLASH_DATA = [
    {
        title: '精选游戏',
        source: require('../../resource/Image/Splash/splash_1.png'),
        index: 1,
        key: 'splash_1'
    },
    {
        title: '同时加速',
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
                    <Text style={styles.sologan}>{'月轮手游加速器\n多个游戏同时加速'}</Text>
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
                                if (res.status == 'ok') {
                                    store.dispatch(login_user_info_init({
                                        ...userData.data,
                                        mobile: res.data.tel,
                                        username: res.data.username,
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
                this._appInit()
            } else {
                let url = Platform.OS === 'ios' ? res.data.ios_download_url : res.data.android_download_url;
                Alert.alert(
                    "请更新App",
                    "点击确认，下载最新版本",
                    [
                        {
                            text: "OK", onPress: () => {
                                if (url) {
                                    Linking.canOpenURL(url).then(res => {
                                        Linking.openURL(url)
                                    })
                                }
                            }
                        }
                    ]
                );
            }
        })
    }
    render() {
        return (
            <FlatList
                style={{ backgroundColor: '#00132C' }}
                horizontal={true}
                pagingEnabled={true}
                data={SPLASH_DATA}
                renderItem={({ item }) => <Item {...item} itemClick={this.goToLogin} />}
                scrollEnabled={this.props.scrollEnabled}
            />
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