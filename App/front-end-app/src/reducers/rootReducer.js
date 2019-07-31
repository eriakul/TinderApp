import { combineReducers } from 'redux';
import matchLines from './matchLines'
import tinderToken from './tinderToken'
import matchData from './matchData'

const rootReducer = combineReducers({
    matchLines,
    tinderToken,
    matchData
});

export default rootReducer;