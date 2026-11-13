import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

function AuthRestrict({ children }) {
	const { isAuthenticated } = useAuth() 
	const location = useLocation()

	if(isAuthenticated) {
		return <Navigate to="/" state={{ from: location}} replace />
	}

	return children
}

export default AuthRestrict
