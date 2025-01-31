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
    } else {
        return Promise.resolve(YuelunVpnModule.prepare());
    }
}

export function startVpn(ip, port, type, tunnel) {
    if (Platform.OS === 'ios') {
        YuelunVpnModule.startVpn(ip, port, tunnel);
    } else {
        YuelunVpnModule.startVpn(ip, port, type);
    }
}

export function stopVPN() {
    YuelunVpnModule.stopVPN();
}

export function yuelunGetNewConfig() {
    YuelunVpnModule.yuelunGetNewConfig('162.14.5.205', 32091);
}

export async function startApp(packageName) {
    let state = await YuelunVpnModule.startGame(packageName);
    return state
}

export async function installApk(path) {
    await YuelunVpnModule.installApk(path)
}

export function startHeart(session, timeReg) {
    YuelunVpnModule.startNativeHeartThread(session, timeReg)
}

export function endHeart() {
    YuelunVpnModule.stopNativeHeartThread()
}