import $http from '../../http.js';

export const get_user = (data) => {
	return $http({
		url: 'get_user',
		data
	})
}