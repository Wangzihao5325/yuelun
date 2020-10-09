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

#define XDX_NET_MTU                        1400
#define XDX_NET_REMOTEADDRESS              "222.222.222.222"
#define XDX_NET_SUBNETMASKS                "255.255.255.255"
#define XDX_NET_DNS                        "223.5.5.5"
#define XDX_LOCAL_ADDRESS                  "127.0.0.1"
#define XDX_NET_TUNNEL_IPADDRESS           "10.10.10.10"

@interface PacketTunnelProvider ()
@property NWTCPConnection *connection;
@property (strong) void (^pendingStartCompletion)(NSError *);
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
  ret = CreatTunnel((char*)csessionid,"7",port,2);
  if(ret == -1){
    return;
  }
  
  [self readPakcets];
}

- (void)stopTunnelWithReason:(NEProviderStopReason)reason completionHandler:(void (^)(void))completionHandler
{
  // Add code here to start the process of stopping the tunnel
  [self.connection cancel];
  completionHandler();
}

- (void)readPakcets {
    __weak PacketTunnelProvider *weakSelf = self;
    [self.packetFlow readPacketsWithCompletionHandler:^(NSArray<NSData *> * _Nonnull packets, NSArray<NSNumber *> * _Nonnull protocols) {
        for (NSData *packet in packets) {
            // log4cplus_debug("XDXVPNManager", "Read Packet - %s",[NSString stringWithFormat:@"%@",packet].UTF8String);
            __typeof__(self) strongSelf = weakSelf;
            // TODO ...
            
            NSLog(@"XDX : read packet - %@",packet);
        }
        [weakSelf readPakcets];
    }];
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

@end
