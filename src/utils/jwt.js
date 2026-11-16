import {jwtDecode} from "jwt-decode"

export const isValidToken = (accessToken) => {
	if (!accessToken) {
		return false
	}
	const {sub, exp} = jwtDecode(accessToken)
	const currentTime = Date.now() / 1000

	return {sub, exp: exp > currentTime}
}