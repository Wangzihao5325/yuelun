//
//  YuelunProxy.h
//  YuelunProxy
//
//  Created by xiao on 2020/8/6.
//  Copyright © 2020 xiao. All rights reserved.
//

#import <Foundation/Foundation.h>


#import <NetworkExtension/NetworkExtension.h>


#define TunnelMTU 1500
#define YuelunStoppedNotification @"YuelunStoppedNotification"

@interface YuelunProxy : NSObject
+ (YuelunProxy *)sharedInterface;
+ (NSError *)YuelunSetupWithPacketFlow:(NEPacketTunnelFlow *)packetFlow;
+ (NSError *)YuelunOnNetworkConnectivityChange;
+ (void)YuelunHandlePackets;
+ (void)YuelunWritePacket: (NSData *)packet;
+ (void)YuelunStartAcc: (int)ServerPort;
+ (void)YuelunStopAcc;
+ (void)YuelunSetUdpForwardingEnabled:(BOOL)enabled;
@end
