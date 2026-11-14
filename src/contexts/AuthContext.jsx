import { createContext, useReducer, useEffect } from 'react'
import apiService from '../app/apiService'
import { isValidToken } from '../utils/jwt'
import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from '../constants/auth'

const initialState = {
	isInitialized: false,
	isAuthenticated: false,
	user: null,
}

const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user
			}
		case REGISTER_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: null
			}
		default:
			return state
	}
}

const AuthContext = createContext({...initialState})

const setSession = (accessToken) => {
	if(accessToken) {
		console.log('save token');
		
		window.localStorage.setItem("accessToken", accessToken)
		apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
	} else {
		window.localStorage.removeItem("accessToken")
		delete apiService.defaults.headers.common.Authorization
	}
}

function AuthProvider({children}) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const login = async ({email, password}, callback) => {
		const response = await apiService.post("/login", {
			email,
			password
		})
		const {user, accessToken} = response.data

		setSession(accessToken)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: {user}
		})

		callback()
	}

	const register = async (register_data, callback) => {
		const response = await apiService.post("/register", register_data)
		const {user, accessToken} = response.data

		setSession(accessToken)
		dispatch({
			type: REGISTER_SUCCESS,
			payload: {user}
		})

		callback()
	}

	return (
		<AuthContext.Provider value={{...state, login, register}}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
