import $http from '../../http.js';

export const update_feedback = (data) => {
	return $http({
		url: 'update_feedback',
		data
	})
}