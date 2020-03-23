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

const iPhoneX_width  = 375;
const iPhoneX_height = 812;

export const SCREEN_WIDTH  = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const BannerWidth   = SCREEN_WIDTH;
export const BannerHeight  = SCREEN_WIDTH * 360 / 750;

export const themeColor = {
    tabDefaultColor  : 'black',
    tabSelectedColor : 'blue',
    mainColor        : '#F34966',    // 主色
    bgContent        : '#FFFFFF',    // 辅色
    bgColor          : '#F6F8FC',    // 背景色
}