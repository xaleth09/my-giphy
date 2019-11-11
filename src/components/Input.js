// react
import React from 'react'

// styled
import styled from 'styled-components'

const Input = ({ value, defaultValue, disabled, onChange, onKeyDown, placeholder, type, style, className }) => {
	return (
		<StyledInput {...{ value, defaultValue, disabled, onChange, onKeyDown, placeholder, type, style, className }}/>
	)
}

export default Input

const StyledInput = styled.input`
	box-sizing: border-box;
	width: 100%;
	padding: .75rem 2rem .75rem .75rem;
	line-height: 24px;
	font-size: 1rem;
	background: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.midLight};
	caret-color: ${props => props.theme.colors.primary};
	
	:disabled {
		background: ${props => props.theme.colors.window};
		border-color: ${props => props.theme.colors.mid};
		
		::placeholder {
			color: ${props => props.theme.colors.muted};
		}
		
		:hover {
			cursor: not-allowed;
		}
	}
	
	:focus{
		outline: none;
		border-color: ${props => props.theme.colors.highlight};
	}
`