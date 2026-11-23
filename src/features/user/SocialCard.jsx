import { Facebook, Instagram, LinkedIn, X } from '@mui/icons-material'
import { Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

const SOCIAL_ITEMS = [
	{ key: "fb", icon: Facebook },
	{ key: "ins", icon: Instagram },
	{ key: "li", icon: LinkedIn },
	{ key: "x", icon: X },
]

function SocialCard({ data }) {
	const filtedData = SOCIAL_ITEMS.filter(({key}) => data[key])
	
	if(!filtedData.length) return

	return (
		<Card>
			<CardContent>
				<Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
					Mạng xã hội
				</Typography>

				<List dense disablePadding>
					{filtedData.map(({key, icon: Icon}) => (
						<ListItem key={key} disableGutters>
							<ListItemButton
								component="a"
								href={data[key]}
								target="_blank"
								rel="noopener noreferrer"
								disableGutters
							>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<Icon/>
								</ListItemIcon>
								<ListItemText
									primary={data[key]}
									slotProps={{ primary: { noWrap: true } }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	)
}

export default SocialCard
