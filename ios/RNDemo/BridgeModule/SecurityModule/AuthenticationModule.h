//
//  AuthenticationModule.h
//  eBenefit
//
//  Created by wyc on 2020/3/31.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface AuthenticationModule : NSObject<RCTBridgeModule>

typedef enum _AuthenticationStatus{
  STATUS_SUCCESS_TEST = 0,
  STATUS_INVALID_ACCOUNT,
  STATUS_INVALID_PASSWORD,
  STATUS_FAIL
}AuthenticationStatus;

@end


