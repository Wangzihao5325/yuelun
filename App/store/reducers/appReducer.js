import * as Types from '../actionTypes';

const initialState = {
    isInitPageScrollenabled: false,
    isInit: true,
    isLogin: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.APP_INIT:
            return {
                ...state,
                isInit: true,
                isLogin: false,
            };
        case Types.APP_INIT_CAN_SCROLL:
            return {
                ...state,
                isInitPageScrollenabled: true
            };
        case Types.APP_LOGIN:
            return {
                ...state,
                isInit: false,
                isLogin: true,
            }
        case Types.APP_START_APP:
            return {
                ...state,
                isInit: false,
                isLogin: false,
            }
        default: return state;
    }
};
export default reducer;