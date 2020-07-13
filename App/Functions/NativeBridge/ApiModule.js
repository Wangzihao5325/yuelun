import { NativeModules, Platform } from 'react-native';
import Mock from '../../Mock';
//是否启用mock数据
const isMock = Platform.OS === 'ios';

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
 * 移动端登录
 * @param {string} phoneNum 手机号码
 * @param {string} code 验证码
 * @param {string} platform 平台 ios/android
 * @param {string} version app版本号
 */
export const loginByPhoneNum = async (phoneNum, code, platform, version) => {
    let strRequest = await CApiClientManager.yuelunPhoneLogin(phoneNum, code, platform, version);
    return JSON.parse(strRequest);
}
/**
 * 连接服务器验证信心，下发加速需要使用的数据-(什么意思我也不懂，需要询问后台大哥)
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} gameId 加速游戏id
 * @param {string} serverId 加速使用服务器id
 */
export const connectServer = async (sessionId, gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunConnectServer(sessionId, gameId, serverId);
    return JSON.parse(strRequest);
}
/**
 * 停止加速的时候，断开加速请求
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} serverId 加速使用服务器id
 */
export const disConnectServer = async (sessionId, serverId) => {
    let strRequest = await CApiClientManager.yuelunDisConnectServer(sessionId, serverId);
    return JSON.parse(strRequest);
}
/**
 * 根据需要加速的游戏id，获取游戏路由策略等详情
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} gameId 要加速的游戏id
 * @param {string} gameToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getGameInfoById = async (sessionId, gameId, gameToken) => {
    let strRequest = await CApiClientManager.yuelunGetGameInfoById(sessionId, gameId, gameToken);
    return JSON.parse(strRequest);
}
/**
 * 获取所有的游戏信息，包括游戏id,游戏名，游戏图标路径，下载路径等
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} listToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getAllGameConfig = async (sessionId, listToken) => {
    if (isMock) {
        return Mock.homeResult;
    }
    let strRequest = await CApiClientManager.yuelunGetAllGameConfig(sessionId, listToken);
    return JSON.parse(strRequest);
}
/**
 * 退出登录
 * @param {string} sessionId 用户登录获取到的session
 */
export const logout = async (sessionId) => {
    let strRequest = await CApiClientManager.yuelunPhoneLoginout(sessionId);
    return JSON.parse(strRequest);
}
/**
 * 心跳包检查
 * @param {*} sessionId 用户登录获取到的session
 * @param {*} gameId 可以为空，若有加速游戏则传游戏id
 * @param {*} serverId 可以为空，若有加速游戏则传当前使用服务器id列表
 */
export const checkHeart = async (sessionId, gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunCheckHear(sessionId, gameId, serverId);
    return JSON.parse(strRequest);
}
/**
 * news list
 */
export const getNewsList = async () => {
    let strRequest = await CApiClientManager.yuelunGetNewsList();
    return JSON.parse(strRequest);
}
/**
 * ad list
 */
export const getAdList = async () => {
    let strRequest = await CApiClientManager.yuelunGetAdList();
    return JSON.parse(strRequest);
}

export const modifyUserInfo = async (sessionId, phoneNum, verificationCode, name, avater) => {
    let strRequest = await CApiClientManager.yuelunModifUserInfo(sessionId, phoneNum, verificationCode, name, avater);
    return JSON.parse(strRequest);
}