import * as ActionTypes from './actionTypes';
import * as ApiFunctions from '../api/ApiFunctions'

export function getPULForName(name) {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_MATCH_LINES })
        ApiFunctions.fetchLinesForName(name).then(response => {
            return response.json()
        }).then(
            json => {
                try {
                    dispatch({ type: ActionTypes.RECEIVED_MATCH_LINES, payload: json })
                }
                catch {
                    dispatch({ type: ActionTypes.FAILED_FETCH_MATCH_LINES, payload: json })
                }

            }
        )
    }
}

export function getToken(email, password) {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_TOKEN })
        ApiFunctions.fetchAuthToken(email, password).then(response => {
            return response.json()
        })
            .then(
                json => {
                    try {
                        if (json["token"]) {
                            dispatch({ type: ActionTypes.RECEIVED_TOKEN, payload: json["token"] })
                        }
                    }
                    catch {
                        dispatch({ type: ActionTypes.FAILED_FETCH_TOKEN, payload: json })
                    }

                }
            )
    }
}

export function getMatchData(token) {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_MATCH_DATA })
        ApiFunctions.fetchMatchData(token).then(response => {
            return response.json()
        })
            .then(
                json => {
                    try {

                        dispatch({ type: ActionTypes.RECEIVED_MATCH_DATA, payload: json })

                    }
                    catch {
                        dispatch({ type: ActionTypes.FAILED_FETCH_MATCH_DATA, payload: json })
                    }

                }
            )
    }
}

export function getMatchMessages(token, match_id) {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_MATCH_MESSAGES })
        ApiFunctions.fetchMatchMessages(token, match_id).then(response => {
            return response.json()
        })
            .then(
                json => {
                    try {

                        dispatch({ type: ActionTypes.RECEIVED_MATCH_MESSAGES, payload: json })

                    }
                    catch {
                        dispatch({ type: ActionTypes.FAILED_FETCH_MATCH_MESSAGES, payload: json })
                    }

                }
            )
    }
}