import { Stack, CircularProgress } from '@mui/material'

function LoadingScreen() {
	return (
		<Stack sx={{
			position: 'fixed',
			top: '0',
			left: '0',
			width: '100svw',
			height: '100svh',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<CircularProgress
				enableTrackSlot
				size="3rem"
				aria-label="Loading…"
			/>
		</Stack>
	)
}

export default LoadingScreen
