//
//  ApiHelper.m
//  RNDemo
//
//  Created by yichen wang on 2020/7/28.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "ApiHelper.h"

@implementation ApiHelper
RCT_EXPORT_MODULE(ApiHelper);


RCT_EXPORT_METHOD(getTheHomePageWithParam:(NSString *)param Callback:(RCTResponseSenderBlock)callback{
                  
                  });

/**
 *获取首页所有游戏数据
*/
RCT_EXPORT_METHOD(yuelunGetAllGameConfigWithSessionId:(NSString *)sessionId andListToken:(NSString *)listToken Callback:(RCTResponseSenderBlock)callback{
                  NSString * allGameStr = [self getAllGames:sessionId listToken:listToken];
                  NSArray * returnArr = @[allGameStr];
                  if(callback != nil) callback(returnArr);
                  
                  });

/**
 *获取Banner数据
*/
RCT_EXPORT_METHOD(getTheBannerDataCallBack:(RCTResponseSenderBlock)callback{
                  NSString * bannerStr = [self getTheBannerData];
                  NSArray * returnArr = @[bannerStr];
                  if(callback != nil) callback(returnArr);
                  
                  });

/*
 *获取用户游戏搜索结果
 */
RCT_EXPORT_METHOD(getTheSearchResultWithSessionIDd:(NSString *)strsession_id game_name:(NSString *)strgame_name type_name:(NSString *)strtype_name classification:(NSString *)strclassification CallBack:(RCTResponseSenderBlock)callback{
                  NSString * resultStr = [self searchTheGamesWithSessionIDd:strsession_id game_name:strgame_name type_name:strtype_name classification:strclassification];
                  NSArray * resultArr = @[resultStr];
                  if(callback != nil) callback(resultArr);
                  
                  });


/*
 *获取用户信息数据
 */
RCT_EXPORT_METHOD(getTheUserInforWithSessionID:(NSString *)sessionId Callback:(RCTResponseSenderBlock)callback{
                  NSString * userInfoStr = [self getTheUserInfoWithSessionId:sessionId];
                  NSArray * returnArr = @[userInfoStr];
                  if(callback != nil) callback(returnArr);
});

/*
 *消息反馈
 */
RCT_EXPORT_METHOD(sendTheFeedbackWithSessionID:(NSString *)sessionID andContent:(NSString *)content andConntact:(NSString *)conntact Callback:(RCTResponseSenderBlock)callback{
//                 NSString * feedbackStr = [self sendTheFeedbackWithSessionID:sessionID andContent:content andConntact:conntact];
//                 NSArray * returnArr = @[feedbackStr];
//                 if(callback != nil) callback(returnArr);
});

-(void)test{
  std::string str = YuelunPhoneLogin("18059865850", "987456", "ios", "v1.0.0.1");
    NSLog(@"调用结果%s",str.c_str());
    
    NSString * testStr = [NSString stringWithFormat:@"%s",str.c_str()];
    testStr = [testStr stringByReplacingOccurrencesOfString:@"\\u" withString:@"\\U"];
    testStr = [testStr stringByReplacingOccurrencesOfString:@"\"" withString:@"\\\""];
    testStr = [[@"\"" stringByAppendingString:testStr]stringByAppendingString:@"\""];
    NSData *tempData = [testStr dataUsingEncoding:NSUTF8StringEncoding];
    NSString* returnStr = [NSPropertyListSerialization propertyListFromData:tempData
                                                           mutabilityOption:NSPropertyListImmutable
                                                                     format:NULL
                                                           errorDescription:NULL];
    NSLog(@"%@",returnStr);
    
    NSDictionary * data = [NSJSONSerialization JSONObjectWithData:tempData options:NSJSONReadingMutableContainers error:nil];
    NSLog(@"%@",data);
  //  char* testChar = YuelunSendPhoneCode("18059865850");
  //  NSLog(@"调用结果%s",testChar);
  //
  //  std::string string = YuelunGetNewsList("1", "10");
  //  NSLog(@"调用结果%s",string.c_str());
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

//-(NSString *)sendTheFeedbackWithSessionID:(NSString *)sessionID andContent:(NSString *)content andConntact:(NSString *)conntact{
//  std::string session_id  = [sessionID UTF8String];
//  std::string contentstr  = [content UTF8String];
//  std::string conntactstr = [conntact UTF8String];
//  std::string feedbackStr = YuelunSaveFeedBack(session_id, contentstr, conntactstr);
//  NSString * feedbackString = [NSString stringWithFormat:@"%s",feedbackStr.c_str()];
//  return feedbackString;
//}

@end
