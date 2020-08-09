import * as Types from '../actionTypes';

const initialState = {
    isLogin: false,
    mobile: '',

    end_time: 0,
    login_ip: null,
    network_ip: null,
    package_id: "0",
    package_name: "0",
    package_type: "0",
    remaining_time: "0",
    server_list: null,
    session_id: "30aeb009eb61995d2fc22611dcc9d89a5301d0a2",
    session_limit: "1",
    source: "0",
    status: "sleeping",
    timestamp: 0,
    type: "normal",
    user_id: "0",
    username: "未登录",
    yy_id: "0",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOGIN_USER_INFO_INIT:
            return {
                ...state,
                isLogin: true,
                ...action.payload,
            };
        case Types.LOGOUT_USER_INFO_CLEAR:
            return {
                ...initialState
            };
        case Types.USER_UNSAFE_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;