export const symbols = {
  addPlayer: '@@player/addPlayer',
  updateScore: '@@player/updateScore',
  updateCurrentPlayer: '@@player/updateCurentPlayer',
  fetchPlayersBegin:'@@player/FETCH_PLAYERS_BEGIN',
  fetchPlayersSuccess: '@@player/FETCH_PLAYERS_SUCCESS',
  fetchPlayerssFailure: '@@player/FETCH_PLAYERS_FAILURE'
};

export function fetchAllPlayers(data) 
{
  return {
    type: symbols.fetchPlayersSuccess,
    payload: data
  };

}

export function addPlayer(player) {
  return {
    type: symbols.addPlayer,
    payload: player
  };

}

export function updateCurentPlayer(player) {
  return {
    type: symbols.updateCurrentPlayer,
    payload: player
  };
}

export function updateScore(playerName,score) 
{
  return {
    type: symbols.updateScore,
    payload: {player:playerName,score:score}
  };
}

