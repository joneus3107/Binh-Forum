import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { uploadImage } from "../../utils/cloundinary"

const initialState = {
	isLoading: false,
	error: null,
	posts: [],
	start: 1,
	total: 0,
}

export const createPost = createAsyncThunk("post/createPost", 
	async({user, content, image, createdAt}, { rejectWithValue }) => {
		try {
			const imageUrl = image ? await uploadImage(image) : null

			const response = await apiService.post("/posts", {
				userId: user.id,
				content,
				image: imageUrl,
				createdAt
			})

			return {...response.data, user}
		} catch (error) {
			const data = error.response?.data
			const message =
				data?.error?.message ||  // lỗi từ Cloudinary
				(typeof data === "string" ? data : null) || // lỗi từ json-server-auth
				error.message

			return rejectWithValue(message)
		}
	}
)

export const getPostList = createAsyncThunk("post/getPostList",
	async ({ id, start, limit = 2, profileOnly = true }, { rejectWithValue }) => {
		try {
			if(!profileOnly) throw new Error('Chức năng đang xây dựng')

			const params = {
				userId: id,
				_start: start,
				_limit: limit,
				_sort: "createdAt",
				_order: "desc",
				_expand: "user",
			}

			const response = await apiService.get("/posts", { params })

			return {
				posts: response.data,
				total: Number(response.headers["x-total-count"]),
				start,
			}
		} catch (error) {
			const data = error.response?.data
			const message = (typeof data === "string" ? data : null) || error.message
			return rejectWithValue(message)
		}
	}
)

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		resetPostsList(state) {
			state.error = null
			state.posts= []
			state.start= 0
			state.total= 0
		}
	},
	extraReducers: (builder) => {
		builder
			// Create Post
			.addCase(createPost.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.isLoading = false
				state.error = null
				state.posts = [action.payload, ...state.posts]
				state.total += 1
				state.start += 1
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload ?? action.error.message
			})
			// Get Posts List
			.addCase(getPostList.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(getPostList.fulfilled, (state, action) => {
				const { posts, total, start } = action.payload
				state.isLoading = false
				state.error = null
				state.total = total
				state.start = start

				if (start === 0) {
					state.posts = posts
				} else {
					const ids = new Set(state.posts.map((p) => p.id))
					state.posts.push(...posts.filter((p) => !ids.has(p.id)))
				}
			})
			.addCase(getPostList.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload ?? action.error.message
			})
	}
})

export const { resetPostsList } = postSlice.actions
export default postSlice.reducer