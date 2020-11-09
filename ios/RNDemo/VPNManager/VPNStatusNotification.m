//
//  VPNStatusNotification.m
//  RNDemo
//
//  Created by yichen wang on 2020/11/6.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "VPNStatusNotification.h"

@implementation VPNStatusNotification

RCT_EXPORT_MODULE();

static VPNStatusNotification *instance = nil;

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"vpn_state"];
}

+ (instancetype)shareInstance {
  if(!instance){
    instance = [[self alloc] init];
  }
  return instance;
}

+(id)allocWithZone:(NSZone *)zone {
  static RCTBridge *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

@end
