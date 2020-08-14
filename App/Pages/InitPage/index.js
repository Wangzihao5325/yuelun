import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    FlatList,
    Text,
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../Config/UIConfig';
import CustomButton from '../../Components/Component/CustomButton';
import store from '../../store';
import { app_login } from '../../store/actions/appAction';

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
    componentDidMount() {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#00132C');
        }
    }
    render() {
        return (
            <FlatList
                style={{ backgroundColor: '#00132C' }}
                horizontal={true}
                pagingEnabled={true}
                data={SPLASH_DATA}
                renderItem={({ item }) => <Item {...item} itemClick={this.goToLogin} />}
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