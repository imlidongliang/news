<script>
	export default {
		onLaunch: function() {
			this.$api.get_user()
				.then(res => {
					const {
						data
					} = res
					this.$store.dispatch('user/set_user_info', data)
				})
				.catch( err => {
					uni.showToast({
						title: err.msg,
						icon: 'none'
					})
				})
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("components/gaoyia-parse/parse.css");
</style>
