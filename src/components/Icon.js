// react
import React from 'react'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'

export const Icon = ({ icon, color, xs = false, sm = false, lg = false, xl = false, className = '', ...props }) => {
	let size = '1.125rem'

	if (xs) {
		size = '.5rem'
	}

	if (sm) {
		size = '.75rem'
	}

	if (lg) {
		size = '1.5rem'
	}

	if (xl) {
		size = '2rem'
	}

	return (
		<I className={'material-icons '.concat(className)}
		   {...{ color, size }}
		   {...props}
		>
			{icon}
		</I>
	)
}

export default Icon

Icon.propTypes = {
	icon: PropTypes.string,
	color: PropTypes.string,
	title: PropTypes.string,
	lg: PropTypes.bool,
	xl: PropTypes.bool
}

const I = styled.i`
	font-size: ${props => props.size};
	vertical-align: middle;
	color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
	user-select: none;
`