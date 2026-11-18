import React from 'react'
import { Card, Tabs, Tab, Box, styled, Stack, Avatar, Typography, useMediaQuery, useTheme } from '@mui/material'
import PCoverImage from './PCoverImage'

const ProfileCover = styled(Box)(({theme}) => ({
	width: '100%',
	position: 'relative'
}))

const DisplayName = styled(Typography)(({theme}) => ({
	fontSize: "24px",
	fontWeight: "700",
	color: theme.palette.text.primary,
	[theme.breakpoints.up('md')]: {
		fontSize: "32px"
	}
}))

const DisplayFriend = styled(Typography)(({theme}) => ({
	fontSize: "15px",
	fontWeight: "600",
	color: theme.palette.text.secondary,
}))

function ProfileCard({user, tabList, currentTab, onChange}) {
	const { coverUrl, name, avatarUrl, email } = user
	const theme = useTheme()
	const showTabLabel = useMediaQuery(theme.breakpoints.up('sm'))

	return (
		<Card>
				<ProfileCover>
					<PCoverImage coverUrl={coverUrl}/>
					<Stack
						sx={{
							position: "relative",
							textAlign: {xs: "center", md: "left"},
							alignItems: "center",
							marginTop: {xs: "-40px", md: "-20px", lg: "-35px"},
							paddingInline: {xs: 2, md: 4},
						}}
						direction={{xs: 'column', md: 'row'}}
						spacing={{md: 2}}
					>
						<Avatar 
							alt={name}
							src={avatarUrl}
							sx={{
								width: {xs: "80px", md: "100px", lg: "165px"},
								height: {xs: "80px", md: "100px", lg: "165px"},
								mb: 1
							}}
						/>
						<Box>
							<DisplayName noWrap>{name}</DisplayName>
							<DisplayFriend noWrap>0 Bạn bè</DisplayFriend>
						</Box>
					</Stack>
				</ProfileCover>
				<Tabs
					sx={{
						mt: 2,
					}}
					slotProps={{
						list: {
							sx: { justifyContent: { xs: "center", md: "flex-end" } },
						},
					}}
					value={currentTab}
					onChange={(e, value) => onChange(value)}
				>
					{tabList.map(tab => (
						<Tab 
							key={tab.value}
							value={tab.value}
							icon={tab.icon}
							label={showTabLabel? tab.name : null}
						/>
					))}
				</Tabs>
			</Card>
	)
}

export default ProfileCard
