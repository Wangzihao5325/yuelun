package com.rndemo;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yuelun.ylsdk.CApiClient;

public class CApiClientManager extends ReactContextBaseJavaModule {
    public CApiClientManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CApiClient";
    }

    @ReactMethod
    public void yuelunSendPhoneCode(String strPhone, Promise promise){
        String receiveStr = CApiClient.YuelunSendPhoneCode(strPhone);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunPhoneLogin(String strphone,String strcode,String strplatforminfo,String strversion, Promise promise){
        String receiveStr = CApiClient.YuelunPhoneLogin(strphone,strcode,strplatforminfo,strversion);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunConnectServer(String strsession_id,String strgame_id,String strserver_id, Promise promise){
        String receiveStr = CApiClient.YuelunConnectServer(strsession_id,strgame_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunDisConnectServer(String strsession_id,String strserver_id, Promise promise){
        String receiveStr = CApiClient.YuelunDisConnectServer(strsession_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetGameInfoById(String strsession_id,String strgame_id,String strgame_token, Promise promise){
        String receiveStr = CApiClient.YuelunGetGameInfoById(strsession_id,strgame_id,strgame_token);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetAllGameConfig(String strsession_id,String strlist_token, Promise promise){
        String receiveStr = CApiClient.YuelunGetAllGameConfig(strsession_id,strlist_token);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunPhoneLoginout(String strsession_id, Promise promise){
        String receiveStr = CApiClient.YuelunPhoneLoginout(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunCheckHear(String strsession_id,String strgame_id,String strserver_id, Promise promise){
        String receiveStr = CApiClient.YuelunCheckHear(strsession_id,strgame_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetNewsList( Promise promise){
        String receiveStr = CApiClient.YuelunGetNewsList();
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetAdList( Promise promise){
        String receiveStr = CApiClient.YuelunGetAdList();
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunModifUserInfo(String strsession_id,String strphone_num,String strcode,String strusername,String strhead_png, Promise promise){
        String receiveStr = CApiClient.YuelunModifUserInfo(strsession_id,strphone_num,strcode,strusername,strhead_png);
        promise.resolve(receiveStr);
    }
}
