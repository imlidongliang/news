const state = {
	userInfo: uni.getStorageSync('userInfo') || {}
}

const mutations = {
	SET_USER_INFO (state, userInfo) {
		state.userInfo = userInfo
	}
}

const actions = {
	set_user_info ({ commit }, userInfo) {
		uni.setStorageSync('userInfo', userInfo)
		commit('SET_USER_INFO', userInfo)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}