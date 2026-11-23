import { alpha, Box, styled } from "@mui/material"

const PCoverImageStyled = styled(Box)(({theme}) => ({
	position: "relative",
	width: "100%",
	aspectRatio: "3 / 1",
	[theme.breakpoints.up('md')]: {
		aspectRatio: "4 / 1"
	},
	'&::before': {
		content: "''",
		position: "absolute",
		width: "100%",
		height: "100%",
		top: "0",
		left: "0",
		backgroundColor: alpha("#000", .25),
		[theme.breakpoints.up('md')]: {
			backgroundColor: "transparent"
		}
	}
}))

function PCoverImage({coverUrl}) {
	return (
		<PCoverImageStyled>
			<Box
				component="img"
				src={coverUrl || 'https://lh6.googleusercontent.com/proxy/a7oNL8xBoZhTbDQ_7MvFTlTz0wLWfLdI6qFNb-ruCgDNZHOWTT1YhQj20sGs26foMJeFwT87_6FdGyMRl3Qf7-Ciyq16GMAC8MHnzw=w3840-h2160-p-k-no-nd-mv'}
				alt="Profile cover"
				loading="lazy"
				sx={{
					width: '100%',
					height: '100%',
					objectFit: 'cover'
				}}
			/>
		</PCoverImageStyled>
	)
}

export default PCoverImage
