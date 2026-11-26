import { useEffect, useRef } from 'react'

function useInfiniteScroll(onReach, { enable = true }) {
	const infiniteScrollRef = useRef(null)

	useEffect(() => {
		const el = infiniteScrollRef.current
		if (!el || !enable) return

		const observer = new IntersectionObserver(([entry]) => {
			if(entry.isIntersecting) onReach()
		})
		observer.observe(el)

		return () => observer.disconnect()
	},[onReach, enable])

	return infiniteScrollRef
}

export default useInfiniteScroll
