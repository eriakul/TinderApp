import * as ActionTypes from './actionTypes';
import * as ApiFunctions from '../api/ApiFunctions'

export function receivePUL(json) {
    return { type: ActionTypes.RECEIVED_MATCHES, lines: json["lines"] }
}

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