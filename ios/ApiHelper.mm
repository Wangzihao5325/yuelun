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

/*
 *用户退出登录
 */
RCT_REMAP_METHOD(userLogoutWithSessionID,userLogoutWithSessionID:(NSString *)session_id resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
                NSString * feedbackStr = [self userLogout:session_id];
                resolve(feedbackStr);
}

/**
 *获取首页所有游戏数据
*/
RCT_REMAP_METHOD(yuelunGetAllGameConfig,yuelunGetAllGameConfigWithSessionId:(NSString *)sessionId andListToken:(NSString *)listToken resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSString * allGameStr = [self getAllGames:sessionId listToken:listToken];
    resolve(allGameStr);
}

/**
 *获取Banner数据
*/
RCT_REMAP_METHOD(getTheBannerData,getTheBannerDataResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSString * bannerStr = [self getTheBannerData];
    resolve(bannerStr);
}

/*
 *获取用户游戏搜索结果
 */
RCT_REMAP_METHOD(getTheSearchResultWithSessionIDd,getTheSearchResultWithSessionIDd:(NSString *)strsession_id game_name:(NSString *)strgame_name type_name:(NSString *)strtype_name classification:(NSString *)strclassification resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
        NSString * resultStr = [self searchTheGamesWithSessionIDd:strsession_id game_name:strgame_name type_name:strtype_name classification:strclassification];
    resolve(resultStr);
}
/*
 *获取用户信息数据
 */
RCT_REMAP_METHOD(yuelunGetUserInfo,getTheUserInforWithSessionID:(NSString *)sessionId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSString * userInfoStr = [self getTheUserInfoWithSessionId:sessionId];
    resolve(userInfoStr);
}

/*
 *消息反馈 暂未暴露到js
 */
RCT_EXPORT_METHOD(sendTheFeedbackWithTheSessionID:(NSString *)sessionID andContent:(NSString *)content andConntact:(NSString *)conntact Callback:(RCTResponseSenderBlock)callback{
                 NSString * feedbackStr = [self sendTheFeedbackWithSessionID:sessionID andContent:content andConntact:conntact];
                 NSArray * returnArr = @[feedbackStr];
                 if(callback != nil) callback(returnArr);
});

/*
 *获取用户收藏游戏
 */
RCT_REMAP_METHOD(yuelunGetCollection,getTheUserCollectGames:(NSString *)sessionId resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
    NSString * userCollectionStr = [self getTheUserCollectGames:sessionId];
    resolve(userCollectionStr);
}
/*
 *更新用户收藏游戏列表
 */
RCT_REMAP_METHOD(YuelunSverCollection,YuelunSverCollection:(NSString *)sessionId andGameLists:(NSArray *)games resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject){
 NSString * saveCollectionStr = [self YuelunSverCollection:sessionId andGamesID:games];    resolve(saveCollectionStr);
}

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

-(NSString *)searchTheGamesWithSessionIDd:(NSString *)strsession_id game_name:(NSString *)strgame_name type_name:(NSString *)strtype_name classification:(NSString *)strclassification{
  std::string session_id = [strsession_id UTF8String];
  std::string game_name = [strgame_name UTF8String];
  std::string type_name = [strtype_name UTF8String];
  std::string classification = [strclassification UTF8String];
  std::string searchStr = YuelunSearchGameList(session_id, game_name, type_name, classification);
  NSString * searchString = [NSString stringWithFormat:@"%s",searchStr.c_str()];
  return searchString;
}

-(NSString *)sendTheFeedbackWithSessionID:(NSString *)sessionID andContent:(NSString *)content andConntact:(NSString *)conntact{
  std::string sessionIDStr = [sessionID UTF8String];
  std::string contentstr   = [content UTF8String];
  std::string conntactstr  = [conntact UTF8String];
//  std::string feedbackStr = YuelunSaveFeedBack(sessionIDStr, contentstr, conntactstr);
//  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr.c_str()];
  NSString * feedbackString = @"";
  return feedbackString;
}

-(NSString *)getThePhoneCode:(NSString *)phoneNum{
  std::string phoneNumStr  = [phoneNum UTF8String];
  char* feedbackStr = YuelunSendPhoneCode(phoneNumStr);
  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr];
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

-(NSString *)YuelunSverCollection:(NSString *)session_id andGamesID:(NSArray *)gameids{
  NSString * gamesStr = [NSString stringWithFormat:@"%@",gameids];
  std::string session_ID = [session_id UTF8String];
  std::string gameIDs = [gamesStr UTF8String];
  std::string returnStr = YuelunSverCollection(session_ID, gameIDs);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

-(NSString *)userLogout:(NSString *)sessionID{
  std::string session_id_str = [sessionID UTF8String];
  std::string returnStr = YuelunPhoneLoginout(session_id_str);
  NSString * return_string = [NSString stringWithFormat:@"%s",returnStr.c_str()];
  return return_string;
}

@end
