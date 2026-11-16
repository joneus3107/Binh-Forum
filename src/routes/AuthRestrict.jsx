import LoadingScreen from '../components/LoadingScreen'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router'

function AuthRestrict({ children }) {
	const { isInitialized, isAuthenticated } = useAuth() 
	const location = useLocation()

	if(!isInitialized) {
		return <LoadingScreen/>
	}

	if(isAuthenticated) {
		return <Navigate to="/" state={{ from: location}} replace />
	}

	return children
}

export default AuthRestrict
