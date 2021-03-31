import $http from "../../http.js"

export const update_author =  (data) => {
	return $http({
		url: 'update_author',
		data
	})
}