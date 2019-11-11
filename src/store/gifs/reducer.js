import { createReducer } from '../utils'
import { updateObject } from '../../utils'

// actions
import {
	SET_LOADING,
	SET_TRENDING,
	SET_SEARCHED,
	SET_QUERY
} from './actions'

// utils
import isEmpty from 'lodash/isEmpty'

const initialState = {
	loading: false,
	query: '',
	trending: {
		data: [],
		pagination: {},
		meta: {}
	},
	searched: {
		data: [],
		pagination: {},
		meta: {}
	}
}

const setLoading = (state, { loading }) => {
	return updateObject(state, { loading })
}

const setTrending = (state, { trending }) => {
	let updatedTrending = trending
	if (isEmpty(trending)) {
		updatedTrending = {
			data: [],
			pagination: {},
			meta: {}
		}
	}

	return updateObject(state, { trending: updatedTrending })
}

const setSearched = (state, { searched }) => {
	let updatedSearched = searched
	if (isEmpty(searched)) {
		updatedSearched = {
			data: [],
			pagination: {},
			meta: {}
		}
	}

	return updateObject(state, { searched: updatedSearched })
}

const setQuery = (state, { query }) => {
	return updateObject(state, { query })
}

const gifs_reducer = createReducer(
	initialState,
	{
		[SET_LOADING]: setLoading,
		[SET_TRENDING]: setTrending,
		[SET_SEARCHED]: setSearched,
		[SET_QUERY]: setQuery
	}
)

export default gifs_reducer