import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const YuelunVpnModule = NativeModules.YuelunVpn;
let VpnEmitter = null;
/** 
 * local & rn`s communicaiton function
 * 
*/
export function prepare(serverAddress, serverPort, mtu, ip, subnet, dns, listenerFun) {
    if (Platform.OS === 'ios') {
        // if (!VpnEmitter) {
        //     vpnEmitter = new NativeEventEmitter(YuelunVpnModule);
        //     vpnEmitter.addListener('com.yuelun.VPN.stateListener', (state) => {
        //         console.log(state);
        //         listenerFun(state);
        //     })

        // }
        return Promise.resolve(YuelunVpnModule.prepare(serverAddress, serverPort, mtu, ip, subnet, dns));
    }
}

export function startVpn() {
    if (Platform.OS === 'ios') {
        YuelunVpnModule.startVpn();
    }
}

export function stopVPN() {
    if (Platform.OS === 'ios') {
        YuelunVpnModule.stopVPN();
    }
}

export function yuelunGetNewConfig() {
    YuelunVpnModule.yuelunGetNewConfig('162.14.5.205', 32091);
}