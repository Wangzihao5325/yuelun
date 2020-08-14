package com.rndemo;
import android.app.PendingIntent;
import android.content.Intent;
import android.net.VpnService;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.yuelun.ylsdk.CProxClient;
import org.yuelun.ylproxy.YuelunProxyJni;

public class YuelunVpn extends ReactContextBaseJavaModule {
    public YuelunVpn(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    private VpnService vpnInterface;
    private PendingIntent mConfigureIntent;


    @Override
    public String getName() {
        return "YuelunVpn";
    }

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
//        VpnService myService = new VpnService();
//        VpnService.Builder builder = myService.new Builder();
////
//        mConfigureIntent = PendingIntent.getActivity(getCurrentActivity(), 0, VpnService.prepare(getCurrentActivity()),
//                PendingIntent.FLAG_UPDATE_CURRENT);
//       // builder.addAddress(VPN_ADDRESS, 32);//vpn网卡的ip
////        builder.addRoute(VPN_ROUTE, ROUTE_PREFIX);//设置路由规则
////        builder.setMtu(15000);//数据超过多少之后 分包
//        vpnInterface = builder.setSession("yuelunVpn").setConfigureIntent(mConfigureIntent).establish();
    }
}
