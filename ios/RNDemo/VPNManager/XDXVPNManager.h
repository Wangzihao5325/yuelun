//
//  XDXVPNManager.h
//  XDXRouterDemo
//
//  Created by 小东邪 on 30/03/2018.
//  Copyright © 2018 小东邪. All rights reserved.
//

#import <Foundation/Foundation.h>

@class XDXVPNManagerModel,NETunnelProviderManager;

@protocol XDXVPNManagerDelegate<NSObject>

- (void)loadFromPreferencesComplete;

@end

@interface XDXVPNManager : NSObject

@property (nonatomic, strong) NETunnelProviderManager *vpnManager;

@property (nonatomic, weak) id<XDXVPNManagerDelegate> delegate;

/**
 *  Configure the base information of vpn.
 */
- (void)configManagerWithModel:(XDXVPNManagerModel *)model;

/**
 *   Start VPN.
 *   If success return YES, otherwise return NO.
 */
- (BOOL)startVPNConsultIP:(NSString *)sessionid gameid:(NSString*)gameid tunnelArray:(NSArray *)tunnelArray;

/**
 *  Stop VPN.
 *  If success return YES, otherwise return NO.
 */
- (BOOL)stopVPN;


@end
