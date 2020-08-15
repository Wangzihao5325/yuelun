package com.rndemo;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.VpnService;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.yuelun.ylsdk.CProxClient;
import org.yuelun.ylproxy.YuelunProxyJni;

import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Random;

import static android.app.Activity.RESULT_OK;

public class YuelunVpn extends ReactContextBaseJavaModule {
    @SuppressLint("StaticFieldLeak")
    private static ReactApplicationContext _reactContext;
    private int _proxyPort;
    private Intent _vpnStateServiceIntent;
    private VpnService _myService;

    public YuelunVpn(ReactApplicationContext reactContext) {
        super(reactContext);
        _reactContext = reactContext;
        _vpnStateServiceIntent = new Intent(_reactContext, ToyVpnService.class);

        int cout = 0;
        while (cout < 5)
        {
            int port = getNum(40000,50000);
            cout = cout +1;
            String ret =  CProxClient.startlocalproxy(port);
            if (ret.compareTo("suc") == 0)
            {
                _proxyPort = port;
                break;
            }
            else
            {
                continue;
            }
        }
    }

    @Override
    public String getName() {
        return "YuelunVpn";
    }

    @ReactMethod
    public void prepare(Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("E_ACTIVITY_DOES_NOT_EXIST", "Activity doesn't exist");
            return;
        }
        Intent intent = VpnService.prepare(currentActivity);
        if (intent != null) {
            _reactContext.addActivityEventListener(new BaseActivityEventListener() {
                public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                    if(requestCode == 0 && resultCode == RESULT_OK){
                        promise.resolve(null);
                    } else {
                        promise.reject("PrepareError", "Failed to prepare");
                    }
                }
            });
            currentActivity.startActivityForResult(intent, 0);
        }
    }
     @ReactMethod
     public void connect(String strip,int consultport,Promise promise) throws IOException {
         int realPort = CProxClient.GetOVPNRealPort(strip,consultport);
         String isCreateTunnelSuccess = CProxClient.createTunnel("162.14.13.154",realPort);
         if(isCreateTunnelSuccess.equals("error")){
             promise.reject("002","create tunnel failed");
         }
         VpnService myService = new VpnService();
         VpnService.Builder builder = myService.new Builder();
         ParcelFileDescriptor vpnInterface = builder.setSession("yuelunVpn").establish();
         YuelunProxyJni.start(vpnInterface.getFd(),1500,"10.172.2.70","255.255.255.0","","192.168.0.101","192.168.0.101",null,0,1);
     }
/*
    @ReactMethod
    public void yuelunGetNewConfig(String strip,int consultport,Promise promise){
        String startProxySuccess = CProxClient.startlocalproxy(8090);
        if(startProxySuccess.equals("error")){
            promise.reject("001","start proxy failed");
        }
        int realPort = CProxClient.GetOVPNRealPort(strip,consultport);
        String isCreateTunnelSuccess = CProxClient.createTunnel("162.14.13.154",realPort);
        if(isCreateTunnelSuccess.equals("error")){
            //没有创建成功链接隧道
            promise.reject("002","create tunnel failed");
        }
        promise.resolve("success");
       // String localIP = "127.0.0.1" +":8090";
        //VpnService.Builder builder = new

        YuelunProxyJni.start(10,1500,"10.172.2.70","255.255.255.0","","192.168.0.101","192.168.0.101",null,0,1);
        VpnService myService = new VpnService();
        VpnService.Builder builder = myService.new Builder();
////
        mConfigureIntent = PendingIntent.getActivity(getCurrentActivity(), 0, VpnService.prepare(getCurrentActivity()),
//                PendingIntent.FLAG_UPDATE_CURRENT);
//       // builder.addAddress(VPN_ADDRESS, 32);//vpn网卡的ip
////        builder.addRoute(VPN_ROUTE, ROUTE_PREFIX);//设置路由规则
////        builder.setMtu(15000);//数据超过多少之后 分包
//        vpnInterface = builder.setSession("yuelunVpn").setConfigureIntent(mConfigureIntent).establish();
    }
*/
    public static int getNum(int startNum,int endNum){
        if(endNum > startNum){
            Random random = new Random();
            return random.nextInt(endNum - startNum) + startNum;
        }
        return 0;
    }
}
