//
//  PacketTunnelProvider.m
//  yulunPersonalVPN
//
//  Created by EDZ on 2020/8/12.
//Copyright © 2020 Facebook. All rights reserved.
//

#import "PacketTunnelProvider.h"
#include "log4cplus.h"

// 解析域名导入库
#include <netinet/in.h>
#include <netdb.h>
#include <arpa/inet.h>
#import "libclient_proxy.h"
#import "YuelunProxy.h"
#import <NetworkExtension/NetworkExtension.h>


#define XDX_NET_MTU                        1500
#define XDX_NET_REMOTEADDRESS              "222.222.222.222"
#define XDX_NET_SUBNETMASKS                "255.255.255.255"
#define XDX_NET_DNS                        "223.5.5.5"
#define XDX_LOCAL_ADDRESS                  "127.0.0.1"
#define XDX_NET_TUNNEL_IPADDRESS           "10.10.10.10"

static NSDictionary *kVpnSubnetCandidates;  // Subnets to bind the VPN.
@interface PacketTunnelProvider ()
@property NWTCPConnection *connection;
@property (strong) void (^pendingStartCompletion)(NSError *);
@property(nonatomic) BOOL isTunnelConnected;
@property (nonatomic) NSString *hostNetworkAddress;  // IP address of the host in the active network.
@end


@implementation PacketTunnelProvider

- (void)startTunnelWithOptions:(NSDictionary *)options completionHandler:(void (^)(NSError *))completionHandler
{
    log4cplus_info("XDXVPNManager", "XDXPacketTunnelManager - Start Tunel !");
    NEPacketTunnelNetworkSettings *tunnelNetworkSettings = [[NEPacketTunnelNetworkSettings alloc] initWithTunnelRemoteAddress:@XDX_NET_REMOTEADDRESS];
    tunnelNetworkSettings.MTU = [NSNumber numberWithInteger:XDX_NET_MTU];
    tunnelNetworkSettings.IPv4Settings = [[NEIPv4Settings alloc] initWithAddresses:[NSArray arrayWithObjects:@XDX_NET_TUNNEL_IPADDRESS, nil]  subnetMasks:[NSArray arrayWithObjects:@XDX_NET_SUBNETMASKS, nil]];
//  NSString * tunnelArrayStr = [options objectForKey:@"tunnelArray"];
  NSArray * tunnelArray = [options objectForKey:@"tunnelArray"];
  NSMutableArray * IPAddressArray = [NSMutableArray new];
  for (int i = 0; i<tunnelArray.count; i++) {
    NSArray * untilArray = tunnelArray[i];
    NSString * addressStr = [untilArray objectAtIndex:0];
    NSString * NDSStr = [untilArray objectAtIndex:1];
    NEIPv4Route * untilRoute = [[NEIPv4Route alloc] initWithDestinationAddress:addressStr subnetMask:NDSStr];
    [IPAddressArray addObject:untilRoute];
  }
    tunnelNetworkSettings.IPv4Settings.includedRoutes = IPAddressArray;
    // 此处不可随意设置，可根据真实情况设置
    //    NEIPv4Route *excludeRoute = [[NEIPv4Route alloc] initWithDestinationAddress:@"10.12.23.90" subnetMask:@"255.255.255.255"];
    //    tunnelNetworkSettings.IPv4Settings.excludedRoutes = @[excludeRoute];

    [self setTunnelNetworkSettings:tunnelNetworkSettings completionHandler:^(NSError * _Nullable error) {
        if (error == nil) {
            log4cplus_info("XDXVPNManager", "XDXPacketTunnelManager - Start Tunel Success !");
            completionHandler(nil);
        }else {
            log4cplus_error("XDXVPNManager", "XDXPacketTunnelManager - Start Tunel Failed - %s !",error.debugDescription.UTF8String);
            completionHandler(error);
            return;
        }
    }];

  NSString * nssessionid = [options objectForKey:@"sessionid"];
  NSString * nsgameid    = [options objectForKey:@"gameid"];
  NSString * path        = [options objectForKey:@"dppath"];
  srand((int)time(0));
  int port = rand()%(57342 - 44073 + 1) + 44073;
  NSLog(@"local port:%d",port);
  const char * pathchar   = [path UTF8String];
  const char * csessionid = [nssessionid UTF8String];
  const char * cgameid    = [nsgameid UTF8String];
  //设置IP数据库
  int ret = SetFilePath((char*)pathchar);
  if(ret != 0){
    return;
  }

  YuelunGetGameInfoById(csessionid,cgameid,"");
  ret = CreatTunnel((char*)csessionid,cgameid,port,1);
  if(ret == -1){
    return;
  }
  BOOL isUdpSupported = true;
 [self YuelunSetupPacketFlow];
  [YuelunProxy YuelunSetUdpForwardingEnabled:isUdpSupported];
  [self YuelunStarAccWithPort:port];
}

- (NSString *)queryIpWithDomain:(NSString *)domain {
    struct hostent *hs;
    struct sockaddr_in server;
    if ((hs = gethostbyname([domain UTF8String])) != NULL) {
        server.sin_addr = *((struct in_addr*)hs->h_addr_list[0]);
        return [NSString stringWithUTF8String:inet_ntoa(server.sin_addr)];
    }
    
    return nil;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
  
}
- (void)YuelunSetupPacketFlow {
  NSError *error = [YuelunProxy YuelunSetupWithPacketFlow:self.packetFlow];
  if (error) {
      NSLog(@"----");
   stopproxy();
  }
}

- (void)stopTunnelWithReason:(NEProviderStopReason)reason completionHandler:(void (^)(void))completionHandler
{
  // Add code here to start the process of stopping the tunnel
    [YuelunProxy YuelunStopAcc];
    self.isTunnelConnected = NO;
    stopproxy();
  [self.connection cancel];
  completionHandler();
}

- (void)handleAppMessage:(NSData *)messageData completionHandler:(void (^)(NSData *))completionHandler
{
  // Add code here to handle the message
  if (completionHandler != nil) {
    completionHandler(messageData);
  }
}

- (void)sleepWithCompletionHandler:(void (^)(void))completionHandler
{
  // Add code here to get ready to sleep
  completionHandler();
}

- (void)wake
{
  // Add code here to wake up
}

# pragma mark - YuelunVpnHandler

- (void)YuelunStarAccWithPort:(int) port {
  if (self.isTunnelConnected) {
    
    return;  // vpn already running
  }
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onAccDone)
                                               name:YuelunStoppedNotification object:nil];
  [YuelunProxy YuelunStartAcc:port];
    NSLog(@"startacc");
  self.isTunnelConnected = YES;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
                   [YuelunProxy YuelunHandlePackets];
                 });
}

- (void)onAccDone {
    NSLog(@"onAccDone");
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}
@end
