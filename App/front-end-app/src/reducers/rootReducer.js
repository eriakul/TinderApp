import { combineReducers } from 'redux';
import matchLines from './matchLines'
import tinderToken from './tinderToken'
import matchData from './matchData'
import matchMessages from './matchMessages'

const rootReducer = combineReducers({
    matchLines,
    tinderToken,
    matchData,
    matchMessages
});

export default rootReducer;