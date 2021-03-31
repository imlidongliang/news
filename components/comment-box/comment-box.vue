<template>
	<view class="comment-box">
		<view class="comment-header">
			<view class="comment-logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-info">
				<view v-if="!comments.is_reply" class="comment-author">
					{{comments.author.author_name}}
				</view>
				<view v-else class="comment-author">
					{{comments.author.author_name}} <text class="comment-reply_text">回复</text>{{comments.to}} 
				</view>
				<view class="comment-time">
					{{comments.creat_time | fmtTime}}
				</view>
			</view>
		</view>
		<view class="comment-content">
			<view>{{comments.comment_content}}</view>
			<view class="comment-button__box">
				<view class="comment-button" @click="commentsReply({comments, is_reply: reply})">
					回复
				</view>
			</view>
			<view class="comment-reply" v-for="item in comments.reply" :key="item.comment_id">
				<comment-box :reply="true" :comments="item" @reply="commentsReply"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import { parseTime } from '@/utils/index.js'
	import commentBox from '@/components/comment-box/comment-box.vue';
	export default {
		components: {
			commentBox
		},
		name: "comment-box",
		props: {
			comments: {
				type: Object,
				default () {
					return {}
				}
			},
			reply: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			fmtTime(val) {
				
				return parseTime(val)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			commentsReply(comments) {
				//为了区分 主回复还是子回复
				if (comments.is_reply) {
					// 子回复的id
					comments.comments.reply_id = comments.comments.comment_id
					// 主回复的 id
					comments.comments.comment_id = this.comments.comment_id
					
				}
				this.$emit('reply', comments)
			}
		}
	}
</script>

<style lang="scss">
	.comment-box {
		margin: 15px 0;

		.comment-header {
			display: flex;

			.comment-logo {
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				margin-right: 10px;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.comment-info {
				display: flex;
				flex-direction: column;
				color: #999;
				font-size: 12px;
				line-height: 1;

				.comment-author {
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					
					.comment-reply_text {
						margin: 0 10px;
						color: #000;
						font-weight: bold;
					}
				}
			}
		}

		.comment-content {
			margin-top: 10px;
			font-size: 14px;
			color: #000;

			.comment-button__box {
				margin-top: 15px;
				display: flex;

				.comment-button {
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px solid #ccc;
				}
			}

			.comment-reply {
				display: flex;
				margin: 15px 0;
				padding: 0 10px;
				border: 1px solid #eee;
			}
		}
	}
</style>
