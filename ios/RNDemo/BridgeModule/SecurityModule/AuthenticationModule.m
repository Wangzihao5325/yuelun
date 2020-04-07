//
//  AuthenticationModule.m
//  eBenefit
//
//  Created by wyc on 2020/3/31.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "AuthenticationModule.h"
#import <LocalAuthentication/LocalAuthentication.h>

#define  STATUS_SUCCESS      @"1"
#define  STATUS_FAIL         @"2"
#define  STATUS_FAIL_LOCKED  @"3"

@implementation AuthenticationModule

RCT_EXPORT_MODULE(AuthenticationModule);

RCT_EXPORT_METHOD(checkTheVerifyStatusWithCallback:(RCTResponseSenderBlock)callback{
  LAContext *context = [[LAContext alloc] init];
  NSError *authError = nil;
  
  if([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&authError]){
    if(callback != nil) callback(@[STATUS_SUCCESS]);
  }else{
    NSString * errorStatus = STATUS_FAIL;
    switch (authError.code) {
      case LAErrorAuthenticationFailed:{
        NSLog(@"身份验证并不成功，因为用户没有提供有效的生物凭证。");
        
        break;
      }
      case LAErrorSystemCancel:{
        NSLog(@"身份验证被系统取消了(如另一个应用程序去前台)。");
        break;
      }
      case LAErrorTouchIDNotAvailable:
      {
        NSLog(@"身份验证无法启动，因为设备上无法使用Touch ID。");
        break;
      }
      case LAErrorTouchIDNotEnrolled:
      {
        NSLog(@"身份验证无法启动，因为Touch ID没有注册的手指。");
        break;
      }
      case LAErrorTouchIDLockout:
      {
        errorStatus = STATUS_FAIL_LOCKED;
        NSLog(@"身份验证无法启动，因为Touch ID被锁定");
        break;
      }
      default:
        NSLog(@"身份验证并不成功");
        break;
    }
    
    if(callback != nil) callback(@[errorStatus]);
  }
});

RCT_EXPORT_METHOD(startTheAuthenticationCheckAndReturnTheResult:(RCTResponseSenderBlock)callback{
  LAContext *context = [LAContext new];
  [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:NSLocalizedString(@"通过ID进行验证", nil) reply:^(BOOL success, NSError * _Nullable error) {
    NSString * status;
    if(success){
      status = STATUS_SUCCESS;
      NSLog(@"Authentication Check Success");
    }else{
      if (error.code == kLAErrorUserFallback){
        NSLog(@"Authentication Error: user fall back");
      }else if (error.code == kLAErrorUserCancel){
        NSLog(@"Authentication Error: user cancel");
      }else if (error.code == kLAErrorSystemCancel){
        NSLog(@"Authentication Error: system cancel, ipad go to the home");
      }else if (error.code == kLAErrorPasscodeNotSet){
        NSLog(@"Authentication Error: passcode not set");
      }else{
        NSLog(@"Authentication Error");
      }
      status = STATUS_FAIL;
    }
    
    if(callback != nil) callback(@[status]);
  }];
});

RCT_EXPORT_METHOD(unlockingTheBiometryIDFunction:(RCTResponseSenderBlock)callback{
  LAContext *context = [[LAContext alloc] init];
  [context evaluatePolicy:LAPolicyDeviceOwnerAuthentication localizedReason:@"解锁Biometry ID功能" reply:^(BOOL success, NSError * _Nullable error) {
    NSString * status = STATUS_FAIL;
    if(success) status = STATUS_SUCCESS;
    if (callback) {
      callback(@[status]);
    }
  }];
});

@end
