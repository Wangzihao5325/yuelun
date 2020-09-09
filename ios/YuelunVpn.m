//
//  YuelunVpn.m
//  RNDemo
//
//  Created by EDZ on 2020/8/12.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "YuelunVpn.h"
#import <NetworkExtension/NetworkExtension.h>
#import "XDXVPNManager.h"
#import "XDXVPNManagerModel.h"
#import "VPN_Manager.h"

@interface YuelunVpn()<XDXVPNManagerDelegate>
@property (nonatomic, strong)           XDXVPNManager   *vpnManager;
@end

@implementation YuelunVpn
RCT_EXPORT_MODULE(YuelunVpn);

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"com.yuelun.VPN.stateListener"];
}

RCT_REMAP_METHOD(prepare, vpnPrepareWithServerAddress:(NSString *)serverAddress serverPort:(NSString *)serverPort mtu:(NSString *)mtu ip:(NSString *)ip subnet:(NSString *)subnet dns:(NSString *)dns success:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
//    XDXVPNManagerModel *model = [[XDXVPNManagerModel alloc] init];

//  /*  Note   - 在运行代码前必须按照博客所说配置好Target及开放权限，否则Demo无法正常运行
//   *  @param TunnelBundleId : 必须填写你Extension Target的bundile ID,且必须合法，博客里有详细说明
//   */
//    [model configureInfoWithTunnelBundleId:@"com.yuelun.accvpn.yltunnel"
//                           serverAddress:serverAddress
//                              serverPort:serverPort
//                                     mtu:mtu
//                                      ip:ip// 119.3.83.78
//                                  subnet:subnet
//                                     dns:dns];
//
  
   self.vpnManager = [[XDXVPNManager alloc] init];
   self.vpnManager.delegate = self;
  VPN_Manager * manager = [[VPN_Manager alloc] init];
   [manager configTheVPNServer:self.vpnManager];
//    [self.vpnManager configManagerWithModel:model];
//    self.vpnManager.delegate = self;
//
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(vpnDidChange:) name:NEVPNStatusDidChangeNotification object:nil];
  
  success(@"success");

}

RCT_REMAP_METHOD(startVpn,sessionid:(NSString *)sessionid gameid:(NSString*)gameid startVpnsuccess:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
    [self.vpnManager startVPNConsultIP:sessionid gameid:gameid];
    success(@"success");
}


RCT_REMAP_METHOD(stopVPN,stopVpnsuccess:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
    [self.vpnManager stopVPN];
    success(@"success");
}

- (void)vpnDidChange:(NSNotification *)notification {
    OSStatus status = self.vpnManager.vpnManager.connection.status;

    switch (status) {
        case NEVPNStatusConnecting:
        {
            NSLog(@"Connecting...");
//          [self sendEventWithName:@"com.yuelun.VPN.stateListener" body:@{@"state":@"connecting"}];

        }
            break;
        case NEVPNStatusConnected:
        {
            NSLog(@"Connected...");
//             [self sendEventWithName:@"com.yuelun.VPN.stateListener" body:@{@"state":@"connected"}];
            
        }
            break;
        case NEVPNStatusDisconnecting:
        {
            NSLog(@"Disconnecting...");
            
        }
            break;
        case NEVPNStatusDisconnected:
        {
            NSLog(@"Disconnected...");
//            [self sendEventWithName:@"com.yuelun.VPN.stateListener" body:@{@"state":@"disconnected"}];
            
        }
            break;
        case NEVPNStatusInvalid:
            
            NSLog(@"Invliad");
//         [self sendEventWithName:@"com.yuelun.VPN.stateListener" body:@{@"state":@"invliad"}];
            break;
        case NEVPNStatusReasserting:
            NSLog(@"Reasserting...");
            break;
    }
}

#pragma mark - Delegate
- (void)loadFromPreferencesComplete {
    [self vpnDidChange:nil];
}

@end
