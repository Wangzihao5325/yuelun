import { NativeModules, Platform } from 'react-native';

//是否启用mock数据
const CApiClientManager = NativeModules.CApiClient;

export let _sessionId = '';

function _dealResult(strRequest) {
    if(_sessionId !== ''){
        checkHeart('','').then((result) => {

        });
    }

    if (strRequest) {
        return JSON.parse(strRequest);
    } else {
        return { status: 'error', msg: '接口未响应(code:-1)' }
    }
}

export const _unsafe_setSession = (session) => {
    _sessionId = session;
}

/**
 * 获取app配置信息，协商ip
 */
export const getAppNewConfig = async () => {
    let strRequest = await CApiClientManager.yuelunGetNewConfig();
    return _dealResult(strRequest);
}

/**
 * 发送验证码
 * @param {string} phoneNum 手机号码
 */
export const sendPhoneCode = async (phoneNum) => {
    let strRequest = await CApiClientManager.yuelunSendPhoneCode(phoneNum);
    return _dealResult(strRequest);
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
    let result = _dealResult(strRequest)
    _sessionId = result.data?.session_id;
    return result;
}
/**
 * 连接服务器验证信心，下发加速需要使用的数据-(什么意思我也不懂，需要询问后台大哥)
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} gameId 加速游戏id
 * @param {string} serverId 加速使用服务器id
 */
export const connectServer = async (gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunConnectServer(_sessionId, gameId, serverId);
    return _dealResult(strRequest);
}
/**
 * 停止加速的时候，断开加速请求
 * @param {string} serverId 加速使用服务器id
 */
export const disConnectServer = async (serverId) => {
    let strRequest = await CApiClientManager.yuelunDisConnectServer(_sessionId, serverId);
    return _dealResult(strRequest);
}
/**
 * 根据需要加速的游戏id，获取游戏路由策略等详情
 * @param {string} gameId 要加速的游戏id
 * @param {string} gameToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getGameInfoById = async (gameId, gameToken) => {
    let strRequest = await CApiClientManager.yuelunGetGameInfoById(_sessionId, gameId, gameToken);
    return _dealResult(strRequest);
}
/**
 * 获取所有的游戏信息，包括游戏id,游戏名，游戏图标路径，下载路径等
 * @param {string} sessionId 用户登录获取到的session
 * @param {string} listToken token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
 */
export const getAllGameConfig = async (listToken) => {
    let strRequest = await CApiClientManager.yuelunGetAllGameConfig(_sessionId, listToken);
    return _dealResult(strRequest);
}

/**
 * 心跳包检查
 * @param {*} sessionId 用户登录获取到的session
 * @param {*} gameId 可以为空，若有加速游戏则传游戏id
 * @param {*} serverId 可以为空，若有加速游戏则传当前使用服务器id列表
 */
export const checkHeart = async (gameId, serverId) => {
    let strRequest = await CApiClientManager.yuelunCheckHear(_sessionId, gameId, serverId);
    //心跳包不能走_dealResult会递归调用
    return JSON.parse(strRequest);
}
/**
 * 获取公告信息
 * @param {string} page 页码，不传默认第一页
 * @param {string} limits 页数，不传默认每页10条
 */
export const getNewsList = async (page, limits) => {
    let strRequest = await CApiClientManager.yuelunGetNewsList(page, limits);
    return _dealResult(strRequest);
}

/**
 * 
 * @param {string} phoneNum 用户手机号
 * @param {string} verificationCode 验证码
 * @param {string} name 要修改的用户名
 * @param {string} avater 要修改的的头像图片文件
 */

export const modifyUserInfo = async (phoneNum, verificationCode, name, avater) => {
    let strRequest = await CApiClientManager.yuelunModifyUserInfo(_sessionId, phoneNum, verificationCode, encodeURIComponent(name), avater);
    return _dealResult(strRequest);
}

/**
 * 搜索
 * @param {string} gameName 用户手机号
 * @param {string} typeName 验证码
 * @param {string} strclassification 要修改的用户名
 */

export const search = async (gameName, typeName, strclassification, page = '', step = '') => {
    let strRequest = await CApiClientManager.yuelunSearchGamelist(_sessionId, encodeURIComponent(gameName), typeName, strclassification, page, step);
    return _dealResult(strRequest);
}

