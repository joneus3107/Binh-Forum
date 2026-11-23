import { createSlice } from "@reduxjs/toolkit"
import apiService from "../../app/apiService"

const initialState = {
	isLoading: false,
	error: null
}

const friendSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {}
})

export default friendSlice.reducer