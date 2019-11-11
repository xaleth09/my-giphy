// react
import React from 'react'

// proptypes
import PropTypes from 'prop-types'

// components
import Button from './Button'
import RotatingIcon from './RotatingIcon'

const LoadingButton = ({
	                       onClick,
	                       primary, loading, disabled,
	                       xs, sm, lg, xl,
	                       children: btnText, style, className
                       }) => {
	return (
		<Button {...{ disabled, primary, style, className }}
		        onClick={!loading && !disabled ? onClick : () => {
		        }}
		>
			{loading ?
				<>
					<span style={{ marginRight: ' 0.5rem' }}>{btnText}</span>
					<RotatingIcon {...{ xs, sm, lg, xl }}/>
				</>
				:
				<span>{btnText}</span>
			}
		</Button>
	)
}

export default LoadingButton

LoadingButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	primary: PropTypes.bool,
	disabled: PropTypes.bool,
	type: PropTypes.string
}
