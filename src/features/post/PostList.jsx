import { Stack, Typography, Box, Button } from '@mui/material'
import PostCard from './PostCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostList, resetPostsList } from "./postSlice"
import { UI_MORE } from '../../constants/ui'

function PostList({ userId }) {
	const dispatch = useDispatch()
	const { postsById, currentPagePosts, isLoading, page, total } = useSelector(state => state.post)
	const posts = currentPagePosts.map(id => postsById[id])
	const hasMorePost = currentPagePosts.length < total

	useEffect(() => {
		if(!userId) return

		dispatch(getPostList({ id: userId, page: 1 }))

		return () => {
			dispatch(resetPostsList())
		}
	},[userId, dispatch])

	const loadMoreHandler = () => {
		dispatch(getPostList({
				id: userId,
				page: page + 1,
			}))
	}

	if(!posts.length) return (
		<Box>
			<Typography>Không có bài viết nào.</Typography>
		</Box>
	)
	
	return (
		<Stack spacing={3}>
			<Stack spacing={2}>
				{posts.map(post => <PostCard key={post.id} data={post} />)}
			</Stack>

			{ hasMorePost && (
				<Box sx={{
					display: "flex",
					justifyContent: "center"
				}}>
					<Button variant='outlined' onClick={() => loadMoreHandler()} loading={isLoading}>{UI_MORE}</Button>
				</Box>
			) }
		</Stack>
	)
}

export default PostList