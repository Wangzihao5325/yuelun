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

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.VpnService;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.os.ParcelFileDescriptor;
import android.util.Log;
import android.util.Pair;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import org.yuelun.ylproxy.YuelunProxyJni;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

@SuppressLint("NewApi")
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
        mConfigureIntent = PendingIntent.getActivity(this, 0, new Intent(this, ToyVpnClient.class),
                PendingIntent.FLAG_UPDATE_CURRENT);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_DISCONNECT.equals(intent.getAction())) {
            try {
                disconnect();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return START_NOT_STICKY;
        } else {
            connect();
            return START_STICKY;
        }
    }

    @Override
    public void onDestroy() {
        try {
            disconnect();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public boolean handleMessage(Message message) {
        Toast.makeText(this, message.what, Toast.LENGTH_SHORT).show();
        if (message.what != R.string.disconnected) {
            updateForegroundNotification(message.what);
        }
        return true;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void connect() {
        // Become a foreground service. Background services can be VPN services too, but they can
        // be killed by background check before getting a chance to receive onRevoke().
        updateForegroundNotification(R.string.connecting);
        mHandler.sendEmptyMessage(R.string.connecting);
        String  straddressipv4  = Utils.getIPAddress(true); // IPv4
        String  straddressipv6  = Utils.getIPAddress(false); // IPv6
        String  straddress1  =   Utils.getMACAddress("wlan0");//MAC wlan0
        String  straddress2 =  Utils.getMACAddress("eth0");//MAC eth0
        // Extract information from the shared preferences.
        final SharedPreferences prefs = getSharedPreferences(ToyVpnClient.Prefs.NAME, MODE_PRIVATE);
        final String server = prefs.getString(ToyVpnClient.Prefs.SERVER_ADDRESS, "");
        final byte[] secret = prefs.getString(ToyVpnClient.Prefs.SHARED_SECRET, "").getBytes();
        final boolean allow = prefs.getBoolean(ToyVpnClient.Prefs.ALLOW, true);
        final Set<String> packages =
                prefs.getStringSet(ToyVpnClient.Prefs.PACKAGES, Collections.emptySet());
        final int port = prefs.getInt(ToyVpnClient.Prefs.SERVER_PORT, 0);
        final String proxyHost = prefs.getString(ToyVpnClient.Prefs.PROXY_HOSTNAME, "");
        final int proxyPort = prefs.getInt(ToyVpnClient.Prefs.PROXY_PORT, 0);
      //  ParcelFileDescriptor vpnInterface = null;
        mVpnConnection = new ToyVpnConnection(
                this, mNextConnectionId.getAndIncrement(), server, port, secret,
                proxyHost, proxyPort, allow, packages, null);
        startConnection(mVpnConnection);
    }

    private void startConnection(final ToyVpnConnection connection) {
        // Replace any existing connecting thread with the  new one.
       proxycllientThread  = new Thread(connection, "ToyVpnThread");
        setConnectingThread(proxycllientThread);

        // Handler to mark as connected once onEstablish is called.
        connection.setConfigureIntent(mConfigureIntent);
        connection.setOnEstablishListener(tunInterface -> {
            mHandler.sendEmptyMessage(R.string.connected);

            mConnectingThread.compareAndSet(proxycllientThread, null);
            setConnection(new Connection(proxycllientThread, tunInterface));
        });
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

    private void disconnect() throws InterruptedException {

//        mHandler.sendEmptyMessage(R.string.disconnected);
//        com.fucknmb.myapplication.CProxClient.stoplocalproxy();
//        YuelunProxyJni.stop();
//        mVpnConnection.tearDownVpn();
//
//        setConnectingThread(null);
//        setConnection(null);
//        stopForeground(true);
//        mHandler.sendEmptyMessage(R.string.disconnected_suc);
    }
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void updateForegroundNotification(final int message) {

        final String NOTIFICATION_CHANNEL_ID = "ToyVpn";
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(
                NOTIFICATION_SERVICE);
        mNotificationManager.createNotificationChannel(new NotificationChannel(
                NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_ID,
                NotificationManager.IMPORTANCE_DEFAULT));
        startForeground(1, new Notification.Builder(this, NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentText(getString(message))
                .setContentIntent(mConfigureIntent)
                .build());
    }

}
