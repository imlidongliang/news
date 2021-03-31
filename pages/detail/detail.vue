<template>
	<view class="detail">
		<view class="detial-title">
			{{ formData.title }}
		</view>
		<view class="detail-header">
			<image class="author-logo" :src="formData.author.avatar" mode="aspectFill"></image>
			<view class="detail-header__content">
				<view class="author">
					{{ formData.author.author_name }}
				</view>
				<view class="detail-header__info">
					<text>{{ formData.create_time }}</text>
					<text>{{ formData.browse_count }} 浏览</text>
					<text>{{ formData.thumbs_up_count }} 赞</text>
				</view>
			</view>
			<button class="detail-header__attention" :class="{is_follow:formData.is_author_like}"
				@click="follow(formData.author.id)">
				{{ formData.is_author_like? '已关注': '关注'}}
			</button>
		</view>
		<!-- 评论 -->
		<view class="detail-content">
			<parse :content="formData.content" :noData="noData"></parse>
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<!-- <view class="comment-item" v-for="(item, index) in commentList" :key="item.comment_id">
					<comment-box :comments="item" @reply="reply"></comment-box>
				</view>
		<uni-load-more v-if="commentList.length === 0 || commentList.length > 6" :status="loading"></uni-load-more> -->
				<!-- <detail-comments ref="detailComments" :_id="formData._id" :component="true"></detail-comments> -->
				<comment-list ref="commentList" :_id="formData._id" :component="true"></comment-list>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="detail-bottom">
			<view class="detail-bottom__input" @click="openComment(true)">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#dd524d"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" @click="openChat">
					<uni-icons type="chat" size="20" color="#dd524d"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="likeTap(formData._id)">
					<uni-icons :type="formData.is_like? 'heart-filled':'heart'" size="20" color="#dd524d"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" @click="thumbsupTap(formData._id)">
					<uni-icons :type="formData.is_thumbs_up? 'hand-thumbsup-filled':'hand-thumbsup'" size="20"
						color="#dd524d"></uni-icons>
				</view>
			</view>
		</view>

		<!-- 回复弹窗 -->
		<comment-popup ref="commentPopup" :article_id="formData._id"></comment-popup>

	</view>
</template>

<script>
	import parse from '@/components/gaoyia-parse/parse.vue';
	import commentBox from '@/components/comment-box/comment-box.vue'
	import commentPopup from '@/components/comment-popup/comment-popup.vue'
	// import detailComments from '@/pages/detail-comments/detail-comments.vue'
	export default {
		components: {
			parse,
			commentBox,
			commentPopup,
			// detailComments
		},
		data() {
			return {
				formData: {},
				noData: '<p style="text-align: center;color: #666">数据加载中…</p>',
				commentList: [],
				loading: 'loading',
				replyFormData: {},
				commentVal: '',
				page: 1,
				pageSize: 7
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.data)
			// uni.$on('sendDataToDetail', data => {
			// 	console.log(data)
			// })

		},
		created() {
			this.getDetail()
		},
		onReachBottom() {
			this.$refs.commentList.loadMore()
		},
		methods: {
			openComment(is_comment) {
				this.$refs.commentPopup.openComment(true)
			},
			getDetail() {
				this.$api.get_detail({
						article_id: this.formData._id
					})
					.then(res => {
						const {
							data
						} = res

						this.formData = data
					})
			},
			//  关注作者
			follow(author_id) {
				uni.showLoading()
				this.$api.update_author({
						author_id
					})
					.then(res => {
						uni.hideLoading()
						this.formData.is_author_like = !this.formData.is_author_like
						uni.showToast({
							title: this.formData.is_author_like ? '关注作者成功' : '取消关注',
							icon: 'none'
						});
						uni.$emit('updateAuthor')
					})
			},
			likeTap(article_id) {
				this.setUpdateLike(article_id)
			},
			setUpdateLike(article_id) {
				uni.showLoading()
				this.$api.update_like({
						article_id
					})
					.then(res => {
						uni.hideLoading()
						this.formData.is_like = !this.formData.is_like
						uni.$emit('updateArticle', 'follow')
						uni.showToast({
							title: this.formData.is_like ? '收藏成功' : '取消收藏',
							icon: 'none'
						});
					})
			},
			thumbsupTap(article_id) {
				if (this.formData.is_thumbs_up) {
					uni.showToast({
						title: "你已经点过赞了",
						icon: 'none'
					});
					return;
				}
				this.setUpdateHhumbsupTap(article_id)
			},
			setUpdateHhumbsupTap(article_id) {
				uni.showLoading()
				this.$api.update_thumbsup({
						article_id
					})
					.then(res => {
						uni.hideLoading()
						this.formData.is_thumbs_up = true
						this.formData.thumbs_up_count++
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					})
			},
			openChat() {
				uni.navigateTo({
					url: '/pages/detail-comments/detail-comments?_id=' + this.formData._id
				})
			}
		}
	}
</script>

<style lang="scss">

	.detail {
		padding: 15px 0;
		box-sizing: border-box;
	}

	.detial-title {
		padding: 0 15px;
		margin-bottom: 10px;
		font-size: 18px;
		font-weight: bold;
		color: #333;

	}

	.detail-header {

		display: flex;
		align-items: center;
		padding: 0 15px;

		.author-logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			margin-right: 10px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;

			.author {
				color: #333;
				font-size: 14px;
			}

			.detail-header__info {
				font-size: 12px;
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}

		.detail-header__attention {
			padding: 0 15px;
			flex-shrink: 0;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			border-radius: 5px;
			color: #fff;
			background-color: $main-bg-red;

			&.is_follow {
				opacity: .5;
			}
		}

	}

	.detail-content {
		padding: 15px;
		font-size: 14px;
		margin-bottom: 54px;
	}

	.detail-comment {
		margin-top: 30px;

		.comment-title {
			padding: 10px 0;
			font-size: 14px;
			color: #666;
			border-bottom: 1px solid #f5f5f5;
		}

		/deep/ .comment-item {
			margin: 0;
		}

	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		background-color: #fff;
		border-top: 1px solid #f5f5f5;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 30px;
			margin-left: 10px;
			padding: 0 10px;
			border-radius: 5px;
			border: 1px solid #ddd;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			align-items: center;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}

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
