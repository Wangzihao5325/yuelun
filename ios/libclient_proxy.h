void stopproxy();
int InitLocalProxyServer(int port);
int CreateProxyTunnel(char* proxyip, int port);
int GetOVPNRealPort(char* consultaddr,int consultport);
