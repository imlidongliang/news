import $http from '../../http.js';
	export const get_detail = (data) => {
		return $http({
			url: 'get_detail',
			data
		})
	}
