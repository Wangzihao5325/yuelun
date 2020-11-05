//
//  VPNStatusNotification.h
//  RNDemo
//
//  Created by yichen wang on 2020/11/6.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

NS_ASSUME_NONNULL_BEGIN

@interface VPNStatusNotification : RCTEventEmitter<RCTBridgeModule>

+ (instancetype)shareInstance;

@end

NS_ASSUME_NONNULL_END
