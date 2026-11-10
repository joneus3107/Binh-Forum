import { Link as RouterLink } from 'react-router'
import LogoImage from '../logo.webp'
import { Box } from '@mui/material'

function Logo({disabled = false, sx}) {
	const logoImage = (
		<Box sx={{
			width: '40px',
			...sx
		}}>
			<img src={LogoImage} alt="Ryuki Forum" />
		</Box>
	)

	if(disabled) {
		return (
			<>{logoImage}</>
		)
	}

	return (
		<Box component={RouterLink} to="/" sx={{
			transition: 'opacity .3s ease-in-out',
			'&:hover': {
				opacity: '.6'
			}
		}}>
			{logoImage}
		</Box>
	)
}

export default Logo
