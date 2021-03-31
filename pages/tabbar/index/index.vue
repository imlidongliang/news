<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab="tab" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list @change="change" :tabList="tabList" :activeIndex="activeIndex"></list>
		</view>
	</view>

</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				tabList: [],
				tabIndex: 0,
				activeIndex: 0
			}
		},
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo
			})
		},
		watch: {
			userInfo () {
				this.getLabel();
			}
		},
		onLoad() {
			uni.$on('labelChange', () => {
				this.tabList = []
				this.tabIndex = 0
				this.activeIndex = 0
				this.getLabel();
			})
		},
		methods: {
			tab({
				data,
				index
			}) {
				this.activeIndex = index
			},
			getLabel() {
				this.$api.get_label({
						name: 'get_label'
					})
					.then((res) => {
						res.data.unshift({
							name: '全部',
							user: []
						})
						this.tabList = res.data
					})
			},
			change(currentIndex) {
				this.tabIndex = currentIndex
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	;

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;

		.home-list {
			flex: 1;
			box-sizing: border-box;
			overflow: hidden;
		}
	}
</style>
