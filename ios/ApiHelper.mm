//
//  ApiHelper.m
//  RNDemo
//
//  Created by yichen wang on 2020/7/28.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "ApiHelper.h"

@implementation ApiHelper
RCT_EXPORT_MODULE(CApiClient);

/*
 *获取短信验证码
 */
RCT_REMAP_METHOD(yuelunSendPhoneCode,getThePhoneCode:(NSString *)phoneNum resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
                NSString * feedbackStr = [self getThePhoneCode:phoneNum];
                resolve(feedbackStr);
}

/*
 *用户登录
 */
RCT_REMAP_METHOD(yuelunPhoneLogin,userLoginWithPhoneNum:(NSString *)phoneNum andPhoneCode:(NSString *)phoneCode andPlatForm:(NSString *)platform andVersion:(NSString *)version resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
                NSString * feedbackStr = [self userLoginWithPhoneNum:phoneNum andPhoneCode:phoneCode andPlatForm:platform andVersion:version];
                resolve(feedbackStr);
}

/**
* 连接服务器验证信心，下发加速需要使用的数据
* @param strsession_id 用户登录session_id
* @param strgame_id 加速游戏id
* @param strserver_id 加速使用服务器id
* @return
*/
RCT_REMAP_METHOD(yuelunConnectServer,Withstrsession_id:(NSString *)strsession_id andstrgame_id:(NSString *)strgame_id andstrserver_id:(NSString *)strserver_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunConnectServer:strsession_id andGame_id:strgame_id andServer_id:strserver_id];
  resolve(returnStr);
}

/**
* 停止加速的时候，断开加速请求
* @param strsession_id 户登录session_id
* @param strserver_id  加速使用服务器id
* @return
*/
RCT_REMAP_METHOD(yuelunDisConnectServer,Withstrsession_id:(NSString *)strsession_id andstrserver_id:(NSString *)strserver_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunDisConnectServer:strsession_id andserver_id:strserver_id];
  resolve(returnStr);
}

/**
* 根据需要加速的游戏id，获取游戏路由策略等详情
* @param strsession_id 用户登录session_id
* @param strgame_id    要加速的游戏id
* @param strgame_token  token第一次请求传空，从返回json列表中获取该值 下次请求传入，若配置无更改，则下发ok,配置更改重新下发一份新的json数据
* @return
*/
RCT_REMAP_METHOD(yuelunGetGameInfoById,Withstrsession_id:(NSString *)strsession_id andstrgame_id:(NSString *)strgame_id andstrgame_token:(NSString *)strgame_token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunGetGameInfoById:strsession_id andGame_id:strgame_id andGame_token:strgame_token];
  resolve(returnStr);
}

/**
 *获取首页所有游戏数据
*/
RCT_REMAP_METHOD(yuelunGetAllGameConfig,Withstrsession_id:(NSString *)strsession_id andstrlist_token:(NSString *)strlist_token resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * allGameStr = [self getAllGames:strsession_id listToken:strlist_token];
  NSLog(@"所有游戏%@",allGameStr);
  resolve(allGameStr);
}

/*
 *用户退出登录
 */
RCT_REMAP_METHOD(yuelunPhoneLoginout,Withstrsession_id:(NSString *)strsession_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * feedbackStr = [self userLogout:strsession_id];
  resolve(feedbackStr);
}

/**
* 心跳包检查
* @param strsession_id 用户登录session_id
* @param strgame_id 可以为空，若有加速游戏则传游戏id
* @param strserver_id 可以为空，若有加速游戏则传当前使用服务器id列表
* @return
*/
RCT_REMAP_METHOD(yuelunCheckHear,Withstrsession_id:(NSString *)strsession_id strgame_id:(NSString *)strgame_id strserver_id:(NSString *)strserver_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunCheckHear:strsession_id andGame_id:strgame_id andServerID:strserver_id];
  resolve(returnStr);
}

/**
* 获取公告信息
* @param strpages 页码，不传默认第一页
* @param strlimits 页数，不传默认每页10条
* @return
*/
RCT_REMAP_METHOD(yuelunGetNewsList,Withstrpage:(NSString *)strpage strlimit:(NSString *)strlimit resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunGetNewsList:strpage andLimit:strlimit];
  resolve(returnStr);
}

/**
* 获取广告接口
* @return
*/
RCT_REMAP_METHOD(yuelunGetAdList,resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * bannerStr = [self getTheBannerData];
  resolve(bannerStr);
}

