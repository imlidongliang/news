import $http from '../../http.js'

export const update_comment = (data) => {
	return $http({
		url: 'update_comment',
		data
	})
}

export const get_comment = (data) => {
	return $http({
		url: 'get_comment',
		data
	})
}