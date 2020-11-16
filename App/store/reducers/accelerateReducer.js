import * as Types from '../actionTypes';

const initialState = {
    accelerateType: 'ai',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ACCELERATE_TYPE_CHANGE:
            let newType = state.accelerateType === 'auto' ? 'ai' : 'auto'
            return {
                ...state,
                accelerateType: newType
            };
        case Types.ACCELERATE_TYPE_CHANGE_UNSAFE:
            return {
                ...state,
                accelerateType: action.value
            };
        default: return state;
    }
};
export default reducer;