/**
* 修改用户头像，昵称，手机号，修改哪个传哪个，不修改可以为空
* @param strsession_id 用户session_id
* @param strphone_num 用户手机号
* @param strcode 验证码
* @param strusername 要修改的用户名
* @param strhead_png 要修改的的头像图片文件
* @return
*/
RCT_REMAP_METHOD(yuelunModifyUserInfo,strsession_id:(NSString *)strsession_id strphome_num:(NSString *)strphome_num strcode:(NSString *)strcode strusername:(NSString *)strusername strhead_png:(NSString *)strhead_png resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunModifyUserInfo:strsession_id andPhome_num:strphome_num code:strcode username:strusername head_png:strhead_png];
  resolve(returnStr);
}


/**
* 获取用户信息接口
* @param strsession_id 用户登录session_id
* @return
*/
RCT_REMAP_METHOD(yuelunGetUserInfo,strsession_id:(NSString *)strsession_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * userInfoStr = [self getTheUserInfoWithSessionId:strsession_id];
  resolve(userInfoStr);
};

/**
* 获取玩家收藏列表
* @param strsession_id 用户登录session_id
* @return
*/
RCT_REMAP_METHOD(yuelunGetCollection,session_id:(NSString *)strsession_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * userInfoStr = [self getTheUserCollectGames:strsession_id];
  resolve(userInfoStr);
};

/**
* 更新玩家收藏列表
* @param strsession_id 用户登录session_id
* @param strgameids 收藏游戏ID （1,2,3,4,5）字符串
* @return
*/
RCT_REMAP_METHOD(yuelunSaveCollection,session_id:(NSString *)strsession_id strgameids:(id)strgameids resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * userInfoStr = [self YuelunSverCollection:strsession_id andGamesID:strgameids];
  resolve(userInfoStr);
};

/**
* 玩家意见反馈
* @param strsession_id 用户登录session_id
* @param strcontent 意见反馈内容
* @param strcontact 联系方式
* @return
*/
RCT_REMAP_METHOD(yuelunSaveFeedBack,strsession_id:(NSString *)strsession_id strcontent:(NSString *)strcontent strconntact:(NSString *)strconntact resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * feedbackStr = [self sendTheFeedbackWithSessionID:strsession_id andContent:strcontent andConntact:strconntact];
  resolve(feedbackStr);
}

/**
*搜索游戏接口
* @param strsession_id 用户登录session_id
* @param strgame_name  游戏名称
* @param strtype_name 游戏类型（国内，海外）具体值根据获取游戏列表接口返回字段types传值
* @param strclassification 游戏分类（国内，海外）具体值根据获取游戏列表接口返回字段classifications传值
* @param strpages 页码 不传默认第一页
* @param strlimit 数量 不传默认一页16条
* @return
*/
RCT_REMAP_METHOD(yuelunSearchGamelist,
                 strsession_id:(NSString *)strsession_id
                 strgame_name:(NSString *)strgame_name
                 strtype_name:(NSString *)strtype_name
                 strclassification:(NSString *)strclassification
                 strpages:(NSString *)strpages
                 strlimit:(NSString *)strlimit
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject){
  NSString * resultStr = [self YuelunSearchGameList:strsession_id game_name:strgame_name type_name:strtype_name strpages:strpages classification:strclassification];
  resolve(resultStr);
}

/**
* 热门搜索列表
* @param strsession_id 用户登录sesion_id
* @return
*/
RCT_REMAP_METHOD(yuelunHotGameList,sessionid:(NSString *)strsession_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * userInfoStr = [self getHotGameList:strsession_id];
  resolve(userInfoStr);
};

/**
* 游戏搜索记录
* @param strsession_id 用户登录session_id
* @param strgameid 游戏id
* @return
*/
RCT_REMAP_METHOD(yuelunSaveSearchGameList,sessionid:(NSString *)strsession_id strgameid:(NSString *)strgameid resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunSaveSearchGameList:strsession_id gameid:strgameid];
  resolve(returnStr);
};

RCT_REMAP_METHOD(yuelunCeateOrder,sessionid:(NSString *)strsession_id strtype:(NSString *)strtype strpacket_id:(NSString *)strpacket_id packet_plan_id:(NSString *)packet_plan_id strpayment_fee:(NSString *)strpayment_fee strtotal_fee:(NSString *)strtotal_fee strpayment_platform:(NSString *)strpayment_platform resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunCeateOrder:strsession_id strtype:strtype strpacket_id:strpacket_id packet_plan_id:packet_plan_id strpayment_fee:strpayment_fee strtotal_fee:strtotal_fee strpayment_platform:strpayment_platform];
  resolve(returnStr);
};

