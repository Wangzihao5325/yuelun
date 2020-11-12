import * as Types from '../actionTypes';
import * as ApiModule from '../../Functions/NativeBridge/ApiModule';
import store from '../index';

export const HeartParams = {
    stepReg: 10000,
    heartBeatTimer: null
}

export function login_user_info_init(payload) {
    let { stepReg, heartBeatTimer } = HeartParams;
    if (!heartBeatTimer && stepReg && typeof stepReg == 'number') {
        heartBeatTimer = setInterval(() => {
            ApiModule.checkHeart('', '').then((result) => {
                if (result.status === 'ok') {
                    if (result.data.type === 'normal') {

                    } else if (result.data.type === 'logout') {
                        store.dispatch(logout_user_info_clear());
                    } else if (result.data.type === 'break') {

                    } else if (result.data.type === 'close') {

                    }
                }
            });
        }, stepReg)
    }
    return { type: Types.LOGIN_USER_INFO_INIT, payload };
}

export function logout_user_info_clear() {
    let { heartBeatTimer } = HeartParams;
    if (heartBeatTimer) {
        clearInterval(heartBeatTimer)
        heartBeatTimer = null
    }
    return { type: Types.LOGOUT_USER_INFO_CLEAR };
}

export function unsafe_update(payload) {
    return { type: Types.USER_UNSAFE_UPDATE, payload }
}