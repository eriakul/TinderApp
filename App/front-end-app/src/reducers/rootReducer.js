import { combineReducers } from 'redux';
import matchLines from './matchLines'
import tinderToken from './tinderToken'
import matchData from './matchData'
import matchMessages from './matchMessages'
import smsMessage from './smsMessage'
import addLineStatus from './addLineStatus'
import sendMessageStatus from './sendMessageStatus'

const rootReducer = combineReducers({
    matchLines,
    tinderToken,
    matchData,
    matchMessages,
    smsMessage,
    addLineStatus,
    sendMessageStatus,
});

export default rootReducer;