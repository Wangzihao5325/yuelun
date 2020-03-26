//
//  KeyChainModule.m
//  RNDemo
//
//  Created by wyc on 2020/3/26.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import "KeyChainModule.h"

/**
 * the status of save or update the data for keychain
 */
#define  STATUS_SUCCESS           @"success"
#define  STATUS_FAIL              @"fail"
#define  STATUS_INVALID_ACCOUNT   @"fail_account"
#define  STATUS_INVALID_PASSWORD  @"fail_passsword"

@implementation KeyChainModule

RCT_EXPORT_MODULE(KeyChainModule);

RCT_EXPORT_METHOD(saveThePasswordWithAccount:(NSString *)account password:(NSString *)password callback:(RCTResponseSenderBlock)callback{
  if(password == nil || password == NULL || password.length == 0){
    if(callback != nil) callback(@[STATUS_INVALID_PASSWORD]);
    return;
  }
  
  if(account == nil || account == NULL || account.length == 0){
    if(callback != nil) callback(@[STATUS_INVALID_ACCOUNT]);
    return;
  }
  
  NSMutableDictionary * query = [[NSMutableDictionary alloc] init];
  //权限设置，只有当设备处于解锁状态才可调用
  [query setValue:(__bridge id)kSecAttrAccessibleWhenUnlocked forKey:(__bridge id)kSecAttrAccessible];
  //存储数据类型，kSecClassGenericPassword是一个通用类型数据
  [query setValue:(__bridge id)(kSecClassGenericPassword)     forKey:(__bridge id)kSecClass];
  //添加一个操作说明，用来描述调用意图<可填可不填>
  [query setValue:@"保存登录密码"     forKey:(__bridge id)kSecUseOperationPrompt];
  //kSecAttrAccount 和 kSecAttrService一般组成一个keychain的查询唯一标识
  //存储的服务标识
  [query setValue:@"loginPassword"  forKey:(__bridge id)kSecAttrService];
  //存储的账户标示
  [query setValue:account           forKey:(__bridge id)kSecAttrAccount];
  //存储的加密数据，此处为密码，使用UTF8转化
  NSData * pwdData = [password dataUsingEncoding:NSUTF8StringEncoding];
  [query setValue:pwdData forKey:(__bridge id)kSecValueData];
  
  CFTypeRef result = nil;
  OSStatus status = SecItemAdd((__bridge CFDictionaryRef)query, &result);
  if(status == noErr){
    if(callback != nil) callback(@[STATUS_SUCCESS]);
  }else{
    if(callback != nil) callback(@[STATUS_FAIL]);
  }
});

RCT_EXPORT_METHOD(updateThePasswordWithAccount:(NSString *)account password:(NSString *)password callback:(RCTResponseSenderBlock)callback{
  if(password == nil || password == NULL || password.length == 0){
    if(callback != nil) callback(@[STATUS_INVALID_PASSWORD]);
    return;
  }
  
  if(account == nil || account == NULL || account.length == 0){
    if(callback != nil) callback(@[STATUS_INVALID_ACCOUNT]);
    return;
  }
  
  NSMutableDictionary * query = [[NSMutableDictionary alloc] init];
  [query setValue:(__bridge id)kSecAttrAccessibleWhenUnlocked forKey:(__bridge id)kSecAttrAccessible];
  [query setValue:(__bridge id)(kSecClassGenericPassword)     forKey:(__bridge id)kSecClass];
  [query setValue:@"更改登录密码"     forKey:(__bridge id)kSecUseOperationPrompt];
  [query setValue:@"loginPassword"  forKey:(__bridge id)kSecAttrService];
  [query setValue:account           forKey:(__bridge id)kSecAttrAccount];
  
  NSMutableDictionary * updateDic = [[NSMutableDictionary alloc] init];
  NSData * pwdData = [password dataUsingEncoding:NSUTF8StringEncoding];
  [updateDic setObject:pwdData forKey:(__bridge id)kSecValueData];
  
  OSStatus status = SecItemUpdate((__bridge CFDictionaryRef)query, (__bridge CFDictionaryRef)updateDic);
  if(status == noErr){
    if(callback != nil) callback(@[STATUS_SUCCESS]);
  }else{
    if(callback != nil) callback(@[STATUS_FAIL]);
  }
});

RCT_EXPORT_METHOD(getThePasswodWithAccount:(NSString *)account callback:(RCTResponseSenderBlock)callback{
  if(account == nil || account == NULL || account.length == 0){
    if(callback != nil) callback(@[STATUS_FAIL]);
    return;
  }
  
  NSMutableDictionary * query = [[NSMutableDictionary alloc] init];
  [query setValue:(__bridge id)kSecAttrAccessibleWhenUnlocked forKey:(__bridge id)kSecAttrAccessible];
  [query setValue:(__bridge id)(kSecClassGenericPassword)     forKey:(__bridge id)kSecClass];
  //预计只有一个属性返回(密码)我们可以设置属性 kSecReturnData,获得保存的Data
  [query setValue:@YES              forKey:(__bridge id)kSecReturnData];
  [query setValue:@"获取登录密码"     forKey:(__bridge id)kSecUseOperationPrompt];
  [query setValue:@"loginPassword"  forKey:(__bridge id)kSecAttrService];
  [query setValue:account           forKey:(__bridge id)kSecAttrAccount];
  
  CFTypeRef dataTypeRef = NULL;
  OSStatus status;
  
  status = SecItemCopyMatching((__bridge CFDictionaryRef)query, &dataTypeRef);
  if(status == noErr){
    NSString *pwd = [[NSString alloc] initWithData:(__bridge NSData * _Nonnull)(dataTypeRef) encoding:NSUTF8StringEncoding];
    if(callback != nil) callback(@[pwd]);
  }else{
    if(callback != nil) callback(@[STATUS_FAIL]);
  }
});

RCT_EXPORT_METHOD(deleteTheDataWithAccount:(NSString *)account callback:(RCTResponseSenderBlock)callback{
  if(account == nil || account == NULL || account.length == 0){
    if(callback != nil) callback(@[STATUS_INVALID_ACCOUNT]);
    return;
  }
  
  NSMutableDictionary * query = [[NSMutableDictionary alloc] init];
  [query setValue:(__bridge id)kSecAttrAccessibleWhenUnlocked forKey:(__bridge id)kSecAttrAccessible];
  [query setValue:(__bridge id)(kSecClassGenericPassword)     forKey:(__bridge id)kSecClass];
  [query setValue:@"删除登录密码"     forKey:(__bridge id)kSecUseOperationPrompt];
  [query setValue:@"loginPassword"  forKey:(__bridge id)kSecAttrService];
  [query setValue:account           forKey:(__bridge id)kSecAttrAccount];
  
  OSStatus status = SecItemDelete((__bridge CFDictionaryRef)query);
  if(status == noErr){
    if(callback != nil) callback(@[STATUS_SUCCESS]);
  }else{
    if(callback != nil) callback(@[STATUS_FAIL]);
  }
});

@end
