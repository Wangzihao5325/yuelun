import * as Types from '../actionTypes';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';
import * as vpnModule from '../../Functions/NativeBridge/YuelunVpn';
import store from '../index';
import VpnStateUtil from '../../Functions/Util/vpnStateUtil';
import { _unsafe_setSession } from '../../Functions/NativeBridge/ApiModule';

export const HeartParams = {
    stepReg: 10000,
    heartBeatTimer: null
}

export function login_user_info_init(payload) {
    let { stepReg, heartBeatTimer } = HeartParams;
    //vpnModule.startHeart(ApiModule._sessionId, HeartParams.stepReg)
    vpnModule.startHeart(payload.sessionId, stepReg)
    return { type: Types.LOGIN_USER_INFO_INIT, payload };
}

export function logout_user_info_clear() {
    let { heartBeatTimer } = HeartParams;
    vpnModule.endHeart();
    _unsafe_setSession('')
    return { type: Types.LOGOUT_USER_INFO_CLEAR };
}

export function unsafe_update(payload) {
    return { type: Types.USER_UNSAFE_UPDATE, payload }
}