//
//  VPN_Manager.m
//  RNDemo
//
//  Created by yichen wang on 2020/8/16.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "VPN_Manager.h"
#import <NetworkExtension/NetworkExtension.h>

@implementation VPN_Manager

+(void)configTheVPNServer:(XDXVPNManager *) vpnManager{
  XDXVPNManagerModel *model = [[XDXVPNManagerModel alloc] init];
  [model configureInfoWithTunnelBundleId:@"com.yuelun.accvpn.yltunnel"
                           serverAddress:@"120.77.2.142"
                              serverPort:@"15100"
                                     mtu:@"1400"
                                      ip:@"120.77.2.142"// 119.3.83.78
                                  subnet:@"255.255.255.0"
                                     dns:@"8.8.8.8,8.4.4.4"];

  [vpnManager configManagerWithModel:model];
  vpnManager.delegate = self;

  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(vpnDidChange:) name:NSUserDefaultsDidChangeNotification object:nil];
}

- (void)vpnDidChange:(NSNotification *)notification {
    OSStatus status = self.vpnManager.vpnManager.connection.status;

    switch (status) {
        case NEVPNStatusConnecting:
        {
            NSLog(@"Connecting...");
        }
            break;
        case NEVPNStatusConnected:
        {
            NSLog(@"Connected...");
            
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
            
        }
            break;
        case NEVPNStatusInvalid:
            
            NSLog(@"Invliad");
            break;
        case NEVPNStatusReasserting:
            NSLog(@"Reasserting...");
            break;
    }
}


@end
