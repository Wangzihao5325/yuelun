/** 
 * Program UI configuration
 * 
 * You can add or change the color、 UI frame`s config in this document. 
 * So you can use and manage the global UI Item`s properties. 
 * 
 * creat by Charlie on 2019-08-19
*/

import {
    StyleSheet,
    Platform,
    Dimensions,
    PixelRatio,
    StatusBar,
} from 'react-native';

import * as SystemConfig from './SystemConfig';

const iPhoneX_width = 375;
const iPhoneX_height = 812;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BannerWidth = SCREEN_WIDTH;
export const BannerHeight = SCREEN_WIDTH * 360 / 750;

const getTheNavigatorTabBarHeight = () => {
    if (SystemConfig.theDeviceIsFullScreenMobilePhone()) {
        if (Platform.OS === 'ios') {
            return 88;
        } else {
            return 88
        }
    } else {
        if (Platform.OS === 'ios') {
            return 64;
        } else {
            return 64;
        }
    }
}

const getTheNavigatorMarginTopHeight = () => {
    if (SystemConfig.theDeviceIsFullScreenMobilePhone()) {
        if (Platform.OS === 'ios') {
            return 44;
        } else {
            return 24
        }
    } else {
        if (Platform.OS === 'ios') {
            return 24;
        } else {
            return 24;
        }
    }
}

export const NavigatorBarHeight = getTheNavigatorTabBarHeight();
export const NavigatorTop = getTheNavigatorMarginTopHeight();
export const NavigatorViewHeight = NavigatorBarHeight - NavigatorTop;

export const themeColor = {
    tabDefaultColor: 'black',
    tabSelectedColor: 'blue',
    mainColor: '#F34966',    // 主色
    bgContent: '#FFFFFF',    // 辅色
    bgColor: '#01142c',    // 背景色
    headerBgColor: '#01142c',//页面header背景色
    inputBgColor: '#1a4482',//输入框默认背景色
    AIA_Red: '#DA3342',
    Text_Light_Grey: '#B3B3B6',
    Text_Grey: '#6B6A78',
    Dividing_Line: '#B3B3B6',
    navigatorTxtColor: '#fff'
}

export const fontSize = {
    navigatorTxtSize: 14
}

export const CustomButtonIcon = {
    width: 25,
    height: 25,
    absoluteLeft: 15
}