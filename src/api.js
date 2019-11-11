import { API_KEY, ENDPOINT } from './config'

export const request = (route, body, setData, setLoading) => {

	const dispatch = window.reduxStore.dispatch

	const query = Object.entries(body).reduce((string, [key, val]) => {
		return string.concat(`&${key}=${val}`)
	}, '')

	const url = `${ENDPOINT}${route}?${API_KEY}${query}`
	dispatch(setLoading(true))
	return fetch(url)
		.then((response) => {
			return Promise.all([response.status, response.json()])
		})
		.then(([status, body]) => {
			dispatch(setData(body))
			dispatch(setLoading(false))
		})
		.catch((error) => {
			dispatch(setLoading(false))
		})
}