package  com.yuelun.ylsdk;

public class CProxClient {
    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("proxy_client");
    }
    /**
     * 协商获取端口
     * @param strip 协商ip YuelunDisConnectServer接口中consult_ip字段为该接口字段
     * @param consultport 协商端口  YuelunDisConnectServer接口中udp_port字段为该接口字段
     * @return -1 失败  大于1则为创建加速隧道的端口的值
     */
    public static native int GetOVPNRealPort(String strip,int consultport);

    /**
     * 创建加速隧道
     *  @param proxyip 服务器ip 登录下发的线路列表
     *  @param port 服务器端口  GetOVPNRealPort后得到的端口
     *  @return “suc” 成功 "error" 失败
     * */
    public static native String createTunnel(String proxyip,int port);

    /**
     * 停止本地代理服务器及其隧道
     */
    public static native void stoplocalproxy();

    /**
     * 启动本地代理服务器
     * @param port 本地代理端口
     * @return  "suc" 成功 "error" 失败
     */
    public static native String startlocalproxy(int port);


}
