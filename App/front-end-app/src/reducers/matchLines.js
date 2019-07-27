import { FETCH_MATCH_LINES, RECEIVED_MATCH_LINES, FAILED_FETCH_MATCH_LINES } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: []
}

export default function stuff(state = initialState, action) {
    switch (action.type) {
        case FETCH_MATCH_LINES:
            return {
                ...state,
                value: [],
                requestStatus: RequestStatus.PENDING
            };
        case RECEIVED_MATCH_LINES:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.SUCCEEDED
            };
        case FAILED_FETCH_MATCH_LINES:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.FAILED
            }
        default:
            return state;
    }
}