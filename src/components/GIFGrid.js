// react
import React, { Component } from 'react'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'

// components
import Row from './Row'
import Icon from './Icon'
import IconButton from './IconButton'

// utils
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

// constants
import { MAX_PER_PAGE, PATH } from '../config'

const GIF_SIZES = {
	PLAYING: [
		'preview_gif',
		'fixed_width',
		'fixed_width_small',
		'original',
		'downsized',
		'downsized_large',
		'downsized_medium',
		'downsized_small'
	],
	PAUSED: [
		'original_still',
		'fixed_width_still',
		'fixed_width_small_still',
		'downsized_still'
	]
}

class GIFGrid extends Component {

	state = {
		isPlaying: true,
		pageInput: ''
	}

	componentDidUpdate (prevProps, prevState) {
		const { gifs } = this.props
		const data = get(gifs, 'data', [])
		const curOffset = get(gifs, ['pagination', 'offset'], 0)
		const prevOffset = get(prevProps, ['gifs', 'pagination', 'offset'])

		if (!isEmpty(data) && !isEqual(prevOffset, curOffset)) {
			let page = curOffset / MAX_PER_PAGE + 1
			this.setState({ pageInput: page })
		}
	}

	onEnterPress = (e) => {
		const { pageInput } = this.state
		const { onPageChange } = this.props

		if (e.keyCode === 13 && !isEmpty(pageInput)) {
			let newOffset = (parseInt(pageInput) - 1) * MAX_PER_PAGE
			onPageChange(newOffset)
		}
	}

	renderGifs = () => {
		const { isPlaying } = this.state
		const { gifs: { data } } = this.props
		return data.map(({ id, images }, i) => {
			let sizes = isPlaying ? GIF_SIZES.PLAYING : GIF_SIZES.PAUSED
			let url = ''
			for (let size of sizes) {
				url = get(images, [size, 'url'])
				if (url) {
					break
				}
			}

			return <Gif key={`${id}_${i}`} src={url}/>
		})
	}

	render () {
		const { isPlaying, pageInput } = this.state
		const { title, gifs, onPageChange } = this.props

		const data = get(gifs, ['data'], [])
		const offset = get(gifs, ['pagination', 'offset'], 0)
		const totalCount = get(gifs, ['pagination', 'total_count'], 0)
		const pageCount = Math.ceil(totalCount / MAX_PER_PAGE)

		return (
			<>
				<SubHeader spaceBetween centerVertically>
					<H3>{title}</H3>
					<Row centered>
						<Span>Auto Play</Span>
						<PlayPauseBar centered onClick={() => {
							this.setState({ isPlaying: !isPlaying })
						}}>
							<PlayingIndicator {...{ isPlaying }}/>
							<PlayPauseBarButton icon='play_arrow'/>
							<PlayPauseBarButton icon='pause'/>
						</PlayPauseBar>
					</Row>
				</SubHeader>
				<Content>
					{this.renderGifs()}
				</Content>
				<BottomRow right>
					<Row centered>
						<IconButton xl icon='arrow_left'
						            disabled={offset === 0}
						            onClick={() => {
							            onPageChange(offset - MAX_PER_PAGE)
						            }}
						/>
						<PageNum value={data.length === 0 ? 0 : pageInput}
						         onChange={(e) => {
							         let input = e.target.value
							         if (isEmpty(input) || (input.match(new RegExp('^(\\(?\\+?[0-9]*\\)?)?[0-9]*$')) && parseInt(input) <= pageCount)) {
								         this.setState({ pageInput: input })
							         }
						         }}
						         onKeyDown={this.onEnterPress}
						/>
						<PageInfo style={{ marginLeft: '.5rem', marginRight: '.5rem', fontSize: '1.5rem' }}>/</PageInfo>
						<PageInfo>{pageCount}</PageInfo>
						<IconButton xl icon='arrow_right'
						            disabled={offset * MAX_PER_PAGE >= totalCount}
						            onClick={() => {
							            onPageChange(offset + MAX_PER_PAGE)
						            }}
						/>
					</Row>
				</BottomRow>
			</>
		)
	}
}

export default GIFGrid

GIFGrid.propTypes = {
	gifs: PropTypes.object.isRequired,
	onPageChange: PropTypes.func.isRequired,
	title: PropTypes.string
}

const Content = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-column-gap: 1.25rem;
	grid-row-gap: 1rem;
	
	@media (max-width : 768px) {
		grid-template-columns: repeat(1, 1fr);
	}
	
	@media (min-width : 768px) {
		grid-template-columns: repeat(2, 1fr);
	}
	
	@media (min-width : 1080px) {
		grid-template-columns: repeat(3, 1fr);
	}
	
	@media (min-width : 1440px) {
		grid-template-columns: repeat(4, 1fr);
	}
	
	@media only screen  and (min-width : 1824px) {
			grid-template-columns: repeat(5, 1fr);
	}
`

const SubHeader = styled(Row)`
	width: 100%;
	margin-bottom: 1rem;
`

const H3 = styled.h3`
	margin: 0;
	color: ${props => props.theme.colors.muted}
`

const Span = styled.span`
	margin-right: .75rem;
	color: ${props => props.theme.colors.muted};
`

const PlayPauseBar = styled(Row)`
	position: relative;
	cursor: pointer;
	background-color: ${props => props.theme.colors.darker};
`

const PlayPauseBarButton = styled(Icon)`
	z-index: 2;
	padding: .25rem .325rem;
`

const PlayingIndicator = styled.span`
	position: absolute;
	z-index: 1;
	left: ${props => props.isPlaying ? '0' : '50%'};
	height:100%;
	width: 1.7rem;
	background-color: ${props => props.isPlaying ? props.theme.colors.success : props.theme.colors.warning};
	
	transition: all .5s;
`

const Gif = styled.img`
	width: 100%;
	height: 12rem;
`
const BottomRow = styled(Row)`
	width: 100%;
	margin-top: 1rem;
	margin-bottom: 1rem;
`

const PageNum = styled.input`
	box-sizing: border-box;
	height: 2rem;
	width: 2rem;
	font-size: 1rem;
	text-align: center;
	padding: 0.5rem;
	border: 1px solid ${props => props.theme.colors.midLight};
	
	:focus{
		outline: none;
		border-color: ${props => props.theme.colors.buttonIcon};		
	}
`

const PageInfo = styled.span`
	margin-left: .5rem;
	margin-right: .5rem;
	font-size: 1.5rem;	
`