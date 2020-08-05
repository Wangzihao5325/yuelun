import { NativeModules, Platform } from 'react-native';
import Mock from '../../Mock';
import { call } from 'react-native-reanimated';
//是否启用mock数据
const iOSPlatform = Platform.OS === 'ios';
const CApiClientManager = NativeModules.CApiClient;
const ApiHelper = NativeModules.ApiHelper;
let _sessionId = '2be8dc1d25fe84149fa5ee03bdf143282f2e555b';
/**
 * 发送验证码
 * @param {string} phoneNum 手机号码
 */
export const sendPhoneCode = async (phoneNum, callBack) => {
    if (iOSPlatform) {
        let searchRequest = await ApiHelper.getThePhoneCode(phoneNum, callBack);
        return JSON.parse(searchRequest);
    } else {
        let strRequest = await CApiClientManager.yuelunSendPhoneCode(phoneNum);
        return JSON.parse(strRequest);
    }

}
/**
 * 移动端登录
 * @param {string} phoneNum 手机号码
 * @param {string} code 验证码
 * @param {string} platform 平台 ios/android
 * @param {string} version app版本号
 */
export const loginByPhoneNum = async (phoneNum, code, platform, version, callBack) => {
    if (iOSPlatform) {
        let searchRequest = await ApiHelper.userLoginWithPhoneNum(phoneNum, code, platform, version, callBack);
        return JSON.parse(searchRequest);
    } else {
        let strRequest = await CApiClientManager.yuelunPhoneLogin(phoneNum, code, platform, version);
        let result = JSON.parse(strRequest);
        _sessionId = result.data.session_id;
        return result;
    }
}
/**
 * 连接服务器验证信心，下发加速需要使用的数据-(什么意思我也不懂，需要询问后台大哥)
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} gameId 加速游戏id
 * @param {string} serverId 加速使用服务器id
 */
export const connectServer = async (gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunConnectServer(_sessionId, gameId, serverId);
    return JSON.parse(strRequest);
}
/**
 * 停止加速的时候，断开加速请求
 * @param {string} serverId 加速使用服务器id
 */
export const disConnectServer = async (serverId) => {
    let strRequest = await CApiClientManager.yuelunDisConnectServer(_sessionId, serverId);
    return JSON.parse(strRequest);
}
/**
 * 根据需要加速的游戏id，获取游戏路由策略等详情
 * @param {string} gameId 要加速的游戏id
 * @param {string} gameToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getGameInfoById = async (gameId, gameToken) => {
    let strRequest = await CApiClientManager.yuelunGetGameInfoById(_sessionId, gameId, gameToken);
    return JSON.parse(strRequest);
}
/**
 * 获取所有的游戏信息，包括游戏id,游戏名，游戏图标路径，下载路径等
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} listToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getAllGameConfig = async (listToken, callBack) => {
    if (iOSPlatform) {
        let strRequest = await ApiHelper.yuelunGetAllGameConfigWithSessionId(_sessionId, listToken, callBack);
        return JSON.parse(strRequest);
    } else {
        let strRequest = await CApiClientManager.yuelunGetAllGameConfig(_sessionId, listToken);
        return JSON.parse(strRequest);
    }

}
/**
 * 退出登录
 */
export const logout = async () => {
    let strRequest = await CApiClientManager.yuelunPhoneLoginout(_sessionId);
    return JSON.parse(strRequest);
}
/**
 * 心跳包检查
 * @param {*} sessionId 用户登录获取到的session
 * @param {*} gameId 可以为空，若有加速游戏则传游戏id
 * @param {*} serverId 可以为空，若有加速游戏则传当前使用服务器id列表
 */
export const checkHeart = async (gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunCheckHear(_sessionId, gameId, serverId);
    return JSON.parse(strRequest);
}
/**
 * 获取公告信息
 * @param {string} page 页码，不传默认第一页
 * @param {string} limits 页数，不传默认每页10条
 */
export const getNewsList = async (page, limits) => {
    let strRequest = await CApiClientManager.yuelunGetNewsList(page, limits);
    return JSON.parse(strRequest);
}
/**
 * ad list
 */
export const getAdList = async () => {
    let strRequest = await CApiClientManager.yuelunGetAdList();
    return JSON.parse(strRequest);
}

