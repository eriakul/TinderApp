import { SEND_SMS_MESSAGE, SMS_MESSAGE_SENT, SMS_MESSAGE_FAILED } from '../actions/actionTypes';
import RequestStatus from '../static/RequestStatus'

const initialState = {
    requestStatus: RequestStatus.UNINITIALIZED,
    value: null
}

export default function stuff(state = initialState, action) {
    switch (action.type) {
        case SEND_SMS_MESSAGE:
            return {
                ...state,
                value: "",
                requestStatus: RequestStatus.PENDING
            };
        case SMS_MESSAGE_SENT:
            return {
                ...state,
                value: action.payload,
                requestStatus: RequestStatus.SUCCEEDED
            };
        case SMS_MESSAGE_FAILED:
            return {
                ...state,
                requestStatus: RequestStatus.FAILED
            }
        default:
            return state;
    }
}