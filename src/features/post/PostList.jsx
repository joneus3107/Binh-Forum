import { Stack, Typography, Box } from '@mui/material'
import PostCard from './PostCard'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostList, resetPostsList } from "./postSlice"
import useInfiniteScroll from '../../hooks/useInfiniteScroll'

function PostList({ userId }) {
	const dispatch = useDispatch()
	const { postsById, currentPagePosts, isLoading, page, total } = useSelector(state => state.post)
	const posts = currentPagePosts.map(id => postsById[id])
	const hasMorePost = currentPagePosts.length < total
	
	useEffect(() => {
		if(!userId) return
		
		dispatch(getPostList({ id: userId }))
		
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

	const infiniteScrollRef = useInfiniteScroll(loadMoreHandler, { enable: hasMorePost || !isLoading })
	
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

			<div ref={infiniteScrollRef}></div>
		</Stack>
	)
}

export default PostList