/**
 * 
 * @param {string} phoneNum 用户手机号
 * @param {string} verificationCode 验证码
 * @param {string} name 要修改的用户名
 * @param {string} avater 要修改的的头像图片文件
 */

export const modifyUserInfo = async (phoneNum, verificationCode, name, avater) => {
    let strRequest = await CApiClientManager.yuelunModifUserInfo(_sessionId, phoneNum, verificationCode, name, avater);
    return JSON.parse(strRequest);
}

/**
 * 搜索
 * @param {string} gameName 用户手机号
 * @param {string} typeName 验证码
 * @param {string} strclassification 要修改的用户名
 */

export const search = async (gameName, typeName, strclassification,page='',step='') => {
    let strRequest = await CApiClientManager.yuelunSearchGamelist(_sessionId, encodeURIComponent(gameName), typeName, strclassification,page,step);
    return JSON.parse(strRequest);
}

/**
 * 反馈
 * @param {string} strgameids 收藏游戏ID （1,2,3,4,5）字符串
 */

export const suggest = async (strcontent, strcontact) => {
    let strRequest = await CApiClientManager.yuelunSaveFeedBack(_sessionId, strcontent, strcontact);
    return JSON.parse(strRequest);
}

/*
 * 获取banner数据
 * 
*/
export const getTheBannerData = async (callBack) => {
    if (iOSPlatform) {
        let strRequest = await ApiHelper.getTheBannerDataCallBack(callBack);
        return JSON.parse(strRequest);
    } else {

    }
}

/**
 * 获取用户信息
*/
export const getTheUserInforWithSessionID = async ( callBack) => {
    if (iOSPlatform) {
        let strRequest = await ApiHelper.getTheUserInforWithSessionID(_sessionId);
        callBack(JSON.parse(strRequest))
        return JSON.parse(strRequest);
    } else {
        let strRequest = await CApiClientManager.yuelunGetUserInfo(_sessionId);
        return JSON.parse(strRequest);
    }
}

/**
 * 获取更多游戏接口
 * 
*/
export const getSearchGamesData = async (sessionId,game_name,type_name = '',pages= '',classification = '',callBack) => {
    if(iOSPlatform){
        let searchRequest = await ApiHelper.getTheSearchResultWithSessionIDd(sessionId,game_name,type_name,pages,classification,callBack);
        return JSON.parse(searchRequest);
    } else {

    }
}

/**
 * 获取用户所有的收藏游戏
 * 
*/
export const getAllUserCollectGames = async (callBack) => {
    if (iOSPlatform) {
        let requestStr = await ApiHelper.getTheUserCollectGames(_sessionId, callBack);
        return JSON.parse(requestStr);
    } else {
        let strRequest = await CApiClientManager.yuelunGetCollection(_sessionId);
        return JSON.parse(strRequest);
    }
}

/**
 * 更新收藏游戏
 * 
*/
export const YuelunSverCollection = async (gameIDArray, callBack) => {
    if (iOSPlatform) {
        let resultStr = await ApiHelper.YuelunSverCollection(_sessionId, gameIDArray, callBack);
        return JSON.parse(resultStr);
    } else {
        let strRequest = await CApiClientManager.yuelunSverCollection(_sessionId, gameIDArray);
        return JSON.parse(strRequest);
    }
}

/**
 * 退出登录
 * 
*/
export const userLogoutWithSessionID = async (sessionId, callBack) => {
    if (iOSPlatform) {
        let resultStr = await ApiHelper.userLogoutWithSessionID(sessionId, callBack);
        return JSON.parse(resultStr);
    } else {

    }
}

/*
 * 获取热门游戏
 */
export const getTheHotGames = async(callBack)=>{
    if(iOSPlatform){
        let resultStr = await ApiHelper.YuelunHotGameList(_sessionId,callBack);
        return JSON.parse(resultStr);
    }else{

    }
}

/**
 * 消息反馈
 * 
*/
export const sendTheFeedbackWithTheSessionID = async (suggestion,contactValue,callBack) =>{
    if(iOSPlatform){
        console.log('feedbackfeedback',_sessionId);
        let resultStr = await ApiHelper.sendTheFeedbackWithTheSessionID(_sessionId,suggestion,contactValue,callBack);
        return JSON.parse(resultStr);
    }else{

    }
}
