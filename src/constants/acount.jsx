import { AccountBox, Group, Contacts, PersonAddAlt1 } from "@mui/icons-material"
import Profile from "../features/user/Profile"
import FriendList from "../features/friend/FriendList"
import FriendRequest from "../features/friend/FriendRequest"
import FriendAddingList from "../features/friend/FriendAddingList"

export const PROFILE_TABS = [
	{
		value: "profile",
		name: "Hồ sơ",
		icon: <AccountBox sx={{fontSize: '24px'}}/>,
		component: <Profile/>
	},
	{
		value: "friends",
		name: "Bạn bè",
		icon: <Group sx={{fontSize: '24px'}}/>,
		component: <FriendList/>
	},
	{
		value: "requests",
		name: "Yêu cầu",
		icon: <Contacts sx={{fontSize: '24px'}}/>,
		component: <FriendRequest/>
	},
	{
		value: "add_friend",
		name: "Kết bạn",
		icon: <PersonAddAlt1 sx={{fontSize: '24px'}}/>,
		component: <FriendAddingList/>
	},
]