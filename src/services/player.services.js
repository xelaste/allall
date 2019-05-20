import config from 'config';
//import { authHeader } from '../_helpers';

export const playerService = 
{
    login,
    logout,
    register,
    getAll,
    getWinners,
    update,
    delete: _delete
};
function login(username,password) 
{
    const player={username:username,password:password}
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
    };
    return fetch(`${config.apiUrl}/players/` + username + "/login", requestOptions)
    .then(handleResponse)
    .then(player => {
            localStorage.setItem('player', JSON.stringify(player));
            return player;
        }
    );
}
function logout() 
{
    localStorage.removeItem('player');
}
    

function register(player) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)

    };

    return fetch(`${config.apiUrl}/players`, requestOptions).then(handleResponse);
}


function update(player) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(player)
    };
    return fetch(`${config.apiUrl}/players`, requestOptions).then(handleResponse);
}


function getAll() 
{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        //headers: authHeader()
    };
    return fetch(`${config.apiUrl}/players`, requestOptions).then(handleResponse);
}

function getWinners() 
{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
        //headers: authHeader()
    };
    return fetch(`${config.apiUrl}/players/winners`, requestOptions).then(handleResponse);
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(name) 
{
    const requestOptions = {
        method: 'DELETE'
        //headers: authHeader()
    };
    return fetch(`${config.apiUrl}/players/${name}`, requestOptions).then(handleResponse);
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            /*
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            */
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
