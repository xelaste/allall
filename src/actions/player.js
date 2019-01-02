import { playerConstants } from "../constants/playerConstants";
import { playerService } from "../services/player.services";

export const playerActions = {
  //login,
  //logout,
  register,
  getAll,
  getWinners,
  updateCurrentPlayer,
  updatePlayerScore
  //delete: _delete
};

function updateCurrentPlayer(playerName) {
  return dispatch => dispatch({
    type: playerConstants.SET_CURRENT_PLAYER,
    payload: playerName
  });
}

function register(player) 
{
  return dispatch => {
    dispatch(request(player));
    playerService.register(player)
      .then(
        result => {
                dispatch(success(result));
                dispatch(getAll());
                },
        error => {
                   dispatch(failure(error.toString()))
                }
      );
  };

  function request(player) { return { type: playerConstants.REGISTER_REQUEST, payload:player } }
  function success(player) { return { type: playerConstants.REGISTER_SUCCESS, payload:player } }
  function failure(error) { return { type: playerConstants.REGISTER_FAILURE, payload:error } }
}


function getAll() {
  return dispatch => {
    dispatch(request());
    playerService.getAll()
      .then(
        players => dispatch(success(players)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: playerConstants.GETALL_REQUEST } }
  function success(players) { return { type: playerConstants.GETALL_SUCCESS, payload: players } }
  function failure(error) { return { type: playerConstants.GETALL_FAILURE, payload: error } }
}

function getWinners() {
  return dispatch => {
    dispatch(request());
    playerService.getWinners()
      .then(
        players => dispatch(success(players)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: playerConstants.GETWINNERS_REQUEST } }
  function success(players) { return { type: playerConstants.GETWINNERS_SUCCESS,  payload: players } }
  function failure(error) { return { type: playerConstants.GETWINNERS_FAILURE,  payload: error } }
}


function updatePlayerScore(playerName, score) 
{
    let player = {name:playerName,score:score}
    return dispatch => {
    dispatch(request(player));
    playerService.update(player).then(
          result => {
            dispatch(success(result));
            dispatch(getAll());
            },
        error => {
              dispatch(failure(error.toString()))
          }
      );
  };

  function request(player) { return { type: playerConstants.UPDATE_REQUEST, payload:player } }
  function success(player) { return { type: playerConstants.UPDATE_SUCCESS, payload:{name:player,score:score} } }
  function failure(error) { return { type: playerConstants.UPDATE_FAILURE, payload:error } }
}


