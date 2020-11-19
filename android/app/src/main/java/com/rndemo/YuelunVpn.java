package com.rndemo;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.Uri;
import android.net.VpnService;
import android.os.Build;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.provider.SyncStateContract;
import android.util.Log;

import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.yuelun.ylsdk.CProxClient;

import org.json.JSONException;
import org.json.JSONObject;
import org.yuelun.ylproxy.YuelunProxyJni;

import java.io.File;
import java.io.FileDescriptor;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
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
    private Thread GetFlowThread = null;
    public boolean m_wokring = true;
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
        copyAssetAndWrite("ip2region.db");
        File dataFile=new File(_reactContext.getCacheDir(),"ip2region.db");
        int ret = com.yuelun.ylsdk.CProxClient.SetFilePath(dataFile.getAbsolutePath());
        if(ret ==-2){
            promise.reject("DB_LOAD_FAILED", "loading db failed!");
        }else {
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
    }
    @ReactMethod
    public void startVpn(String strsessionid,String strgameid,String strType,Promise promise) throws IOException {
        //占用2020端口
        //已经取得真正的参数，开始启动vpn
        System.out.print("star vpn is begin");
        Bundle profileInfo = new Bundle();
        profileInfo.putString("sessionid", strsessionid);
        profileInfo.putString("gameid", strgameid);
        profileInfo.putString("acctype", strType);
        Intent intent = new Intent(_reactContext, ToyVpnService.class);
        intent.putExtras(profileInfo);
        //通过intent传递参数 启动service 代码跳转至toyVpnService
        ContextCompat.startForegroundService(_reactContext, intent);
        promise.resolve("success");
    }

    @ReactMethod
    public void installApk(String path, Promise promise) throws  IOException {
        File file = new File(path);
        Intent install = new Intent(Intent.ACTION_VIEW);
        install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            install.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            Uri contentUri = FileProvider.getUriForFile(_reactContext, "com.rndemo.fileProvider", file);

            install.setDataAndType(contentUri, "application/vnd.android.package-archive");
        } else {
            install.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
        }
        _reactContext.startActivity(install);
        promise.resolve("success");

    }


    @ReactMethod
    public void stopVPN(Promise promise) throws  IOException {
        Intent stopIntent = new Intent(_reactContext, ToyVpnService.class);
        stopIntent.setAction("com.example.android.toyvpn.STOP");
        ContextCompat.startForegroundService(_reactContext,stopIntent);
        //startService(stopIntent);
        //通过intent传递参数 启动service 代码跳转至toyVpnService
        //ContextCompat.startForegroundService(_reactContext, intent);
        promise.resolve("success");
    }

    @ReactMethod
    public void startGame(String strprocessname,Promise promise) throws  IOException {
        Intent settingIntent = this.getReactApplicationContext().getPackageManager().getLaunchIntentForPackage(strprocessname);
        if (settingIntent != null)
        {
            this.getReactApplicationContext().startActivity(settingIntent);
            promise.resolve("success");
        }else {
            promise.resolve("failed");
        }
    }

    @ReactMethod
    public void startNativeHeartThread(String strsession_id,int time, Promise promise){
        m_wokring = true;
        if(GetFlowThread == null) {
            GetFlowThread = new Thread() {
                public void run() {
                    while (m_wokring) {
                        try {
                            promise.resolve("success");
                            sleep(time);
                            String receiveStr = CProxClient.YuelunCheckHear(strsession_id,"","");
                            JSONObject jsonObject = new JSONObject(receiveStr);
                            String status = jsonObject.optString("status");
                            if(status.equals("ok")){
                                JSONObject data = jsonObject.optJSONObject("data");
                                String type = data.optString("type");
                                if(type.equals("normal")){

                                }
                                if(type.equals("logout")){
                                    String str = CProxClient.GetTunnelState();
                                    JSONObject obj = new JSONObject(str);
                                    boolean bacc = obj.optBoolean("bacc");
                                    if(bacc == true){
                                        Intent stopIntent = new Intent(_reactContext, ToyVpnService.class);
                                        stopIntent.setAction("com.example.android.toyvpn.STOP");
                                        ContextCompat.startForegroundService(_reactContext,stopIntent);
                                    }
                                }
                                if(type.equals("close")){
                                    String str = CProxClient.GetTunnelState();
                                    JSONObject obj = new JSONObject(str);
                                    boolean bacc = obj.optBoolean("bacc");
                                    if(bacc == true){
                                        Intent stopIntent = new Intent(_reactContext, ToyVpnService.class);
                                        stopIntent.setAction("com.example.android.toyvpn.STOP");
                                        ContextCompat.startForegroundService(_reactContext,stopIntent);
                                    }
                                }
                            }
                        } catch (InterruptedException | JSONException e) {
                            e.printStackTrace();
                            break;
                        }
                    }
                }
            };
            GetFlowThread.start();
        }
        promise.resolve("success");
    }

    @ReactMethod
    public void stopNativeHeartThread(Promise promise){
        m_wokring = false;
        GetFlowThread = null;
        promise.resolve("success");
    }

    private final String getTag() {
        return ToyVpnConnection.class.getSimpleName() + "[" + 1 + "]";
    }

    private boolean copyAssetAndWrite(String fileName){
        try {
            File cacheDir=_reactContext.getCacheDir();
            if (!cacheDir.exists()){
                cacheDir.mkdirs();
            }
            File outFile =new File(cacheDir,fileName);
            if (!outFile.exists()){
                boolean res=outFile.createNewFile();
                if (!res){
                    return false;
                }
            }else {
                if (outFile.length()>10){//表示已经写入一次
                    return true;
                }
            }
            InputStream is=_reactContext.getAssets().open(fileName);
            FileOutputStream fos = new FileOutputStream(outFile);
            byte[] buffer = new byte[1024];
            int byteCount;
            while ((byteCount = is.read(buffer)) != -1) {
                fos.write(buffer, 0, byteCount);
            }
            fos.flush();
            is.close();
            fos.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return false;
    }
}
