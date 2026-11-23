import {
	Card, CardContent, Typography,
	List, ListItem, ListItemIcon, ListItemText,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import PublicIcon from "@mui/icons-material/Public"
import BusinessIcon from "@mui/icons-material/Business"
import WorkIcon from "@mui/icons-material/Work"

const INFO_ITEMS = [
	{ key: "city", icon: LocationOnIcon, format: (v) => `Sống tại ${v}` },
	{ key: "country", icon: PublicIcon, format: (v) => `Đến từ ${v}` },
	{ key: "company", icon: BusinessIcon, format: (v) => `Làm việc tại ${v}` },
	{ key: "jobTitle", icon: WorkIcon, format: (v) => v },
]

function InfoCard({ data }) {
	const { desc, ...details } = data

	return (
		<Card>
			<CardContent>
				<Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
					Giới thiệu
				</Typography>

				{desc && <Typography variant="body1">{desc}</Typography>}

				<List dense disablePadding sx={{ mt: 1 }}>
					{INFO_ITEMS.filter(({ key }) => details[key]).map(
						({ key, icon: Icon, format }) => (
							<ListItem key={key} disableGutters>
								<ListItemIcon sx={{ minWidth: 36 }}>
									<Icon fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={format(details[key])} />
							</ListItem>
						)
					)}
				</List>
			</CardContent>
		</Card>
	)
}

export default InfoCard