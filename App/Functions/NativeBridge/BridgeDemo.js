/**
 * react native & local communication`s document. 
 * 
 * */
 import {NativeModules} from 'react-native';

 const BridgeDemo = NativeModules.BridgeDemo;
 /** 
  * local & rn`s communicaiton function
  * 
 */
 export function runTheLocalFunctionDemo (callBack){
    BridgeDemo.runTheLocalFunctionWithParam('从react-native传递如参数：testLocal',callBack);
 }