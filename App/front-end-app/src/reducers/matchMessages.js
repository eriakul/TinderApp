import { FETCH_MATCH_MESSAGES, RECEIVED_MATCH_MESSAGES, FAILED_FETCH_MATCH_MESSAGES } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: []
}

export default function stuff(state = initialState, action) {
    switch (action.type) {
        case FETCH_MATCH_MESSAGES:
            return {
                ...state,
                value: [],
                requestStatus: RequestStatus.PENDING
            };
        case RECEIVED_MATCH_MESSAGES:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.SUCCEEDED
            };
        case FAILED_FETCH_MATCH_MESSAGES:
            return {
                ...state,
                requestStatus: RequestStatus.FAILED
            }
        default:
            return state;
    }
}