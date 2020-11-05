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
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    instance = [[self alloc] init];
  });
  [instance postVPNConnectNotificationEvent:@""];
  return instance;
}

RCT_EXPORT_METHOD(postVPNConnectNotificationEvent:(NSString *)name)
{
  [self sendEventWithName:@"vpn_state" body:@"test"];
}

@end
