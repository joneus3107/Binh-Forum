import { createContext, useReducer, useEffect } from 'react'
import apiService from '../app/apiService'
import { isValidToken } from '../utils/jwt'

const initialState = {
	isInitialized: false,
	isAuthenticated: false,
	user: null,
}

const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS"

const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user
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
		// const response = await apiService.post("/auth/login", {
		// 	email,
		// 	password
		// })
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

	return (
		<AuthContext.Provider value={{...state, login}}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
