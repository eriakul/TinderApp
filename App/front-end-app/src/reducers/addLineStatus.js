import { ADD_LINE, ADD_LINE_FAILED, ADD_LINE_SUCCEEDED } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: null,
}

export default function addLineStatus(state = initialState, action) {
    switch (action.type) {
        case ADD_LINE:
            return {
                ...state,
                value: null,
                requestStatus: RequestStatus.PENDING
            };
        case ADD_LINE_SUCCEEDED:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.SUCCEEDED
            };
        case ADD_LINE_FAILED:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.FAILED
            }
        default:
            return state;
    }
}