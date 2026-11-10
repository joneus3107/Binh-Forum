import { Stack } from '@mui/material'
import { Outlet } from 'react-router'
import Logo from '../components/Logo'

function BlankLayout() {
	return (
		<Stack sx={{
			minHeight: '100vh',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<Logo sx={{width: '120px'}} />
			<Outlet/>
		</Stack>
	)
}

export default BlankLayout
