//
//  PacketTunnelProvider.m
//  tunnel
//
//  Created by xiao on 2020/7/24.
//Copyright © 2020 xiao. All rights reserved.
//

#import "PacketTunnelProvider.h"
#include "log4cplus.h"
// 解析域名导入库
#include <netinet/in.h>
#include <netdb.h>
#include <ifaddrs.h>
#include <netdb.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include "libclient_proxy.h"
#include "YuelunProxy.h"


#define XDX_NET_MTU                        1500
#define XDX_NET_REMOTEADDRESS              "127.0.0.1"
#define XDX_NET_SUBNETMASKS                "255.255.255.0"
#define XDX_NET_DNS                        "216.146.35.35"
#define XDX_LOCAL_ADDRESS                  "127.0.0.1"
#define XDX_NET_TUNNEL_IPADDRESS           "10.172.2.70"
static NSDictionary *kVpnSubnetCandidates;  // Subnets to bind the VPN.
@interface PacketTunnelProvider ()
@property NWTCPConnection *connection;
@property (strong) void (^pendingStartCompletion)(NSError *);
@property(nonatomic) BOOL isTunnelConnected;
@property (nonatomic) NSString *hostNetworkAddress;  // IP address of the host in the active network.
@end

@implementation PacketTunnelProvider
- (id)init {
  self = [super init];
    return self;
}
- (void)startTunnelWithOptions:(NSDictionary *)options completionHandler:(void (^)(NSError *))completionHandler
{
  log4cplus_info("XDXVPNManager", "XDXPacketTunnelManager - Start Tunel !");
   
    NEPacketTunnelNetworkSettings *tunnelNetworkSettings = [[NEPacketTunnelNetworkSettings alloc] initWithTunnelRemoteAddress:@XDX_NET_REMOTEADDRESS];
    tunnelNetworkSettings.MTU = [NSNumber numberWithInteger:XDX_NET_MTU];
    tunnelNetworkSettings.IPv4Settings = [[NEIPv4Settings alloc] initWithAddresses:[NSArray arrayWithObjects:@XDX_NET_TUNNEL_IPADDRESS, nil]  subnetMasks:[NSArray arrayWithObjects:@XDX_NET_SUBNETMASKS, nil]];
    tunnelNetworkSettings.IPv4Settings.includedRoutes = @[[NEIPv4Route defaultRoute]];
    // 此处不可随意设置，可根据真实情况设置
//        NEIPv4Route *excludeRoute = [[NEIPv4Route alloc] initWithDestinationAddress:@XDX_NET_TUNNEL_IPADDRESS subnetMask:@XDX_NET_SUBNETMASKS];
//    tunnelNetworkSettings.IPv4Settings.excludedRoutes = @[excludeRoute];
////
   tunnelNetworkSettings.DNSSettings = [[NEDNSSettings alloc] initWithServers:@[@"216.146.35.35"]];
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
    //启动本地代理，创建隧道，启动VPN
    srand((int)time(0));
    int port = rand()% (57342 - 44073 + 1) + 44073;
    NSLog(@"local port:%d",port);
    int ret = InitLocalProxyServer(port);
    int realport = GetOVPNRealPort((char*)"162.14.5.205", 32091);
    CreateProxyTunnel((char*)" 162.14.13.154",realport);

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
  self.isTunnelConnected = YES;
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
                   [YuelunProxy YuelunHandlePackets];
                 });
}

- (void)onAccDone {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}
@end
