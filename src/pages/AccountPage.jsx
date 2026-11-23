import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Box, Container } from '@mui/material'
import ProfileCard from '../features/user/ProfileCard'

import { AccountBox, Group, Contacts, PersonAddAlt1 } from "@mui/icons-material"

import ProfileContent from "../features/user/ProfileContent"
import FriendList from "../features/friend/FriendList"
import FriendRequest from "../features/friend/FriendRequest"
import FriendAddingList from "../features/friend/FriendAddingList"

function AccountPage() {
	const { user } = useAuth()
	const [currentTab, setCurrentTab] = useState("posts")

	const PROFILE_TABS = [
		{
			value: "posts",
			name: "Bài viết",
			icon: <AccountBox sx={{fontSize: '24px'}}/>,
			component: <ProfileContent profile={user}/>
		},
		{
			value: "friends",
			name: "Bạn bè",
			icon: <Group sx={{fontSize: '24px'}}/>,
			component: <FriendList user={user}/>
		},
		{
			value: "requests",
			name: "Yêu cầu",
			icon: <Contacts sx={{fontSize: '24px'}}/>,
			component: <FriendRequest user={user}/>
		},
		{
			value: "add_friend",
			name: "Kết bạn",
			icon: <PersonAddAlt1 sx={{fontSize: '24px'}}/>,
			component: <FriendAddingList user={user}/>
		},
	]

	const currentDisplay = PROFILE_TABS.find(tab => tab.value === currentTab)

	return (
		<Container>
			<ProfileCard 
				user={ user }
				tabList={PROFILE_TABS}
				currentTab={currentTab}
				onChange={setCurrentTab}
			/>
			{currentDisplay && (<Box key={currentDisplay.value} sx={{ mt: 3 }}>{currentDisplay.component}</Box>)}
		</Container>
	)
}

export default AccountPage
