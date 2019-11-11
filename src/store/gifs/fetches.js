import { API_KEY } from '../../config'
import { request } from '../../api'

// actions
import {
	setLoading,
	setTrending,
	setSearched
} from './actions'

// constants
import { MAX_PER_PAGE } from '../../config'

const TRENDING = 'trending'
const SEARCH = 'search'

export const getTrending = (offset = 0) => {
	const body = {
		limit: MAX_PER_PAGE,
		rating: 'G',
		offset
	}

	window.reduxStore.dispatch(setTrending())
	return request(TRENDING, body, setTrending, setLoading)
}

export const searchGifs = (query, offset = 0) => {
	const body = {
		limit: MAX_PER_PAGE,
		q: query,
		offset,
		rating: 'G',
		lang: 'en'
	}

	window.reduxStore.dispatch(setSearched())
	return request(SEARCH, body, setSearched, setLoading)
}