/*
 * Copyright (C) 2011 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.rndemo;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.VpnService;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.ParcelFileDescriptor;
import android.util.Log;
import android.util.Pair;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.yuelun.ylsdk.CProxClient;

import org.json.JSONException;
import org.json.JSONObject;
import org.yuelun.ylproxy.YuelunProxyJni;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

public class ToyVpnService extends VpnService implements Handler.Callback {

    private static final String VPN_INTERFACE_PRIVATE_LAN = "10.111.222.%s";
    private static final int VPN_INTERFACE_PREFIX_LENGTH = 24;
    private static final String VPN_INTERFACE_NETMASK = "255.255.255.0";
    private static final String VPN_IPV6_NULL = null;  // No IPv6 support.
    private static final int VPN_INTERFACE_MTU = 1500;
    // OpenDNS and Dyn IP addresses.
    private static final String[] DNS_RESOLVER_IP_ADDRESSES = {
            "216.146.35.35", "216.146.36.36",
            "208.67.222.222", "208.67.220.220"
    };
    private static final String PRIVATE_LAN_BYPASS_SUBNETS_ID = "reserved_bypass_subnets";
    private static final int DNS_RESOLVER_PORT = 53;
    private static final int TRANSPARENT_DNS_ENABLED = 1;
    private static final int SOCKS5_UDP_ENABLED = 1;
    private static final int SOCKS5_UDP_DISABLED = 0;

    private static final String TAG = ToyVpnService.class.getSimpleName();

    public static final String ACTION_CONNECT = "com.example.android.toyvpn.START";
    public static final String ACTION_DISCONNECT = "com.example.android.toyvpn.STOP";
    private ToyVpnConnection mVpnConnection;
    private Handler mHandler;
    private ReactContext _reactContext;
    private static class Connection extends Pair<Thread, ParcelFileDescriptor> {
        public Connection(Thread thread, ParcelFileDescriptor pfd) {
            super(thread, pfd);
        }
    }

    private final AtomicReference<Thread> mConnectingThread = new AtomicReference<>();
    private final AtomicReference<Connection> mConnection = new AtomicReference<>();

    private AtomicInteger mNextConnectionId = new AtomicInteger(1);

    private PendingIntent mConfigureIntent;
    private Thread proxycllientThread = null;
    @Override
    public void onCreate() {
        // The handler is only used to show messages.
        if (mHandler == null) {
            mHandler = new Handler(this);
        }

        // Create the intent to "configure" the connection (just start ToyVpnClient).
        mConfigureIntent = PendingIntent.getActivity(this, 0, new Intent(this, YuelunVpn.class),
                PendingIntent.FLAG_UPDATE_CURRENT);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_DISCONNECT.equals(intent.getAction())) {
            mHandler.sendEmptyMessage(R.string.disconnecting);
            try {
                disconnect();
            } catch (InterruptedException | JSONException e) {
                e.printStackTrace();
            }
            return START_NOT_STICKY;
        } else {
            connect(intent);
            return START_STICKY;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public boolean handleMessage(Message message) {
        //Toast.makeText(this, message.what, Toast.LENGTH_SHORT).show();
//        if (message.what != R.string.disconnected) {
            updateForegroundNotification(message.what);
            if(_reactContext == null) {
                MainApplication application = (MainApplication) this.getApplication();
                ReactNativeHost reactNativeHost = application.getReactNativeHost();
                ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
                _reactContext = reactInstanceManager.getCurrentReactContext();
            }
            if (_reactContext != null) {
                WritableNativeArray params = new WritableNativeArray();
                params.pushString(getString(message.what));
                _reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("vpn_state", params);
            }
        //}
        return true;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void connect(Intent intent) {
        // Become a foreground service. Background services can be VPN services too, but they can
        // be killed by background check before getting a chance to receive onRevoke().
        //updateForegroundNotification(R.string.connecting);
        mHandler.sendEmptyMessage(R.string.connecting);

        // Extract information from the shared preferences.
        Bundle bundle = intent.getExtras();
        final String strsessionid = bundle.getString("sessionid");

        final String strgameid = bundle.getString("gameid");
        final String stracctype = bundle.getString("acctype");
        mVpnConnection = new ToyVpnConnection(
                this, mNextConnectionId.getAndIncrement(), strsessionid, strgameid, "".getBytes(),
                "", 0, false,stracctype, Collections.emptySet(),mHandler);
        startConnection(mVpnConnection);
    }
    private boolean copyAssetAndWrite(String fileName){
        try {
            File cacheDir=getCacheDir();
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
            InputStream is=getAssets().open(fileName);
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
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private void startConnection(final ToyVpnConnection connection) {
        proxycllientThread =
                new Thread() {
                    public void run() {
                        connection.setConfigureIntent(mConfigureIntent);

                        connection.setOnEstablishListener(tunInterface -> {
                           mHandler.sendEmptyMessage(R.string.connected);

                            mConnectingThread.compareAndSet(proxycllientThread, null);
                            setConnection(new Connection(proxycllientThread, tunInterface));
                        });
                        try {
                            connection.run();
                        } catch (PackageManager.NameNotFoundException e) {
                            mHandler.sendEmptyMessage(R.string.failed);
                            e.printStackTrace();
                        }
                    }
                };
        proxycllientThread.start();


    }

    private void setConnectingThread(final Thread thread) {
        final Thread oldThread = mConnectingThread.getAndSet(thread);
        if (oldThread != null) {
            oldThread.interrupt();
        }
    }

    private void setConnection(final Connection connection) {
        final Connection oldConnection = mConnection.getAndSet(connection);
        if (oldConnection != null) {
            try {
                oldConnection.first.interrupt();
                oldConnection.second.close();
            } catch (IOException e) {
                Log.e(TAG, "Closing VPN interface", e);
            }
        }
    }

    private void disconnect() throws InterruptedException, JSONException {
        String str = CProxClient.GetTunnelState();
        JSONObject obj = new JSONObject(str);
        boolean bacc = obj.optBoolean("bacc");
        if(bacc == true){
            com.yuelun.ylsdk.CProxClient.stoplocalproxy();
            mVpnConnection.disconnectTunnel();
            mVpnConnection.tearDownVpn();
        }
        stopForeground(true);
        mHandler.sendEmptyMessage(R.string.disconnected);
        this.stopSelf();
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void updateForegroundNotification(final int message) {

        final String NOTIFICATION_CHANNEL_ID = "ToyVpn";
        String notiMessage = "";
        switch (getString(message)){
            case "ToyVPN is connecting...":
                notiMessage = "加速链接创建中";
                break;
            case "ToyVPN is connected!":
                notiMessage = "游戏加速中";
                break;
            case "ToyVPN is connect failed!":
                notiMessage = "加速失败";
                break;
        }
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(
                NOTIFICATION_SERVICE);
        mNotificationManager.createNotificationChannel(new NotificationChannel(
                NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_ID,
                NotificationManager.IMPORTANCE_DEFAULT));
        startForeground(1, new Notification.Builder(this, NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentText(notiMessage)
                .setContentIntent(mConfigureIntent)
                .build());
    }

}
