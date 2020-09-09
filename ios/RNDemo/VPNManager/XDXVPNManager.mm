//
//  XDXVPNManager.m
//  XDXRouterDemo
//
//  Created by 小东邪 on 30/03/2018.
//  Copyright © 2018 小东邪. All rights reserved.
//

#import  "XDXVPNManager.h"
#import  <NetworkExtension/NetworkExtension.h>
#import  "XDXVPNManagerModel.h"
//#import  "NSMutableDictionary+XDXSafeSetRemove.h"
#import "NSMutableDictionary+TVUSafeSetRemove.h"
#include "log4cplus.h"
#import "libclient_proxy.h"

@interface XDXVPNManager()

@property (nonatomic, strong) XDXVPNManagerModel *vpnConfigurationModel;

@end

@implementation XDXVPNManager

#pragma mark - Init
- (instancetype)init {
    if (self = [super init]) {
        self.vpnManager             = [[NETunnelProviderManager alloc] init];
        self.vpnConfigurationModel  = [[XDXVPNManagerModel alloc] init];
    }
    return self;
}

#pragma mark - Main Func Public
- (void)configManagerWithModel:(XDXVPNManagerModel *)model {
    self.vpnConfigurationModel.serverAddress    = model.serverAddress;
    self.vpnConfigurationModel.serverPort       = model.serverPort;
    self.vpnConfigurationModel.mtu              = model.mtu;
    self.vpnConfigurationModel.ip               = model.ip;
    self.vpnConfigurationModel.subnet           = model.subnet;
    self.vpnConfigurationModel.dns              = model.dns;
    self.vpnConfigurationModel.tunnelBundleId   = model.tunnelBundleId;
    log4cplus_info("XDXVPNManager", "The vpn configuration tunnelBundleId is %s ,port is %s, server is %s, ip is %s, subnet is %s, mtu is %s, dns is %s",model.tunnelBundleId.UTF8String, model.serverPort.UTF8String, model.serverAddress.UTF8String, model.ip.UTF8String, model.subnet.UTF8String, model.mtu.UTF8String, model.dns.UTF8String);
    
    [self applyVpnConfiguration:NO];
}
- (BOOL)startVPNConsultIP:(NSString *)sessionid gameid:(NSString*)gameid {
    if (self.vpnManager.connection.status == NEVPNStatusDisconnected) {
        NSError *error;

          NSLog(@"resource path = %@",[[NSBundle mainBundle] resourcePath]);
          NSLog(@"path resource = %@",[[NSBundle mainBundle] pathForResource:@"ip2region" ofType:@"db"]);
          NSString *nstrpath = [[NSBundle mainBundle] pathForResource:@"ip2region" ofType:@"db"];
          const char *cpath = [nstrpath UTF8String];
          int ret = SetFilePath((char*)cpath);
      if (ret !=0 ) {
        return NO;
      }
          NSLog(@"%d",ret);
            
            NSDictionary * consulDic = @{@"sessionid":sessionid,@"gamid":gameid,@"dppath":nstrpath};
      [self.vpnManager.connection startVPNTunnelWithOptions:consulDic andReturnError:&error];
        
        if (error != 0) {
            const char *errorInfo = [NSString stringWithFormat:@"%@",error].UTF8String;
            log4cplus_error("XDXVPNManager", "Start VPN Failed - %s !",errorInfo);
        }else {
            log4cplus_info("XDXVPNManager", "Start VPN Success !");
            return YES;
        }
    }else {
        log4cplus_error("XDXVPNManager", "Start VPN - The current connect status isn't NEVPNStatusDisconnected !");
    }
    return NO;
}

- (BOOL)stopVPN {
    if (self.vpnManager.connection.status == NEVPNStatusConnected) {
        [self.vpnManager.connection stopVPNTunnel];
        log4cplus_info("XDXVPNManager", "StopVPN Success - The current connect status is Connected.");
        return YES;
    }else  if (self.vpnManager.connection.status == NEVPNStatusConnecting) {
        [self.vpnManager.connection stopVPNTunnel];
        log4cplus_info("XDXVPNManager", "StopVPN Success - The current connect status is Connecting.");
    }else {
        log4cplus_error("XDXVPNManager", "StopVPN Failed - The current connect status isn't Connected or Connecting !");
    }
    
    return NO;
}

#pragma mark - Main Func Private
- (void)applyVpnConfiguration:(BOOL)callSelf {
    [NETunnelProviderManager loadAllFromPreferencesWithCompletionHandler:^(NSArray<NETunnelProviderManager *> * _Nullable managers, NSError * _Nullable error) {
        if (managers.count > 0) {
            self.vpnManager = managers[0];
            // 设置完成后更新主控制器的按钮状态
            if (self.delegate && [self.delegate respondsToSelector:@selector(loadFromPreferencesComplete)]) {
                [self.delegate loadFromPreferencesComplete];
            }
            log4cplus_error("XDXVPNManager", "The vpn already configured. We will use it.");
          if(callSelf){
            return;
          }
        }else {
            log4cplus_error("XDXVPNManager", "The vpn config is NULL, we will config it later.");
        }
        
        [self.vpnManager loadFromPreferencesWithCompletionHandler:^(NSError * _Nullable error) {
            if (error != 0) {
                const char *errorInfo = [NSString stringWithFormat:@"%@",error].UTF8String;
                log4cplus_error("XDXVPNManager", "applyVpnConfiguration loadFromPreferencesWithCompletionHandler Failed - %s !",errorInfo);
                return;
            }
            
            NETunnelProviderProtocol *protocol = [[NETunnelProviderProtocol alloc] init];
            protocol.providerBundleIdentifier  = self.vpnConfigurationModel.tunnelBundleId;
            
            NSMutableDictionary *configInfo = [NSMutableDictionary dictionary];
            [configInfo safeSetObject:self.vpnConfigurationModel.serverPort       forKey:@"port"];
            [configInfo safeSetObject:self.vpnConfigurationModel.serverAddress    forKey:@"server"];
            [configInfo safeSetObject:self.vpnConfigurationModel.ip               forKey:@"ip"];
            [configInfo safeSetObject:self.vpnConfigurationModel.subnet           forKey:@"subnet"];
            [configInfo safeSetObject:self.vpnConfigurationModel.mtu              forKey:@"mtu"];
            [configInfo safeSetObject:self.vpnConfigurationModel.dns              forKey:@"dns"];
            
            protocol.providerConfiguration        = configInfo;
            protocol.serverAddress                = self.vpnConfigurationModel.serverAddress;
            self.vpnManager.protocolConfiguration = protocol;
            self.vpnManager.localizedDescription  = @"NEPacketTunnelVPNDemoConfig";
            
            [self.vpnManager setEnabled:YES];
            [self.vpnManager saveToPreferencesWithCompletionHandler:^(NSError * _Nullable error) {
                if (error != 0) {
                    const char *errorInfo = [NSString stringWithFormat:@"%@",error].UTF8String;
                    log4cplus_error("XDXVPNManager", "applyVpnConfiguration saveToPreferencesWithCompletionHandler Failed - %s !",errorInfo);
                }else {
                    [self applyVpnConfiguration:YES];
                    log4cplus_info("XDXVPNManager", "Save vpn configuration successfully !");
                }

            }];
        }];
    }];
}

@end
