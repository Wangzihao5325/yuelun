package com.rndemo;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yuelun.ylsdk.CProxClient;

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
        String receiveStr = CProxClient.YuelunGetNewConfig();
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSendPhoneCode(String strPhone, Promise promise){
        String receiveStr = CProxClient.YuelunSendPhoneCode(strPhone);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunPhoneLogin(String strtype,String strphone,String strcode,String strplatforminfo,String strversion, Promise promise){
        String receiveStr = CProxClient.YuelunPhoneLogin(strtype,strphone,strcode,strplatforminfo,strversion);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunConnectServer(String strsession_id,String strgame_id,String strserver_id, Promise promise){
        String receiveStr = CProxClient.YuelunConnectServer(strsession_id,strgame_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunDisConnectServer(String strsession_id,String strserver_id, Promise promise){
        String receiveStr = CProxClient.YuelunDisConnectServer(strsession_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetGameInfoById(String strsession_id,String strgame_id,String strgame_token, Promise promise){
        String receiveStr = CProxClient.YuelunGetGameInfoById(strsession_id,strgame_id,strgame_token);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetAllGameConfig(String strsession_id,String strlist_token, Promise promise){
        String receiveStr = CProxClient.YuelunGetAllGameConfig(strsession_id,strlist_token);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunPhoneLoginout(String strsession_id, Promise promise){
        String receiveStr = CProxClient.YuelunPhoneLoginout(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunCheckHear(String strsession_id,String strgame_id,String strserver_id, Promise promise){
        String receiveStr = CProxClient.YuelunCheckHear(strsession_id,strgame_id,strserver_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetNewsList( String strpages,String strlimits,Promise promise){
        String receiveStr = CProxClient.YuelunGetNewsList(strpages,strlimits);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetAdList( Promise promise){
        String receiveStr = CProxClient.YuelunGetAdList();
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunModifyUserInfo(String strsession_id,String strphone_num,String strcode,String strusername,String strhead_png, Promise promise){
        String receiveStr = CProxClient.YuelunModifUserInfo(strsession_id,strphone_num,strcode,strusername,strhead_png);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSearchGamelist(String strsession_id, String strgame_name, String strtype_name, String strclassification,String strpages,String strlimit, Promise promise){
        String receiveStr = CProxClient.YuelunSearchGamelist(strsession_id,strgame_name,strtype_name,strclassification,strpages,strlimit);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetCollection(String strsession_id, Promise promise){
        String receiveStr = CProxClient.YuelunGetCollection(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSverCollection(String strsession_id, String strgameids, Promise promise){
        String receiveStr = CProxClient.YuelunSaveCollection(strsession_id,strgameids);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSaveFeedBack(String strsession_id,String strcontent,String strcontact, Promise promise){
        String receiveStr = CProxClient.YuelunSaveFeedBack(strsession_id,strcontent,strcontact);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunGetUserInfo(String strsession_id, Promise promise){
        String receiveStr = CProxClient.YuelunGetUserInfo(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunHotGameList(String strsession_id, Promise promise){
        String receiveStr = CProxClient.YuelunHotGameList(strsession_id);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunSaveSearchGameList(String strsession_id, String strgameid, Promise promise){
        String receiveStr = CProxClient.YuelunSaveSearchGameList(strsession_id,strgameid);
        promise.resolve(receiveStr);
    }

    @ReactMethod
    public void yuelunCeateOrder(String strsession_id,String strtype, String strpacket_id,String packet_plan_id,String strpayment_fee, String strtotal_fee, String strpayment_platform, Promise promise){
        String receiveStr = CProxClient.YuelunCreateOrder(strsession_id,strtype,strpacket_id,packet_plan_id,strpayment_fee, strtotal_fee, strpayment_platform,"mobile");
        promise.resolve(receiveStr);
    }
    @ReactMethod
    public void yuelunGetPacektList(String strsession_id, Promise promise){
        String receiveStr = CProxClient.YuelunSaveGetPacketList(strsession_id);
        promise.resolve(receiveStr);
    }
    @ReactMethod
    public void yuelunVerifyReceiptByios(String strsession_id, String strorder_code, String strreceipt, Promise promise){
        String receiveStr = CProxClient.YuelunVerifyReceiptByios(strsession_id,strorder_code,strreceipt);
        promise.resolve(receiveStr);
    }
    @ReactMethod
    public void getFlow( Promise promise){
        String receiveStr = CProxClient.GetFlow();
        promise.resolve(receiveStr);
    }
    @ReactMethod
    public void getCurrentDelay( Promise promise){
        int receiveInt = CProxClient.GetCurrentDelay();
        promise.resolve(receiveInt);
    }
}
