const state = {
	replyFormData: {}
}

const mutations = {
	SET_REPLY_FORM_DATA(state, data) {
		state.replyFormData = data
	},
	EMPTY_REPLY_FORM_DATA(state) {
		state.replyFormData = {}
	}
}

const actions = {
	set_reply_form_data({
		commit
	}, data) {
		commit('SET_REPLY_FORM_DATA', data)
	},
	empty_reply_form_data({
		commit
	}) {
		commit('EMPTY_REPLY_FORM_DATA')
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
