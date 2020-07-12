import * as Types from '../actionTypes';

export function app_init() {
    return { type: Types.APP_INIT };
}

export function app_login() {
    return { type: Types.APP_LOGIN };
}

export function app_start_app() {
    return { type: Types.APP_START_APP };
}