// react
import React from 'react'
import ReactDOM from 'react-dom'
// redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'

// components
import App from './App.js'

const store = createStore(reducer, DEVTOOLS)
window.reduxStore = store

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('main')
)

// if (module.hot) {
// 	module.hot.accept('./App', () => {
// 		const NextApp = require('./App').default
// 		ReactDOM.render(
// 			<Provider store={store}>
// 				<App/>
// 			</Provider>,
// 			document.getElementById('main')
// 		)
// 	})
// 	console.log('HOT RELOADING')
// }