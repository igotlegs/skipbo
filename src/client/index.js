import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, } from 'redux' 
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import reducers from './reducers'
import App from './containers/AppContainer'
import theme from './theme'

import './reset.css'
import './index.css'

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? 
  window.__REDUX_DEVTOOLS_EXTENSION__() : 
  compose

const store = createStore(
  reducers,
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
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>, 
  document.getElementById('root')
)

