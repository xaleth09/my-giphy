// react
import React from 'react'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled, { keyframes } from 'styled-components'

// components
import Icon from './Icon'

const RotatingIcon = ({ icon = 'autorenew', xs, sm, lg, xl, className }) => {

	return (
		<RotatingIcn {...{ xs, sm, lg, xl, icon, className }}/>
	)
}

export default RotatingIcon

const rotation = keyframes`
	0% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
`

const RotatingIcn = styled(Icon)`
	animation: ${rotation} 2s infinite linear;
`