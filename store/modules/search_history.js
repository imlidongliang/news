const state = {
	historyList: uni.getStorageSync('__searchHistory') || []
}
const mutations = {
	SET_HISTORY_LIST(state, history) {
		state.historyList = history
	},
	clear_HISTORY_LIST(state) {
		state.historyList = []
	}
}
const actions = {
	set_history({
		commit,
		state
	}, data) {
		let list = state.historyList
		list.unshift(data)
		let unique = {};
		list.forEach(function(item) {
			unique[JSON.stringify(item)] = item; 
		})
		list = Object.keys(unique).map(function(u) {
			return JSON.parse(u);
		})
		uni.setStorageSync('__searchHistory', list)
		commit('SET_HISTORY_LIST', list)
	},
	clear_history({
		commit
	}) {
		uni.removeStorageSync('__searchHistory')
		commit('clear_HISTORY_LIST')
	}
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}
