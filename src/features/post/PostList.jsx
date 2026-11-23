import { Stack, Typography, Box } from '@mui/material'
import PostCard from './PostCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostList, resetPostsList } from "./postSlice"

function PostList({ userId }) {
	const dispatch = useDispatch()
	const { posts, page } = useSelector(state => state.post)

	useEffect(() => {
		const getPostsData = () => {
			const dispatchData = {
				id: userId,
				page,
			}
			
			dispatch(getPostList(dispatchData))
		}

		getPostsData()

		return () => {
			dispatch(resetPostsList())
		}
	},[userId])

	if(!posts.length) return (
		<Box>
			<Typography>Không có bài viết nào.</Typography>
		</Box>
	)
	
	return (
		<Stack spacing={2}>
			{posts.map(post => <PostCard key={post.id} data={post} />)}
		</Stack>
	)
}

export default PostList