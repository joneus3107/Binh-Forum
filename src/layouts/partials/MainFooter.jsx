import { Box, Typography } from '@mui/material'
import React from 'react'

function MainFooter() {
	return (
		<Box component="footer" sx={{
			p: 2
		}}>
			<Typography variant='body2' color='text.secondary' align='center'>
				Copyright © Ryuki Forum { new Date().getFullYear() }.
			</Typography>
		</Box>
	)
}

export default MainFooter
