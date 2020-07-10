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
}
