	import $http from '../../http.js';
export  const get_search = (data)=> {
	return $http({
		url: 'get_search',
		data
	})
}