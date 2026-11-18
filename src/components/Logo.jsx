import { Link as RouterLink } from 'react-router'
import LogoImage from '../logo.webp'
import { Box } from '@mui/material'

function Logo({disabled = false, sx}) {
	const logoImage = (
		<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '40px',
			...sx
		}}>
			<Box component="img" src={LogoImage} alt="Ryuki Forum" sx={{
				objectFit: 'contain',
				maxWidth: '100%',
				maxHeight: '100%'
			}}/>
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
