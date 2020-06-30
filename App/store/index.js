import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';

const rootReducer = combineReducers({
    test: testReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;