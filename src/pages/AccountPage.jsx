import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { PROFILE_TABS } from '../constants/acount'
import { Box, Container } from '@mui/material'
import ProfileCard from '../components/ProfileCard'

function AccountPage() {
	const { user } = useAuth()
	const [currentTab, setCurrentTab] = useState("profile")

	const currentDisplay = PROFILE_TABS.find(tab => tab.value === currentTab)

	return (
		<Container>
			<ProfileCard 
				user={ user }
				tabList={PROFILE_TABS}
				currentTab={currentTab}
				onChange={setCurrentTab}
			/>
			{currentDisplay && (<Box key={currentDisplay.value}>{currentDisplay.component}</Box>)}
		</Container>
	)
}

export default AccountPage
