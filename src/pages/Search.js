// react
import React, { Component } from 'react'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'
import GIFGrid from '../components/GIFGrid'

// fetches
import { searchGifs } from '../store/gifs/fetches'

// actions
import { setQuery } from '../store/gifs/actions'

// components

class Search extends Component {
	render () {
		const { query, searched } = this.props

		return (
			<>
				<H2>{query}</H2>
				<GIFGrid gifs={searched}
				         onPageChange={(newOffset) => {
					         searchGifs(query, newOffset)
				         }}
				/>
			</>
		)
	}
}

const mapStateToProps = (state) => ({
	searched: state.gifs.searched,
	query: state.gifs.query
})

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({
		setQuery
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

const H2 = styled.h2`
	margin: 0;	
`