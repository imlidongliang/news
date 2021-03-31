import $http from "../../http.js"

export const get_label =  (data) => {
	return $http({
		url: 'get_label',
		data
	})
}


export const update_label =  (data) => {
	return $http({
		url: 'update_label',
		data
	})
}