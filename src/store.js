import { createStore, combineReducers ,applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {reducer as playerReducer} from './reducers/player';
import {reducer as bullscowsgameReducer} from './reducers/bullscowsgame';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();


const reducer = combineReducers({
  player: playerReducer,
  game: bullscowsgameReducer,
  form: reduxFormReducer
});

const store = createStore(
  reducer, /* preloadedState, */
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.store = store;
export default store;

