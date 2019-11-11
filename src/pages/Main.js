// react
import React, { Component } from 'react'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'

// fetches
import { getTrending } from '../store/gifs/fetches'

// components
import GIFGrid from '../components/GIFGrid'

class Main extends Component {

	componentDidMount () {
		getTrending()
	}

	render () {
		const { trending } = this.props
		return (
			<GIFGrid title='Trending GIFs'
			         gifs={trending}
			         onPageChange={(newOffset) => {
				         getTrending(newOffset)
			         }}
			/>
		)
	}
}

const mapStateToProps = (state) => ({
	loading: state.gifs.loading,
	trending: state.gifs.trending
})

const mapDispatchToProps = (dispatch) => (
	bindActionCreators({}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

