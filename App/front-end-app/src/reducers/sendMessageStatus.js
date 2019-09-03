import { SEND_MESSAGE, MESSAGE_SENT, MESSAGE_FAILED, REFRESH_SEND_MESSAGE } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: null
}

export default function sendMessageStatus(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                value: null,
                requestStatus: RequestStatus.PENDING
            };
        case MESSAGE_SENT:
            return {
                ...state,
                value: action.payload,
                message: action.message, 
                requestStatus: RequestStatus.SUCCEEDED
            };
        case MESSAGE_FAILED:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.FAILED
            }
        case REFRESH_SEND_MESSAGE:
                return initialState;
        default:
            return state;
    }
}