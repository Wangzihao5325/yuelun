
package org.yuelun.ylproxy;

import java.util.logging.Level;
import java.util.Locale;
import java.util.logging.Logger;

public class YuelunProxyJni {
  private static final String YLPROXY = "ylproxy";


  public static native int start(
      int vpnInterfaceFileDescriptor,
      int vpnInterfaceMTU,
      String vpnIpAddress,
      String vpnNetMask,
      String vpnIpV6Address,
      String socksServerAddress,
      String udpRelayAddress,
      String dnsResolverAddress,
      int transparentDNS,
      int socks5UDP);

  public static native int stop();



  static {
    System.loadLibrary(YLPROXY);
  }
}