RCT_REMAP_METHOD(yuelunGetPacektList,strsessionid:(NSString *)strsession_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunGetPacektList:strsession_id];
  resolve(returnStr);
};

RCT_REMAP_METHOD(yuelunVerifyReceiptByios,sessionid:(NSString *)strsession_id strorder_code:(NSString *)strorder_code strreceipt:(NSString *)strreceipt resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
  NSString * returnStr = [self yuelunVerifyReceiptByios:strsession_id strorder_code:strorder_code strreceipt:strreceipt];
  resolve(returnStr);
};


-(NSString *)getTheBannerData{
  std::string str = YuelunGetAdList();
  NSString * bannerString = [NSString stringWithFormat:@"%s",str.c_str()];
  return bannerString;
}

-(NSString *)getAllGames:(NSString *)sessionId listToken:(NSString *)listToken{
  std::string sessionIds = [sessionId UTF8String];
  std::string listTokens = [sessionId UTF8String];
  std::string allGameStr = YuelunGetAllGameConfig(sessionIds,listTokens);
  NSString * allGameString = [NSString stringWithFormat:@"%s",allGameStr.c_str()];
  return allGameString;
}

-(NSString *)getTheUserInfoWithSessionId:(NSString *)sessionId{
  std::string sessionIds = [sessionId UTF8String];
  std::string userInfoStr = YuelunGetUserInfo(sessionIds);
  NSString * userInfoString = [NSString stringWithFormat:@"%s",userInfoStr.c_str()];
  return userInfoString;
}

-(NSString *)YuelunSearchGameList:(NSString *)strsession_id game_name:(NSString *)strgame_name type_name:(NSString *)strtype_name strpages:(NSString *)pages classification:(NSString *)strclassification {
  std::string session_id = [strsession_id UTF8String];
  std::string game_name = [strgame_name UTF8String];
  std::string type_name = [strtype_name UTF8String];
  std::string classification = [strclassification UTF8String];
  std::string pagesStr = [pages UTF8String];
  std::string limit = [@"" UTF8String];
  std::string searchStr = YuelunSearchGameList(session_id, game_name, type_name, classification,pagesStr,limit);
  NSString * searchString = [NSString stringWithFormat:@"%s",searchStr.c_str()];
  return searchString;
}

-(NSString *)sendTheFeedbackWithSessionID:(NSString *)sessionID andContent:(NSString *)content andConntact:(NSString *)conntact{
  std::string sessionIDStr = [sessionID UTF8String];
  std::string contentstr   = [content UTF8String];
  std::string conntactstr  = [conntact UTF8String];
  std::string feedbackStr = YuelunSaveFeedBack(sessionIDStr, contentstr, conntactstr);
  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr.c_str()];
  return feedbackString;
}

-(NSString *)getThePhoneCode:(NSString *)phoneNum{
  std::string phoneNumStr  = [phoneNum UTF8String];
  std::string feedbackStr = YuelunSendPhoneCode(phoneNumStr);
  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr.c_str()];
  return feedbackString;
}

-(NSString *)userLoginWithPhoneNum:(NSString *)phoneNum andPhoneCode:(NSString *)phoneCode andPlatForm:(NSString *)platform andVersion:(NSString *)version{
  std::string phoneNumStr   = [phoneNum  UTF8String];
  std::string phoneCodeStr  = [phoneCode UTF8String];
  std::string platforminfoStr = [platform UTF8String];
  std::string versionStr = [version UTF8String];
  
  std::string feedbackStr = YuelunPhoneLogin(phoneNumStr, phoneCodeStr, platforminfoStr, versionStr);
  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr.c_str()];
  return feedbackString;
}

