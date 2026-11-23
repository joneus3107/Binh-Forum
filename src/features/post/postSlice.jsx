import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"
import { uploadImage } from "../../utils/cloundinary"

const initialState = {
	isLoading: false,
	error: null,
	posts: [],
	page: 1,
	total: 0,
}

export const createPost = createAsyncThunk("post/createPost", 
	async({userId, content, image, createdAt}, { rejectWithValue }) => {
		try {
			const imageUrl = image ? await uploadImage(image) : null

			const response = await apiService.post("/posts", {
				userId,
				content,
				image: imageUrl,
				createdAt
			})

			return response.data
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
	async ({ id, page, limit = 2, profileOnly = true }, { rejectWithValue }) => {
		try {
			if(!profileOnly) throw new Error('Chức năng đang xây dựng')

			const params = {
				userId: id,
				_page: page,
				_limit: limit,
				_sort: "createdAt",
				_order: "desc",
				_expand: "user",
			}

			const response = await apiService.get("/posts", { params })

			return {
				posts: response.data,
				total: Number(response.headers["x-total-count"]),
				page,
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
			state.page= 0
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
			.addCase(createPost.fulfilled, state => {
				state.isLoading = false
				state.error = null
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
				const { posts, total, page } = action.payload
				state.isLoading = false
				state.error = null
				state.total = total
				state.page = page
				state.posts = page === 1 ? posts : [...state.posts, ...posts]
			})
			.addCase(getPostList.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload ?? action.error.message
			})
	}
})

export const { resetPostsList } = postSlice.actions
export default postSlice.reducer