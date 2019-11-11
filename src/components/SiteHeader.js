// react
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'

// fetches
import { getTrending, searchGifs } from '../store/gifs/fetches'

// actions
import { setQuery, setSearched, setTrending } from '../store/gifs/actions'

// components
import Row from './Row'
import Col from './Col'
import Input from './Input'
import { Link } from 'react-router-dom'

// utils
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

// constants
import { PATH } from '../config'

class SiteHeader extends Component {

	state = {
		searchQuery: ''
	}

	constructor (props) {
		super(props)
		const { query, location: { pathname } } = this.props

		let newQuery = query
		let splitUrl = pathname.split('/')
		if (splitUrl.length === 3) {
			newQuery = splitUrl[2]
		}
		this.state = { searchQuery: newQuery }
	}

	componentDidMount () {
		const { searchQuery } = this.state
		if (!isEmpty(searchQuery)) {
			searchGifs(searchQuery)
		}
	}

	componentDidUpdate (prevProps, prevState) {
		const { query } = this.props

		if (!isEqual(prevProps.query, query)) {
			this.setState({ searchQuery: query })
		}
	}

	onEnterPress = (e) => {
		const { searchQuery } = this.state
		const { setQuery, history } = this.props
		if (e.keyCode === 13) {
			setQuery(searchQuery)
			if (!isEmpty(searchQuery)) {
				searchGifs(searchQuery)
				history.push(`${PATH.SEARCH}/${searchQuery}`)
			} else {
				history.push(PATH.ROOT)
			}
		}
	}

	render () {
		const { searchQuery } = this.state
		const { setTrending, setSearched, setQuery, children } = this.props

		return (
			<Page>
				<Header>
					<HeaderLink to={PATH.ROOT}
					            onClick={() => {
						            setQuery('')
						            getTrending()
					            }}
					>
						GIPHY
					</HeaderLink>
					<Input style={{ marginTop: '1rem' }}
					       value={searchQuery}
					       onChange={e => {
						       this.setState({ searchQuery: e.target.value })
					       }}
					       onKeyDown={this.onEnterPress}
					/>
				</Header>
				<Content>
					{children}
				</Content>
			</Page>
		)
	}
}

const mapStateToProps = (state) => ({
	loading: state.gifs.loading,
	query: state.gifs.query
})

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		setQuery,
		setTrending,
		setSearched
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SiteHeader))

const Page = styled.div`
	padding-left: 15%;
	padding-right: 15%;
	background-color: black;
	flex-grow: 1;
`

const Header = styled.div`
	padding-top: 1.5rem;
	padding-bottom: 2rem;
`

const HeaderLink = styled(Link)`
	font-size: 3.5rem;
	color: white;
	text-decoration: none;
`

const Content = styled(Col)`
`