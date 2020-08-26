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
    public void yuelunGetNewConfig(Promise promise){
        String receiveStr = CApiClient.YuelunGetNewConfig();
        promise.resolve(receiveStr);
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
    public void yuelunGetNewsList( String strpages,String strlimits,Promise promise){
        String receiveStr = CApiClient.YuelunGetNewsList(strpages,strlimits);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetAdList( Promise promise){
        String receiveStr = CApiClient.YuelunGetAdList();
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunModifyUserInfo(String strsession_id,String strphone_num,String strcode,String strusername,String strhead_png, Promise promise){
        String receiveStr = CApiClient.YuelunModifUserInfo(strsession_id,strphone_num,strcode,strusername,strhead_png);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSearchGamelist(String strsession_id, String strgame_name, String strtype_name, String strclassification,String strpages,String strlimit, Promise promise){
        String receiveStr = CApiClient.YuelunSearchGamelist(strsession_id,strgame_name,strtype_name,strclassification,strpages,strlimit);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetCollection(String strsession_id, Promise promise){
        String receiveStr = CApiClient.YuelunGetCollection(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSverCollection(String strsession_id, String strgameids, Promise promise){
        String receiveStr = CApiClient.YuelunSaveCollection(strsession_id,strgameids);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSaveFeedBack(String strsession_id,String strcontent,String strcontact, Promise promise){
        String receiveStr = CApiClient.YuelunSaveFeedBack(strsession_id,strcontent,strcontact);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetUserInfo(String strsession_id, Promise promise){
        String receiveStr = CApiClient.YuelunGetUserInfo(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunHotGameList(String strsession_id, Promise promise){
        String receiveStr = CApiClient.YuelunHotGameList(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSaveSearchGameList(String strsession_id, String strgameid, Promise promise){
        String receiveStr = CApiClient.YuelunSaveSearchGameList(strsession_id,strgameid);
        promise.resolve(receiveStr);
    }
}
