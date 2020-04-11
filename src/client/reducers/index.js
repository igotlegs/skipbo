import { combineReducers, } from 'redux'
import * as GameEngine from './GameEngine'
import * as GameSession from './GameSession'

const rootReducer = combineReducers({...GameEngine, ...GameSession})

export default rootReducer