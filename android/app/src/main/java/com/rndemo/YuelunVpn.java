package com.rndemo;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.VpnService;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.util.Log;

import androidx.core.content.ContextCompat;

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
    public interface Prefs {
        String NAME = "connection";
        String SERVER_ADDRESS = "server.address";
        String SERVER_PORT = "server.port";
        String SHARED_SECRET = "shared.secret";
        String PROXY_HOSTNAME = "proxyhost";
        String PROXY_PORT = "proxyport";
        String ALLOW = "allow";
        String PACKAGES = "packages";
    }

    private static ReactApplicationContext _reactContext;
    private int _proxyPort;
    private Intent intent;
    private VpnService _myService;

    public YuelunVpn(ReactApplicationContext reactContext) {
        super(reactContext);
        _reactContext = reactContext;
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
        intent = VpnService.prepare(currentActivity);
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
        promise.resolve("success");
    }
     @ReactMethod
     public void startVpn(String strip,int consultport,Promise promise) throws IOException {
        //占用2020端口
         int cout = 0;
         while (cout < 5)
         {
             int port = getNum(40000,50000);
             cout = cout +1;
             String ret =   com.yuelun.ylsdk.CProxClient.startlocalproxy(port);
             if (ret.compareTo("suc") == 0)
             {
                 _proxyPort = port;
                 Log.w(getTag(),"create  localproxy suc...\n");
                 break;
             }
             else
             {
                 promise.reject("001","start port failed");
                 continue;
             }
         }
        //已经取得真正的参数，开始启动vpn
         Bundle profileInfo = new Bundle();
         profileInfo.putString("Address", "162.14.13.154");
         profileInfo.putInt("Port", _proxyPort);
         profileInfo.putInt("MTU", 1500);
         Intent intent = new Intent(_reactContext, ToyVpnService.class);
         intent.putExtras(profileInfo);
         //通过intent传递参数 启动service 代码跳转至toyVpnService
         ContextCompat.startForegroundService(_reactContext, intent);
         promise.resolve("success");

         /*

         VpnService myService = new VpnService();
         VpnService.Builder builder = myService.new Builder();
         // PendingIntent pendingIntent = PendingIntent.getActivity(getCurrentActivity(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
         builder.setSession("yuelunVpn");
         builder.setMtu(1500);
         builder.addAddress("10.172.2.70", 24);
         builder.addRoute("0.0.0.0",0);
         builder.addDnsServer("216.146.35.35");
         // builder.setConfigureIntent(pendingIntent);
         ParcelFileDescriptor vpnInterface =builder.establish();
         YuelunProxyJni.start(vpnInterface.getFd(),1500,"10.172.2.70","255.255.255.0","","192.168.0.101","192.168.0.101",null,0,1);
         promise.resolve("success");
         */
     }
    private final String getTag() {
        return ToyVpnConnection.class.getSimpleName() + "[" + 1 + "]";
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
