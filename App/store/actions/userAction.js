import * as Types from '../actionTypes';

export function login_user_info_init(payload) {
    return { type: Types.LOGIN_USER_INFO_INIT, payload };
}

export function logout_user_info_clear() {
    return { type: Types.LOGOUT_USER_INFO_CLEAR };
}

export function unsafe_update(payload) {
    return { typs: Types.USER_UNSAFE_UPDATE, payload }
}