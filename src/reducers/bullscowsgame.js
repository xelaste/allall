import Immutable from 'immutable';
import { symbols as gameSymbols } from '../actions/bullscowsgame';
import { getFormValues } from 'redux-form';

const initialState = Immutable.fromJS(
    {
        gamingNow: false,
        secret: [0, 0, 0, 0],
        validValues: ["123456789", "123456789", "123456789", "123456789"],
        results: []
    }
);

function newGame(state = initialState, secret) {
    let results = [];
    return initialState.set("gamingNow", true).set("secret", secret);
}


function skip(state) {
    let results = state.get("results");
    let result = Immutable.fromJS(
        {
            guess: 'skip',
            exist: "-",
            matches: "-"
        }
    )
    results = results.push(result);
    return state.set("results", results);
}


function play(state, guess) {
    let secret = [...state.get("secret")]
    let exist = 0;
    let matches = 0
    for (let i = 0; i < guess.length; i++) {
        for (let j = 0; j < secret.length; j++) {
            if (secret[j] === guess[i]) 
            {
                if (i === j) {
                    matches++;
                }
                else {
                    exist++;
                }
            }
        }
    }
    let results = state.get("results");
    let result = Immutable.fromJS(
        {
            guess: guess,
            exist: exist,
            matches: matches
        }
    )
    results = results.push(result);
    return state.set("results", results);
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case gameSymbols.play:
            return play(state, action.payload);
        case gameSymbols.newGame:
            return newGame(state, action.payload.secret);

        case gameSymbols.stop:
            return state.set("gamingNow", false);

        case gameSymbols.skip:
            return skip(state);
        default:
            return state;
    }
}
