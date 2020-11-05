import * as Types from '../actionTypes';

const initialState = {
    accelerateType: 'auto',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ACCELERATE_TYPE_CHANGE:
            let newType = state.accelerateType === 'auto' ? 'ai' : 'auto'
            return {
                ...state,
                accelerateType: newType
            };
        default: return state;
    }
};
export default reducer;