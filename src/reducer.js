import { combineReducers } from 'redux'

// reducers
import gifsReducer from './store/gifs/reducer'

const appReducer = combineReducers({
	gifs: gifsReducer
})

export default appReducer