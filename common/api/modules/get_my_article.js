import $http from '../../http.js';

export const get_my_article = (data) => {
	return $http({
		url: 'get_my_article',
		data
	})
}