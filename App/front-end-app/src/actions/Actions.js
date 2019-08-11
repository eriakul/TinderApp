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

export function sendSmsText(number) {
    return dispatch => {
        dispatch({ type: ActionTypes.SEND_SMS_MESSAGE })
        ApiFunctions.sendSmsMessage(number).then(response => {
            return response.json()
        })
            .then(
                json => {
                    try {
                        dispatch({ type: ActionTypes.SMS_MESSAGE_SENT, payload: json })
                    }
                    catch {
                        dispatch({ type: ActionTypes.SMS_MESSAGE_FAILED })
                    }

                }
            )
    }
}

export function getToken({ number, code, req_code }) {
    return dispatch => {
        dispatch({ type: ActionTypes.FETCH_TOKEN })
        ApiFunctions.fetchAuthToken(number, code, req_code).then(response => {
            return response.json()
        })
            .then(
                json => {
                    try {
                        dispatch({ type: ActionTypes.RECEIVED_TOKEN, payload: json })

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