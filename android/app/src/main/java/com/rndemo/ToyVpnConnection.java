/*
 * Copyright (C) 2017 The Android Open Source Project
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

import static java.nio.charset.StandardCharsets.US_ASCII;

import android.annotation.SuppressLint;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.ProxyInfo;
import android.net.VpnService;
import android.os.Build;
import android.os.Bundle;
import android.os.ParcelFileDescriptor;
import android.text.TextUtils;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.content.ContextCompat;

import com.yuelun.ylsdk.CProxClient;

import org.yuelun.ylproxy.YuelunProxyJni;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.net.SocketException;
import java.nio.ByteBuffer;
import java.nio.channels.DatagramChannel;
import java.util.Locale;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.TimeUnit;

public class ToyVpnConnection implements Runnable {
    /**
     * Callback interface to let the {@link ToyVpnService} know about new connections
     * and update the foreground notification with connection status.
     */
    public interface OnEstablishListener {
        void onEstablish(ParcelFileDescriptor tunInterface);
    }

    /** Maximum packet size is constrained by the MTU, which is given as a signed short. */
    private static final int MAX_PACKET_SIZE = Short.MAX_VALUE;

    /** Time to wait in between losing the connection and retrying. */
    private static final long RECONNECT_WAIT_MS = TimeUnit.SECONDS.toMillis(3);

    /** Time between keepalives if there is no traffic at the moment.
     *
     * TODO: don't do this; it's much better to let the connection die and then reconnect when
     *       necessary instead of keeping the network hardware up for hours on end in between.
     **/
    private static final long KEEPALIVE_INTERVAL_MS = TimeUnit.SECONDS.toMillis(15);

    /** Time to wait without receiving any response before assuming the server is gone. */
    private static final long RECEIVE_TIMEOUT_MS = TimeUnit.SECONDS.toMillis(20);

    /**
     * Time between polling the VPN interface for new traffic, since it's non-blocking.
     *
     * TODO: really don't do this; a blocking read on another thread is much cleaner.
     */
    private static final long IDLE_INTERVAL_MS = TimeUnit.MILLISECONDS.toMillis(100);

    /**
     * Number of periods of length {@IDLE_INTERVAL_MS} to wait before declaring the handshake a
     * complete and abject failure.
     *
     * TODO: use a higher-level protocol; hand-rolling is a fun but pointless exercise.
     */
    private static final int MAX_HANDSHAKE_ATTEMPTS = 50;

    private final VpnService mService;
    private final int mConnectionId;

    private final String mServerName;
    private final int mServerPort;
    private final byte[] mSharedSecret;

    private PendingIntent mConfigureIntent;
    private OnEstablishListener mOnEstablishListener;

    // Proxy settings
    private String mProxyHostName;
    private int mProxyHostPort;

    // Allowed/Disallowed packages for VPN usage
    private final boolean mAllow;
    private final Set<String> mPackages;
    private ParcelFileDescriptor tunfd;
    public ToyVpnConnection(final VpnService service, final int connectionId,
                            final String serverName, final int serverPort, final byte[] sharedSecret,
                            final String proxyHostName, final int proxyHostPort, boolean allow,
                            final Set<String> packages) {
        mService = service;
        mConnectionId = connectionId;

        mServerName = serverName;
        mServerPort= serverPort;
        mSharedSecret = sharedSecret;

        if (!TextUtils.isEmpty(proxyHostName)) {
            mProxyHostName = proxyHostName;
        }
        if (proxyHostPort > 0) {
            // The port value is always an integer due to the configured inputType.
            mProxyHostPort = proxyHostPort;
        }
        mAllow = allow;
        mPackages = packages;
    }

    /**
     * Optionally, set an intent to configure the VPN. This is {@code null} by default.
     */
    public void setConfigureIntent(PendingIntent intent) {
        mConfigureIntent = intent;
    }

    public void setOnEstablishListener(OnEstablishListener listener) {
        mOnEstablishListener = listener;
    }

    @Override
    public void run() {
        try {
            Log.i(getTag(), "Starting");

            // If anything needs to be obtained using the network, get it now.
            // This greatly reduces the complexity of seamless handover, which
            // tries to recreate the tunnel without shutting down everything.
            // In this demo, all we need to know is the server address.
            final SocketAddress serverAddress = new InetSocketAddress(mServerName, mServerPort);

            // We try to create the tunnel several times.
            // TODO: The better way is to work with ConnectivityManager, trying only when the
            // network is available.
            // Here we just use a counter to keep things simple.
            for (int attempt = 0; attempt < 2; ++attempt) {
                // Reset the counter if we were connected.
                if (run(serverAddress)) {
                    attempt = 0;
                }

                // Sleep for a while. This also checks if we got interrupted.
                Thread.sleep(3000);
            }
            Log.i(getTag(), "Giving up");
        } catch (IOException | InterruptedException | IllegalArgumentException e) {
            Log.e(getTag(), "Connection failed, exiting", e);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
    }

    @SuppressLint("NewApi")
    private boolean run(SocketAddress server)
            throws IOException, InterruptedException, IllegalArgumentException, PackageManager.NameNotFoundException {
        ParcelFileDescriptor iface = null;
        boolean connected = false;
        CProxClient.YuelunGetGameInfoById("41ffc2c7e0b1d9db6999cdce3d5c626432eb2a45","7","");
        int port = getNum(40000,50000);
        int ret = CProxClient.createTunnel("41ffc2c7e0b1d9db6999cdce3d5c626432eb2a45","7",port,2);
        if (ret == 0)
        {
            iface = tunestablish();
            String socksServerAddress = String.format(Locale.ROOT, "%s:%d", "127.0.0.1", port);
            boolean remoteUdpForwardingEnabled = true;
            Object dnsResolverAddress = null;
            Log.w(getTag(), "begin create ylproxy...\n");


                    YuelunProxyJni.start(iface.getFd(), 1500,
                            "10.172.2.70",  // Router IP address
                            "255.255.255.0", null, socksServerAddress,
                            socksServerAddress, // UDP relay IP address
                            null,
                            0,
                            1);


            // Now we are connected. Set the flag.
            connected = true;
            return true;
        }

        if (iface != null) {
            try {
                iface.close();
            } catch (IOException e) {
                Log.e(getTag(), "Unable to close interface", e);
            }
        }

        return false;
    }
    @SuppressLint("NewApi")
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    private ParcelFileDescriptor tunestablish() throws IllegalArgumentException, PackageManager.NameNotFoundException {
        // Configure a builder while parsing the parameters.
        VpnService.Builder builder = mService.new Builder();
        // builder.setSession(mService.getApplicationName());
        builder.setMtu(1500);
        builder.addAddress("10.172.2.70",24);
        builder.addRoute("0.0.0.0",0);
        builder.addDnsServer("216.146.35.35");

        String[] appPackages = {
                "com.rndemo"
        };
        for (String packageName : appPackages) {
            try {
                if (mAllow) {
                    //     packageManager.getPackageInfo(packageName, 0);
                    builder.addAllowedApplication(packageName);
                } else {
                    builder.addDisallowedApplication(packageName);
                }
            } catch (PackageManager.NameNotFoundException e){
                Log.w(getTag(), "Package not available: " + packageName, e);
            }
        }

        builder.setSession(mServerName).setConfigureIntent(mConfigureIntent);
        if (!TextUtils.isEmpty(mProxyHostName)) {

        }
        synchronized (mService) {
            tunfd = builder.establish();
            if (mOnEstablishListener != null) {
                mOnEstablishListener.onEstablish(tunfd);
            }
        }
        Log.i(getTag(), "New interface: " + tunfd );
        return tunfd;
    }


    private final String getTag() {
        return ToyVpnConnection.class.getSimpleName() + "[" + mConnectionId + "]";
    }

    public static int getNum(int startNum,int endNum){
        if(endNum > startNum){
            Random random = new Random();
            return random.nextInt(endNum - startNum) + startNum;
        }
        return 0;
    }
}
