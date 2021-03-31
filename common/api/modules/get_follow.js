import $http from "../../http.js"

export const get_follow = (data) => {
	return $http({
		url: 'get_follow',
		data
	})
}