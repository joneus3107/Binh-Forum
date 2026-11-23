import useAuth from "./useAuth"

const useIsOwner = userId => {
	const { user } = useAuth()
	const ownerId = user?.id

	if (!ownerId) return false

	return String(ownerId) === String (userId)
}

export default useIsOwner