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

@end
