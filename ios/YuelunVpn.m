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
#import "VPNStatusNotification.h"

@interface YuelunVpn()<XDXVPNManagerDelegate>
@property (nonatomic, strong)           XDXVPNManager   *vpnManager;
@property (nonatomic, strong) NSString * connectedStatus;
@end

@implementation YuelunVpn
RCT_EXPORT_MODULE(YuelunVpn);

- (NSArray<NSString *> *)supportedEvents
{
    return @[@"com.yuelun.VPN.stateListener"];
}

RCT_REMAP_METHOD(prepare, vpnPrepareWithServerAddress:(NSString *)serverAddress serverPort:(NSString *)serverPort mtu:(NSString *)mtu ip:(NSString *)ip subnet:(NSString *)subnet dns:(NSString *)dns success:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
  self.connectedStatus = @"";
   self.vpnManager = [[XDXVPNManager alloc] init];
   self.vpnManager.delegate = self;
  VPN_Manager * manager = [[VPN_Manager alloc] init];
   [manager configTheVPNServer:self.vpnManager];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(vpnDidChange:) name:NEVPNStatusDidChangeNotification object:nil];
  
  success(@"success");

}

RCT_REMAP_METHOD(startVpn,sessionid:(NSString *)sessionid gameid:(NSString*)gameid tunnelArray:(NSArray *)tunnelArray startVpnsuccess:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
    [self.vpnManager startVPNConsultIP:sessionid gameid:gameid tunnelArray:tunnelArray];
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
          if(![self.connectedStatus isEqualToString:@"Connecting"]){
            self.connectedStatus = @"Connecting";
            [self postMsgToVPNFunction:@"connecting"];
            NSLog(@"Connecting...");
          }
        }
            break;
        case NEVPNStatusConnected:
        {
          if(![self.connectedStatus isEqualToString:@"Connected"]){
              self.connectedStatus = @"Connected";
              [self postMsgToVPNFunction:@"connected"];
            NSLog(@"Connected...");
          }
        }
            break;
        case NEVPNStatusDisconnecting:
        {
            if(![self.connectedStatus isEqualToString:@"Disconnectin"]){
                self.connectedStatus = @"Disconnectin";
                [self postMsgToVPNFunction:@"Disconnecting"];
              NSLog(@"Disconnecting...");
            }
        }
            break;
        case NEVPNStatusDisconnected:
        {
          if(![self.connectedStatus isEqualToString:@"Disconnected"]){
              self.connectedStatus = @"Disconnected";
              [self postMsgToVPNFunction:@"Disconnect"];
            NSLog(@"Disconnected...");
          }
        }
            break;
        case NEVPNStatusInvalid:
//            if(![self.connectedStatus isEqualToString:@"Invliad"]){
//                self.connectedStatus = @"Invliad";
//                [self postMsgToVPNFunction:@"failed"];
//              NSLog(@"Invliad...");
//            }
            break;
        case NEVPNStatusReasserting:
            NSLog(@"Reasserting...");
            break;
    }
}

-(void)postMsgToVPNFunction:(NSString *)status{
  VPNStatusNotification * VPN = [VPNStatusNotification shareInstance];
  [VPN sendEventWithName:@"vpn_state" body:status];
}

#pragma mark - Delegate
- (void)loadFromPreferencesComplete {
    [self vpnDidChange:nil];
}

@end
