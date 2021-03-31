<template>
	<view class="comment-content-wrapper">
		<comment-list ref="commentList" :_id="article_id"></comment-list>
	</view>
</template>

<script>
	export default {
		name: "detail-comments",
		data() {
			return {
				article_id: ''
			}
		},
		onLoad(query) {
			this.article_id = query._id
		},
		onReachBottom() {
			this.$refs.commentList.loadMore()
		}
	}
</script>

<style lang="scss">
	.comment-content-wrapper {
		overflow: hidden;
	}
</style>
