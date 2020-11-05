import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import appReducer from './reducers/appReducer';
import userReducer from './reducers/userReducer';
import accReducer from './reducers/accelerateReducer'

const rootReducer = combineReducers({
    test: testReducer,
    app: appReducer,
    user: userReducer,
    acc: accReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;