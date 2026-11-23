import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import friendReducer from "../features/friend/friendSlice"
import postReducer from "../features/post/postSlice"

const rootReducers = {
	user: userReducer,
	friend: friendReducer,
	post: postReducer
}

const store = configureStore({
	reducer: rootReducers
})

export default store