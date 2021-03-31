<template>
	<uni-popup ref="popup" type="bottom" :maskClick="false">
		<view class="popup-wrapper">
			<view class="popup-header">
				<view class="popup-header__item" @click="closeComment">
					取消
				</view>
				<view class="popup-header__item" @click="submitComment">
					发布
				</view>
			</view>
			<view class="popup-content">
				<textarea class="comment-textarea" v-model="commentVal" maxlength="200" fixed=""
					placeholder="请输入评论内容" />
				<view class="popup-count">
					{{commentVal.length}}/200
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		name: "comment-popup",
		props: {
			article_id: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				commentVal: '',
			};
		},
		computed: {
			...mapState({
				replyFormData: state => state.comment_form_data.replyFormData
			})
		},
		methods: {
			openComment(is_comment) {
				//  如果只是纯评论，那就清空 回复 要用到的相关字段
				if (is_comment) {
					this.$store.dispatch('comment_form_data/empty_reply_form_data')
				}
				this.commentVal = ''
				this.$refs.popup.open()
			},
			closeComment() {
				this.$refs.popup.close()
			},

			submitComment() {
				uni.showLoading()
				if (!this.commentVal) {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return
				}
				this.setUpdateComment({
					content: this.commentVal,
					...this.replyFormData
				})


			},
			setUpdateComment(content) {
				const formData = {
					article_id: this.article_id,
					...content
				}
				this.$api.update_comment(formData)
					.then(res => {
						uni.showToast({
							title: '评论提交成功'
						})
						uni.hideLoading()
						uni.$emit('getComments')
						this.$refs.popup.close()
					})
					.catch(err => {
						console.log(err)
						uni.showToast({
							title: '评论提交失败',
							icon: 'none'
						})
						uni.hideLoading()
					})
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrapper {
		width: 100%;
		background-color: #fff;

		.popup-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #f5f5f5;

			.popup-header__item {
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
			}

		}

		.popup-content {
			padding: 15px;
			box-sizing: border-box;

			.comment-textarea {
				width: 100%;
				height: 200px;
			}

			.popup-count {
				display: flex;
				justify-content: flex-end;
				width: 100%;
				font-size: 12px;
				color: #999;
			}
		}

	}
</style>
