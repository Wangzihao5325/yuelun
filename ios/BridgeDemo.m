//
//  BridgeDemo.m
//  RNDemo
//
//  Created by yichen wang on 2020/3/15.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "BridgeDemo.h"

@implementation BridgeDemo

RCT_EXPORT_MODULE(BridgeDemo);

RCT_EXPORT_METHOD(runTheLocalFunctionWithParam:(NSString *)param callback:(RCTResponseSenderBlock)callback){
  NSLog(@"bridge-----react native调用local方法，传参：%@",param);
  
  NSArray * returnArray = @[@{@"one":@"test"}];
  if(callback != nil) callback(returnArray);
}

@end
