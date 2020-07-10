import * as Types from '../actionTypes';

const initialState = {
    isInit: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.APP_INIT:
            return {
                ...state,
                isInit: true
            };
        default: return state;
    }
};
export default reducer;