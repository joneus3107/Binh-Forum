import { Grid, Stack } from '@mui/material'
import InfoCard from './InfoCard'
import SocialCard from './SocialCard'
import PostForm from '../post/PostForm'
import PostList from '../post/PostList'
import useAuth from '../../hooks/useAuth'

function ProfileContent({ profile }) {
	const { user } = useAuth()
	const isOwner = profile.id === user.id

	const infoData = {
		desc: profile.aboutMe,
		city: profile.city,
		country: profile.country,
		company: profile.company,
		jobTitle: profile.jobTitle,
	}
	const socialData = {
		fb: profile.facebookLink,
		ins: profile.instagramLink,
		li: profile.linkedInLink,
		x: profile.xLink,
	}

	return (
		<Grid container spacing={4}>
			<Grid
				size={{xs: 12, sm: 5, md: 4}}
			>
				<Stack spacing={2}>
					<InfoCard data={infoData}/>
					<SocialCard data={socialData} />
				</Stack>
			</Grid>
			<Grid
				size={{xs: 12, sm: 7, md: 8}}
			>
				<Stack spacing={2}>
					{ isOwner && (<PostForm/>) }
					<PostList userId={user.id} />
				</Stack>
			</Grid>
		</Grid>
	)
}

export default ProfileContent
