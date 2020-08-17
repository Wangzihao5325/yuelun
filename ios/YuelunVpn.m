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
//
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
  [self test];
  [self testRead];
  
   self.vpnManager = [[XDXVPNManager alloc] init];
   self.vpnManager.delegate = self;
   [VPN_Manager configTheVPNServer:self.vpnManager];
//    [self.vpnManager configManagerWithModel:model];
//    self.vpnManager.delegate = self;
//
//    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(vpnDidChange:) name:NEVPNStatusDidChangeNotification object:nil];
  
  success(@"success");

}

-(void)test{
//  NSDictionary * testDic = @{@"test":@"test"};
//  NSUserDefaults *userDefault = [[NSUserDefaults alloc]initWithSuiteName:@"group.com.yuelun.accvpn"];
//  [userDefault setObject:testDic forKey:@"testParam"];
  
  //获取到共享数据的文件地址
  NSURL *containerURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:@"group.com.yuelun.accvpn"];
  NSURL *birthdayContainerURL = [containerURL URLByAppendingPathComponent:@"Library/Caches/birthday.json"];
  //将需要存储的数据写入到该文件中
  NSString *jsonString = @"需要写入的数据或者json字符等";
  //写入数据
  NSError *err = nil;
  BOOL result = [jsonString writeToURL:birthdayContainerURL atomically:YES encoding:NSUTF8StringEncoding error:&err];
  if (!result) {
      NSLog(@"%@",err);
  }else {
      NSLog(@"save value:%@ success.",jsonString);
  }
}

-(void)testRead{
  NSError *err = nil;
  NSURL *containerURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:@"group.com.yuelun.accvpn"];
  containerURL = [containerURL URLByAppendingPathComponent:@"Library/Caches/birthday.json"];
  NSString *value = [NSString stringWithContentsOfURL:containerURL encoding: NSUTF8StringEncoding error:&err];
}

RCT_REMAP_METHOD(startVpn,startVpnsuccess:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
    [self.vpnManager startVPN];
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
