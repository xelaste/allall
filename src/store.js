import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {reducer as playerReducer} from './reducers/player';
import {reducer as bullscowsgameReducer} from './reducers/bullscowsgame';

const reducer = combineReducers({
  player: playerReducer,
  game: bullscowsgameReducer,
  form: reduxFormReducer
});

const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.store = store;
export default store;

