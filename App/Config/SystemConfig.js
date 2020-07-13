/** 
 * System configuration
 * 
 * You can add or change the parameter data f system.
 * 
 * creat by Charlie on 2020-03-24
*/

import {
    StyleSheet,
    Platform,
    Dimensions,
    PixelRatio,
    StatusBar,
} from 'react-native';

import * as UIConfig from './UIConfig';

export const appVersion = '0.0.1';

export const interceptTime = 500;     //time for intercept click the button repeatedly 

export function theDeviceIsFullScreenMobilePhone() {
    let fullScreenMobile = false;
    if (Platform.OS === 'ios') {
        if (UIConfig.SCREEN_WIDTH == 375 && UIConfig.SCREEN_HEIGHT == 812) {
            fullScreenMobile = true;
        } else if (UIConfig.SCREEN_WIDTH == 414 && UIConfig.SCREEN_HEIGHT == 896) {
            fullScreenMobile = true;
        }
    } else if (Platform.OS === 'android') {

    }
    if (fullScreenMobile) {
        console.log('获取片面屏幕', UIConfig.SCREEN_WIDTH, UIConfig.SCREEN_HEIGHT);
    }

    return fullScreenMobile;
}