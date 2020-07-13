import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    test: testReducer,
    app: appReducer,
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;