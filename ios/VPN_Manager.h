//
//  VPN_Manager.h
//  RNDemo
//
//  Created by yichen wang on 2020/8/16.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XDXVPNManager.h"
#import "XDXVPNManagerModel.h"

NS_ASSUME_NONNULL_BEGIN

@interface VPN_Manager : NSObject<XDXVPNManagerDelegate>

@property (nonatomic, strong) XDXVPNManager   *vpnManager;

+(void)configTheVPNServer:(XDXVPNManager *) vpnManager;

@end

NS_ASSUME_NONNULL_END
