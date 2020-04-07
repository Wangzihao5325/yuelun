/**
 * react native & local communication`s the authentication function. 
 * 
 * */

import {NativeModules} from 'react-native';

const AuthenticationModule = NativeModules.AuthenticationModule;

/** 
 * call the availability of authentication function
 * 
*/
export function checkTheVerifyStatus (callBack){
    AuthenticationModule.checkTheVerifyStatusWithCallback(callBack);
}

/** 
 * call the authentication function (include the touchID & faceID)
 * 
*/
export function startTheAuthenticationCheckAndReturnTheResult (callBack){
    AuthenticationModule.startTheAuthenticationCheckAndReturnTheResult(callBack);
}

/** 
 * unlock the biometry ID check function
 * 
*/
export function unlockTheBiometryIDFunction(callBack) {
    AuthenticationModule.unlockingTheBiometryIDFunction(callBack);
}