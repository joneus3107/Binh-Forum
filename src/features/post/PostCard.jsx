import { Card, CardHeader, CardMedia, CardActions, Avatar, IconButton, CardContent, Typography, Dialog, Box, CardActionArea } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { red } from '@mui/material/colors';
import { useState } from 'react';
import useIsOwner from '../../hooks/useIsOwner';
import { fPostDate } from '../../utils/formatTime';

function PostCard({ data }) {
	const [open, setOpen] = useState(false)
	const { content: postContent, createdAt: postCreatedAt, image: postImage, user: author, id: postId } = data
	const isOwner = useIsOwner(author.id)
	
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={author.name} src={author.avatarUrl} />
				}
				action={
					isOwner?
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
					: null
				}
				title={author.name}
				subheader={fPostDate(postCreatedAt)}
			/>
			<CardContent>
				<Typography>{ postContent }</Typography>
			</CardContent>
			{postImage && (
				<>
					<CardActionArea
						onClick={() => setOpen(true)}
					>
						<CardMedia
							component="img"
							image={postImage}
							alt=""
							sx={{
								aspectRatio: "2 / 1"
							}}
						/>
					</CardActionArea>
					<Dialog
						open={open}
						onClose={() => setOpen(false)}
					>
						<Box component="img" src={postImage} alt="" />
					</Dialog>
				</>
			) }
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="add to favorites">
					<CommentIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default PostCard
