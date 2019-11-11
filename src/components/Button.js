// react
import React from 'react'

// proptypes
import PropTypes from 'prop-types'

// styled
import styled from 'styled-components'

const Button = ({
	                onClick,
	                primary = false,
	                disabled = false,
	                bgColor, color, hovColor,
	                tabIndex,
	                children: btnText, style, className
                }) => {

	let borderColor = 'secondaryButtonBorder'

	if (primary) {
		bgColor = 'primaryButton'
		color = 'light'
		hovColor = 'primaryButtonReverse'
		borderColor = 'primaryButtonBorder'
	}

	if (disabled) {
		bgColor = 'disabledButton'
		color = 'disabledButtonText'
		hovColor = 'disabledButton'
		borderColor = 'disabledButtonBorder'
	}

	if ((!primary || !disabled) && !bgColor) {
		bgColor = 'secondaryButton'
	}

	if ((!primary || !disabled) && !color) {
		color = 'mostText'
	}

	if (!primary && !disabled && !hovColor) {
		hovColor = 'secondaryButtonReverse'
	}

	return (
		<Btn type='button'
		     {...{
			     bgColor, color, hovColor, borderColor,
			     tabIndex, disabled, style, className
		     }}
		     onClick={() => {
			     !disabled && onClick()
		     }}
		>
			{btnText}
		</Btn>
	)
}

export default Button

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	primary: PropTypes.bool,
	disabled: PropTypes.bool,
	bgColor: PropTypes.string,
	color: PropTypes.string,
	hovColor: PropTypes.string,
	tabIndex: PropTypes.string
}

const Btn = styled.button`
	display: flex;
	align-items: center;
	min-height: 2rem;
	box-sizing: border-box;
	padding: 0.5rem 1rem;
	border: 1px solid ${props => props.theme.colors[props.borderColor]};
	border-radius: ${props => props.theme.sizes.borderRadius};
	outline: none;
	font-size: 1rem;
	letter-spacing: 0.005em;
	white-space: nowrap;
	color: ${props => props.theme.colors[props.color]};
	background: ${props => props.theme.colors[props.bgColor]};
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	
	:hover {
		background: ${props => props.theme.colors[props.hovColor]};
	}
`