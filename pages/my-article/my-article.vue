<template>
	<view>
		<uni-load-more v-if="list.length === 0 && !articleShow" status="loading"></uni-load-more>
		<list-card v-for="item in list" :item="item" :key="item._id"></list-card>
		<view v-if="articleShow" class="no-data">
			没有数据
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				articleShow: false
			}
		},
		onLoad() {
			this.getMyArticle()
		},
		methods: {
			getMyArticle() {
				this.$api.get_my_article().then(res => {
					const {
						data
					} = res
					this.list = data
					
					this.articleShow = data.length? false : true
				})
			}
		}
	}
</script>

<style lang="scss">
	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
