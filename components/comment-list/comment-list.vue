<template>
	<view>
		<view class="comment-item" v-for="item in commentList" :key="item.comment_id">
			<comment-box :comments="item" @reply="reply"></comment-box>
		</view>
		<uni-load-more v-if="commentList.length === 0 || commentList.length > pageSize - 1" :status="loading">
		</uni-load-more>
		<comment-popup ref="commentPopup" :article_id="article_id"></comment-popup>
	</view>
</template>

<script>
	import commentPoup from '@/components/comment-popup/comment-popup.vue'
	export default {
		name: "comment-list",
		components: {
			commentPoup
		},
		props: {
			_id: {
				type: [String, Number],
				default: ''
			},
			component: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				firstLoad: true,
				loading: 'loading',
				article_id: '',
				commentList: [],
				page: 1,
				pageSize: 10
			}
		},
		watch: {
			_id(newVal) {
				this.article_id = newVal
				this.getComments()

			}
		},
		onLoad(query) {
			this.article_id = query._id
			this.getComments()

		},
		created() {
			uni.$on('getComments', () => {
				this.page = 1
				this.commentList = []
				this.loading = 'loading'
				this.getComments()
			})
			this.getComments()
		},
		methods: {
			openComment() {
				this.$refs.commentPopup.openComment()
			},
			reply(comments) {
				const replyFormData = {
					"comment_id": comments.comments.comment_id,
					"is_reply": comments.is_reply
				}
				if (comments.comments.reply_id) {
					replyFormData.reply_id = comments.comments.reply_id
				}
				this.$store.dispatch('comment_form_data/set_reply_form_data', replyFormData)
				this.openComment()
			},
			loadMore() {
				if (this.loading === 'noMore' || this.commentList.length < this.pageSize) {
					return
				}
				this.page++
				this.getComments()
			},
			getComments() {
				if (this.loading === 'noMore') {
					return
				}
				this.article_id = this.article_id || this._id

				this.$api.get_comment({
						article_id: this.article_id,
						page: this.page,
						pageSize: this.pageSize
					})
					.then(res => {
						const {
							data
						} = res

						//  对象复制
						let oldFormData = JSON.parse(JSON.stringify(this.commentList))
						oldFormData.push(...data)
						this.commentList = oldFormData

						if (data.length < this.pageSize) {
							this.loading = 'noMore'
							return
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.comment-item {
		margin: 0 15px;
		border-top: 1px solid #eee;
	}
</style>
