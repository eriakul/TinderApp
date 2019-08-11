import { combineReducers } from 'redux';
import matchLines from './matchLines'
import tinderToken from './tinderToken'
import matchData from './matchData'
import matchMessages from './matchMessages'
import smsMessage from './smsMessage'

const rootReducer = combineReducers({
    matchLines,
    tinderToken,
    matchData,
    matchMessages,
    smsMessage
});

export default rootReducer;