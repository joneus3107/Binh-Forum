import { Stack, Typography, Box } from '@mui/material'
import PostCard from './PostCard'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostList, resetPostsList } from "./postSlice"

function PostList({ userId }) {
	const [page, setPage] = useState(1)
	const dispatch = useDispatch()
	const { posts } = useSelector(state => state.post)

	useEffect(() => {
		const getPostsData = () => {
			if(!userId) return
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
	},[page, userId, dispatch])

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