import Immutable from 'immutable';
import { symbols as playerSymbols } from '../actions/player';
import $ from 'jquery';

const EMPTY_LIST = Immutable.fromJS([]);
const initialState = Immutable.fromJS(
    {
        players: EMPTY_LIST,
        currentPlayer: '',
        error: ''
    }
);

export default function (state = initialState, action) {
    return reducer(state, action);
}

function addPlayer(state, playerName) {
    let player = Immutable.Map({ name: playerName, score: 0 });
    if (isNewPlayer(state, playerName)==true) 
    {
        state = state.update('players', (val) => val.push(player));
    } else {
        state = state.update('error', () => "Player exists already");
        throw state.get("error");
    }
    return state;
}

function  updatePlayer(player) {
    const result = $.ajax(
      {
        type: "PUT",
        url: "/players",
        data: JSON.stringify(player),
        dataType: "json",
        contentType: "application/json"
      }
    ).catch(error=> {throw "System Error";});
    return result;
}

function updatePlayerScore(state, playerName, score) {
    let player = state.get('players').find((player) => player.get('name') == playerName);
    if (player) {
        player = player.set('score', player.get('score') + score);
        updatePlayer(player);
        let players = state.get('players');
        players = players.filter((o) => o.get('name') !== playerName);
        return state.set('players', players.push(player));
    }
    return state;
}

function isNewPlayer(state, playerName) {
    let player = state.get('players').filter((o) => o.get('name') == playerName);
    return (player.size == 0);
}
function updateCurrentPlayer(state, playerName) {
    if (playerName) {
        if (isNewPlayer(state, playerName)) {
            state = addPlayer(state, playerName);
        }
    }
    return state.set('currentPlayer', playerName)
}

function fetchPlayers(state, data) {
    state = state.update('players',()=>EMPTY_LIST);
    state = state.update('players', (val) => val.push(...data.map(item => Immutable.Map(item))));
    return state;
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case playerSymbols.fetchPlayersSuccess:
            return fetchPlayers(state, action.payload);

        case playerSymbols.addPlayer:
            return addPlayer(state, action.payload);

        case playerSymbols.updateScore:
            return updatePlayerScore(state, action.payload.player, action.payload.score);

        case playerSymbols.updateCurrentPlayer:
            return updateCurrentPlayer(state, action.payload);

        default:
            return state;
    }
}