/**
 * 反馈
 * @param {string} strgameids 收藏游戏ID （1,2,3,4,5）字符串
 */

export const suggest = async (strcontent, strcontact) => {
    let strRequest = await CApiClientManager.yuelunSaveFeedBack(_sessionId, strcontent, strcontact);
    return _dealResult(strRequest);
}

/*
 * 获取banner数据
 * 
*/
export const getTheBannerData = async () => {
    let strRequest = await CApiClientManager.yuelunGetAdList();
    return _dealResult(strRequest);
}

/**
 * 获取用户信息
*/
export const getTheUserInforWithSessionID = async () => {
    let strRequest = await CApiClientManager.yuelunGetUserInfo(_sessionId);
    return _dealResult(strRequest);
}

/**
 * 搜索游戏接口
 * 
*/
export const getSearchGamesData = async (game_name, typeName = '', page = '', strclassification = '', limit = '') => {
    let strRequest = await CApiClientManager.yuelunSearchGamelist(_sessionId, encodeURIComponent(game_name), encodeURIComponent(typeName), encodeURIComponent(strclassification), page, limit);
    return _dealResult(strRequest);
}

/**
 * 获取用户所有的收藏游戏
 * 
*/
export const getAllUserCollectGames = async () => {
    let strRequest = await CApiClientManager.yuelunGetCollection(_sessionId);
    return _dealResult(strRequest);
}

/**
 * 更新收藏游戏
 * 
*/
export const YuelunSverCollection = async (gameIDArray) => {
    let strRequest = await CApiClientManager.yuelunSaveCollection(_sessionId, encodeURIComponent(gameIDArray));
    return _dealResult(strRequest);
}

/**
 * 退出登录
 * 
*/
export const userLogoutWithSessionID = async () => {
    let strRequest = await CApiClientManager.yuelunPhoneLoginout(_sessionId);
    return _dealResult(strRequest);
}

/*
 * 获取热门游戏
 */
export const getTheHotGames = async () => {
    let resultStr = await CApiClientManager.yuelunHotGameList(_sessionId);
    return _dealResult(resultStr);
}

/**
 * 消息反馈
 * 
*/
export const sendTheFeedbackWithTheSessionID = async (suggestion, contactValue) => {
    let resultStr = await CApiClientManager.yuelunSaveFeedBack(_sessionId, encodeURIComponent(suggestion), encodeURIComponent(contactValue));
    return _dealResult(resultStr);
}

/**
 * 游戏搜索记录
 * @param {string} gameId 游戏id 
 */
export const saveSearchGameList = async (gameId) => {
    let resultStr = await CApiClientManager.yuelunSaveSearchGameList(_sessionId, gameId);
    return _dealResult(resultStr);
}

/**
 * 
 * @param {string} strtype 购买套餐1
 * @param {string} strpacket_id 套餐类型ID 对应 获取套餐列表接口 package_id 字段
 * @param {string} packet_plan_id 套餐ID 对应 获取套餐列表接口 id 字段
 * @param {string} strpayment_fee 支付金额
 * @param {string} strtotal_fee 总金额
 * @param {string} strpayment_platform 支付类型 2：支付宝 3:微信  10:苹果
 */
export const createOrder = async (strtype, strpacket_id, packet_plan_id, strpayment_fee, strtotal_fee, strpayment_platform) => {
    let resultStr = await CApiClientManager.yuelunCeateOrder(_sessionId, strtype, strpacket_id, packet_plan_id, strpayment_fee, strtotal_fee, strpayment_platform);
    return _dealResult(resultStr);
}

/**
 * 获取套餐列表及其信息
 */
export const getPacektList = async () => {
    let resultStr = await CApiClientManager.yuelunGetPacektList(_sessionId);
    return _dealResult(resultStr);
}

/**
 * 苹果订单支付验证
 * @param {string} strorder_code 订单号
 * @param {string} strreceipt 苹果返回票据
 */
export const verifyReceiptByios = async (strorder_code, strreceipt) => {
    let resultStr = await CApiClientManager.yuelunVerifyReceiptByios(_sessionId, strorder_code, strreceipt);
    return _dealResult(resultStr);
}

/**
 * 获取流量数据
 */
export const getFlow = async () => {
    let resultStr = await CApiClientManager.getFlow();
    return _dealResult(resultStr);
}