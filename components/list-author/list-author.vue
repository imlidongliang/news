<template>
	<view class="listauthor">
		<view class="author-image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="author-content">
			<view class="author-name">
				{{ item.author_name}}
			</view>
			<view class="author-des">
				<view class="author-des__label">
					{{ item.professional}}
				</view>
				<view class="author-des__info">
					<text>发帖 {{ item.article_ids.length}}</text>
					<text>粉丝 {{ item.fans_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "list-author",
		props:{
			item:{
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.listauthor {
		display: flex;
		padding: 10px 0;
		margin: 0 15px;
		
		.author-image {
			flex-shrink: 0;
			margin-right: 10px;
			width: 40px;
			height: 40px;
			border-radius: 5px;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		.author-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			.author-name {
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				font-weight: bold;
				line-height: 1.2;
			}
			.author-des {
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				
				.author-des__label {
					color: #666;
				}
				.author-des__info {
					color: #999;
					line-height: 1.5;
					text:first-child {
						margin-right: 10px;
					}
				}
			}
		}
	}
</style>
