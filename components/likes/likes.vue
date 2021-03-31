<template>
	<view class="likes" @click.stop="likeTap">
		<uni-icons class="icons" size="20" color="#f03737" :type="like? 'heart-filled' : 'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		name: "likes",
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
			type: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch: {
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.setUpdateLike()
			},
			setUpdateLike() {
				uni.showLoading()
				this.$api.update_like({
						article_id: this.item._id
					})
					.then((res) => {
						uni.hideLoading()
						uni.showToast({
							title: this.like ? '收藏成功' : '取消收藏',
							icon: 'none'
						})
						uni.$emit('updateArticle', this.type)
					}).catch((err) => {
						uni.hideLoading()
					})

			}
		}
	}
</script>

<style lang="scss">
	.likes {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
	}
</style>
