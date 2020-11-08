import * as Types from '../actionTypes';

const initialState = {
    isLogin: false,
    isFirstAccelerate:true,//用来判断是否是第一次加速，第一次加速需要弹一堆窗
    mobile: '',

    head_url: '',//get userInfo by session ONLY
    end_time: 0,
    login_ip: null,
    network_ip: null,
    package_id: "0",
    package_name: "0",
    package_type: "0",
    package_end_time:'',
    remaining_time: "0",
    server_list: null,
    session_id: "",
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