-(NSString *)getTheUserCollectGames:(NSString *)sessionID{
  std::string session_id = [sessionID UTF8String];
  std::string returnStr = YuelunGetCollection(session_id);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)YuelunSverCollection:(NSString *)session_id andGamesID:(id)gameids{
  NSString * gamesStr = [NSString stringWithFormat:@"%@",gameids];
  std::string session_ID = [session_id UTF8String];
  std::string gameIDs = [gamesStr UTF8String];
  std::string returnStr = YuelunSaveCollection(session_ID, gameIDs);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)userLogout:(NSString *)sessionID{
  std::string session_id_str = [sessionID UTF8String];
  std::string returnStr = YuelunPhoneLoginout(session_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)getHotGameList:(NSString *)sessionID{
  std::string session_id_str = [sessionID UTF8String];
  std::string returnStr = YuelunHotGameList(session_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)yuelunConnectServer:(NSString *)strsession_id andGame_id:(NSString *)strgame_id andServer_id:(NSString *)server_id{
  std::string strsession_id_str = [strsession_id UTF8String];
  std::string strgame_id_str    = [strgame_id UTF8String];
  std::string server_id_str     = [server_id UTF8String];
  std::string returnStr = YuelunConnectServer(strsession_id_str,strgame_id_str,server_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)yuelunDisConnectServer:(NSString *)session_id andserver_id:(NSString *)server_id{
  std::string session_id_str = [session_id UTF8String];
  std::string server_id_str  = [server_id UTF8String];
  std::string returnStr = YuelunDisConnectServer(session_id_str, server_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)yuelunGetGameInfoById:(NSString *)session_id andGame_id:(NSString *)game_id andGame_token:(NSString *)game_token{
  std::string session_id_str = [session_id UTF8String];
  std::string game_id_str    = [game_id UTF8String];
  std::string game_token_str = [game_token UTF8String];
  std::string return_str = YuelunGetGameInfoById(session_id_str, game_id_str, game_token_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunCheckHear:(NSString *)session_id andGame_id:(NSString *)game_id andServerID:(NSString *)server_id{
  std::string session_id_str = [session_id UTF8String];
  std::string game_id_str    = [game_id UTF8String];
  std::string server_id_str  = [server_id UTF8String];
  std::string return_str = YuelunCheckHear(session_id_str, game_id_str, server_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunGetNewsList:(NSString *)page andLimit:(NSString *)limit{
  std::string page_str  = [page UTF8String];
  std::string limit_str = [limit UTF8String];
  
  std::string return_str =  YuelunGetNewsList(page_str, limit_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunModifyUserInfo:(NSString *)session_id andPhome_num:(NSString *)phome_num code:(NSString *)code username:(NSString *)username head_png:(NSString *)head_png{
  std::string session_idstr = [session_id UTF8String];
  std::string phome_num_str = [phome_num UTF8String];
  std::string code_str      = [code UTF8String];
  std::string username_str  = [username UTF8String];
  std::string head_png_str  = [head_png UTF8String];
  
  std::string return_str = YuelunModifyUserInfo(session_idstr,phome_num_str,code_str,username_str,head_png_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunSaveSearchGameList:(NSString *)session_id gameid:(NSString *)gameid{
  std::string session_idstr = [session_id UTF8String];
  std::string gameid_str    = [gameid UTF8String];
  
  std::string return_str = YuelunSaveSearchGameList(session_idstr, gameid_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunCeateOrder:(NSString *)session_id strtype:(NSString *)strtype strpacket_id:(NSString *)strpacket_id packet_plan_id:(NSString *)packet_plan_id strpayment_fee:(NSString *)strpayment_fee strtotal_fee:(NSString *)strtotal_fee strpayment_platform:(NSString *)strpayment_platform{
  std::string session_idstr = [session_id UTF8String];
  std::string strtype_str    = [strtype UTF8String];
  std::string strpacket_idstr = [strpacket_id UTF8String];
  std::string packet_plan_idstr    = [packet_plan_id UTF8String];
  std::string strpayment_feestr = [strpayment_fee UTF8String];
  std::string strtotal_feestr    = [strtotal_fee UTF8String];
  std::string strpayment_platformstr = [strpayment_platform UTF8String];
  std::string from_agent_usernamestr = [@"mobile" UTF8String];

  
  std::string return_str = YuelunCeateOrder(session_idstr, strtype_str, strpacket_idstr, packet_plan_idstr, strpayment_feestr, strtotal_feestr, strpayment_platformstr);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunGetPacektList:(NSString *)session_id{
  std::string session_idstr = [session_id UTF8String];
  
  std::string return_str = YuelunGetPacektList(session_idstr);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}

-(NSString *)yuelunVerifyReceiptByios:(NSString *)session_id strorder_code:(NSString *)strorder_code strreceipt:(NSString *)strreceipt{
  std::string session_idstr = [session_id UTF8String];
  std::string strorder_codestr = [strorder_code UTF8String];
  std::string strreceipt_str = [strreceipt UTF8String];
  
  std::string return_str = YuelunVerifyReceiptByios(session_idstr, strorder_codestr, strreceipt_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",return_str.c_str()];
  return return_string;
}
@end
