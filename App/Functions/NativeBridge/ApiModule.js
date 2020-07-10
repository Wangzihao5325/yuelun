import { NativeModules } from 'react-native';

const CApiClientManager = NativeModules.CApiClient;
/**
 * 发送验证码
 * @param {string} phoneNum 手机号码
 */
export const sendPhoneCode = async (phoneNum) => {
    let strRequest = await CApiClientManager.yuelunSendPhoneCode(phoneNum);
    return JSON.parse(strRequest);
}
/**
 * 
 * @param {string} phoneNum 手机号码
 * @param {string} code 验证码
 * @param {string} platform 平台 ios/android
 * @param {string} version app版本号
 */
export const loginByPhoneNum = async (phoneNum, code, platform, version) => {
    let strRequest = await CApiClientManager.yuelunPhoneLogin(phoneNum, code, platform, version);
    return JSON.parse(strRequest);
}