/**
 * Use this file to define and implement the main menu home page.
 *
 * At minimum you should create a container called Home
 * for the menu home page. You may also define helper components.
 *
 * All components used for Home container should also
 * be defined and implemented in this file.
 */


import React from 'react';
import HomeForm from './home_form'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as playerActions from "../actions/player";
import * as gameActions from "../actions/bullscowsgame";
import { getFormValues, isPristine, isSubmitting, reset, submit } from 'redux-form';
import { SubmissionError } from 'redux-form';
import Game from './game';
import { generateSecretArray } from '../util/secretGenerator';
import $ from 'jquery';

function mapStateToProps(state) {
  return {
    players: [...state.player.get('players')],
    currentPlayer: state.player.get('currentPlayer'),
    values: getFormValues('homeForm')(state),
    pristine: isPristine('homeForm')(state),
    submitting: isSubmitting('homeForm')(state),
    error: state.player.get('error'),
    gamingNow: state.game.get('gamingNow')
  }
}

function updateCurrentPlayer(props, player) {
  props.dispatch(playerActions.updateCurentPlayer(player));
}

function PlayersList(ctx) {

  return <div className="h-100">
    <h4>Player's List</h4>
    <div className="h-100 w-50" style={{ overflowY: 'auto' }}>
      <ul className="list-group">
        {ctx.props.players.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between mx-0">
            <span className="d-flex justify-content-end">
              <input className="mt-2" id={'radio_player_' + idx} name="player" type="radio" onClick={() => updateCurrentPlayer(ctx.props, item.get("name"))} onChange={() => { }} checked={(item.get("name") === ctx.props.currentPlayer)} />
              <span className="px-1" >{item.get("name")}</span>
            </span>
            <span className="badge-primary badge-pill">{item.get("score")}</span></li>
        ))}
      </ul>
    </div>
  </div>
}


class Home extends React.Component {
  static propTypes = {
    players: PropTypes.array,
    currentPlayer: PropTypes.string,
    dispatch: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    gamingNow: PropTypes.bool,
    error: PropTypes.string
  };

  componentDidMount() {
    this.fetchPlayers().then(data => {
      console.log("Data:", JSON.stringify(data));
      this.props.dispatch(playerActions.fetchAllPlayers(data));
    });

  }

  async  fetchPlayers() {
    const result = await $.ajax(
      {
        type: "GET",
        url: "/players",
        dataType: "json",
        contentType: "application/json"
      }
    ).catch(error => { throw "System Error"; });
    return result;
  }

  async persistPlayer(player) {
    const result = await $.ajax(
      {
        type: "POST",
        url: "/players",
        data: JSON.stringify(player),
        dataType: "json",
        contentType: "application/json"
      }
    ).catch(error => { throw "System Error"; });
    return result;
  }

  async handleSubmit() {
    console.log("enter handleSubmit");
    try {
      let playerName = this.props.values.playerName;
      this.props.dispatch(playerActions.addPlayer(playerName));
      this.persistPlayer({ name: playerName, score: 0 })
    }
    catch (error) {
      throw new SubmissionError({
        msg: error,
        _error: error
      })

    }
    console.log("exit handleSubmit");
  }
  render() {
    if (this.props.gamingNow) {
      return (<Game />);
    }
    else
      return (
        <div className="mt-10 h-100">
          <HomeForm onSubmit={this.handleSubmit.bind(this)} />
          <PlayersList props={this.props} />
          <div className="panel fixed-bottom">
            <button className="btn btn-primary btn-sm col-md-1 mr-1" type="submit" disabled={this.props.pristine || this.props.submiting}
              type="button"
              onClick={() => this.props.dispatch(submit('homeForm'))}
            >    Submit </button>
            <button className="btn btn-primary btn-sm col-md-1 ml-1"
              type="button" disabled={(this.props.pristine && !this.props.currentPlayer) || this.props.submiting}
              onClick={() => { this.props.dispatch(reset('homeForm')); updateCurrentPlayer(this.props, "") }}>
              Clear Values
            </button>
            <button className="btn btn-primary btn-sm col-md-1 ml-1"
              type="button" disabled={!this.props.currentPlayer}
              onClick={() => this.props.dispatch(gameActions.newGame(generateSecretArray()))}>
              Play
            </button>
          </div>
        </div>
      )
  };

}
export default connect(mapStateToProps)(Home);

