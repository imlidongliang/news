import $http from "../../http.js"

export const update_thumbsup =  (data) => {
	return $http({
		url: 'update_thumbsup',
		data
	})
}