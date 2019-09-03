import { FETCH_TOKEN, RECEIVED_TOKEN, FAILED_FETCH_TOKEN } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: ""
}

export default function stuff(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                value: "",
                requestStatus: RequestStatus.PENDING
            };
        case RECEIVED_TOKEN:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.SUCCEEDED
            };
        case FAILED_FETCH_TOKEN:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.FAILED
            }
        default:
            return state;
    }
}