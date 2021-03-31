import $http from '../../http.js'

export const get_author = (data) => {
	return $http({
		url: 'get_author',
		data
	})
}