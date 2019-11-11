export const SET_LOADING = 'SET_LOADING'
export const SET_TRENDING = 'SET_TRENDING'
export const SET_SEARCHED = 'SET_SEARCHED'
export const SET_QUERY = 'SET_QUERY'

export const setLoading = loading => (
	{ type: SET_LOADING, loading }
)

export const setTrending = trending => (
	{ type: SET_TRENDING, trending }
)

export const setSearched = searched => (
	{ type: SET_SEARCHED, searched }
)

export const setQuery = query => (
	{ type: SET_QUERY, query }
)