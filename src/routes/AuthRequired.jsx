import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

function AuthRequired({ children }) {
	const { isAuthenticated } = useAuth() 
	const location = useLocation()

	if(!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location}} replace />
	}

	return children
}

export default AuthRequired
