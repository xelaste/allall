import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Game extends React.Component {
  render() {
    return (
      <div className="h-100 panel">
        <div><h1>Bulls and Cows</h1></div>
        <div className="panel-body h-100">
          <nav className="mb-1 nav nav-pills">
            <IndexLink to="/" className="nav-link" activeClassName="active">Home</IndexLink>
            {/*<Link to="home" activeClassName="active">Home</Link>
          <Link to="game" activeClassName="active">Game</Link>*/}
            <Link to="highscore" className="nav-link" activeClassName="active">Highscore</Link>
          </nav>
          <div className="h-100">{this.props.children}</div>
        </div>
      </div>
    );
  }
};
