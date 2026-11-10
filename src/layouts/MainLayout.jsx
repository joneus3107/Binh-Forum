import React from 'react'
import MainHeader from './partials/MainHeader'
import MainFooter from './partials/MainFooter'
import {Box, Stack} from '@mui/material'
import { Outlet } from 'react-router'

function MainLayout() {
	return (
		<Stack sx={{minHeight: '100vh'}}>
			<MainHeader/>
			<Outlet/>
			<Box sx={{flexGrow: '1'}}></Box>
			<MainFooter/>
		</Stack>
	)
}

export default MainLayout
