// react
import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

// styled
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'theme'

// constants
import { PATH } from './config'

//pages
import Main from './pages/Main'
import Search from './pages/Search'

// components
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'

class App extends Component {

	render () {
		return (
			<ThemeProvider {...{ theme }}>
				<Router>
					<Switch>
						<Route exact={true} path={PATH.ROOT} component={(props) => (
							<SiteHeader {...{ props }}>
								<Main {...{ props }}/>
							</SiteHeader>
						)}/>
						<Route path={`${PATH.SEARCH}/:query`} component={(props) => (
							<SiteHeader {...{ props }}>
								<Search {...{ props }}/>
							</SiteHeader>
						)}/>
					</Switch>
				</Router>
			</ThemeProvider>
		)
	}
}

export default hot(module)(App)
