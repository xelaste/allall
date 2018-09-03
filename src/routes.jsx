import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app';
import Home from './components/home';
import Highscore from './components/highscore';
import Game from './components/game';
import { Provider } from 'react-redux';
import store from './store';

export default class Routes extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="highscore" component={Highscore}/>
            <Route path="game" component={Game} />
          </Route>
        </Router>
      </Provider>);
  }
};



