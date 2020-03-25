import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, } from 'redux' 
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import GameEngine from './reducers/GameEngine'
import App from './components/App'
import './index.css'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? 
	window.__REDUX_DEVTOOLS_EXTENSION__() : 
	compose

const store = createStore(
	GameEngine,
	compose(
		applyMiddleware(thunk),
		reduxDevTools,
	)
)

if(module.hot) {
  module.hot.accept('./reducers/GameEngine', () =>
    store.replaceReducer(require('./reducers/GameEngine').default)
  )
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
)

