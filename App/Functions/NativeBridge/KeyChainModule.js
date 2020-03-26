/**
 * react native & local communication`s the keychain function. 
 * 
 * */

import {NativeModules} from 'react-native';

const KeyChainModule = NativeModules.KeyChainModule;
/** 
 * call the save password with account to keychain function
 * 
*/
export function saveTheUserPasswordToKeyChain (account,password,callBack){
    KeyChainModule.saveThePasswordWithAccount(account,password,callBack);
}

/** 
 * call the update password with account to keychain function
 * 
*/
export function updateTheUserPasswordToKeyChain (account,password,callBack){
    KeyChainModule.updateThePasswordWithAccount(account,password,callBack);
}

/** 
 * call the get password with account from keychain function
 * 
*/
export function getThePasswodWithAccount (account,callBack){
    KeyChainModule.getThePasswodWithAccount(account,callBack);
}

/** 
 * call the delete data with account from keychain function
 * 
*/
export function deleteTheDataWithAccount (account,callBack){
    KeyChainModule.deleteTheDataWithAccount(account,callBack);
}

