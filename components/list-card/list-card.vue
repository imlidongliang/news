<template>
	<view>
		<!-- 基础卡片 -->
		<view v-if="item.mode === 'base'" class="listCard" @click="clickHandle">
			<view class="listCard-image">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-title">
					<text>
						{{ item.title }}
					</text>
					<likes class="likes" :type="type" :item="item"></likes>
				</view>
				<view class="listCard-desc">
					<view class="listCard-classify">
						{{ item.classify }}
					</view>
					<view class="listCard-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 多图 -->
		<view v-if="item.mode === 'column'" class="listCard mode-column" @click="clickHandle">
			<view class="listCard-title">
				<text>
					{{ item.title }}
				</text>
				<likes class="likes" :type="type" :item="item"></likes>
			</view>
			<view class="listCard-content">
				<view class="listCard-image">
					<view v-if="index < 3" v-for="(item, index) in item.cover" class="listCard-image-item" :key="index">
						<image :src="item"></image>
					</view>
				</view>
				<view class="listCard-desc">
					<view class="listCard-classify">
						{{ item.classify }}
					</view>
					<view class="listCard-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>
		<!-- 大图 -->
		<view v-if="item.mode === 'image'" class="listCard mode-image" @click="clickHandle">

			<view class="listCard-image">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="listCard-content">
				<view class="listCard-title">
					<text>
						{{ item.title }}
					</text>
					<likes class="likes" :type="type" :item="item"></likes>
				</view>
				<view class="listCard-desc">
					<view class="listCard-classify">
						{{ item.classify }}
					</view>
					<view class="listCard-browse">
						{{ item.browse_count }}浏览
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "list-card",
		props: {
			mode: {
				type: String,
				default: 'base'
			},
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

			};
		},
		methods: {
			clickHandle() {
				const item = this.item
				const data = {
					_id: item._id,
					author: {
						author_name: item.author.author_name,
						avatar: item.author.avatar
					},
				
					browse_count: item.browse_count,
					collection_count: item.collection_count,
					create_time: item.create_time,
					thumbs_up_count: item.thumbs_up_count,
					title: item.title
				}

				this.$emit('click')
				uni.navigateTo({
					url: '/pages/detail/detail?data='+JSON.stringify(data),
					success() {
						uni.$emit('sendDataToDetail', item)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.listCard {
		display: flex;
		padding: 10px;
		margin: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;


		.listCard-image {
			flex-shrink: 0;
			width: 60px;
			height: 60px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.listCard-title {
			position: relative;
			padding-right: 30px;
			font-size: 14px;
			color: #333;
			font-weight: 400;
			line-height: 1.2;

			text {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.likes {
				position: absolute;
				top: 0;
				right: 0;
			}
		}

		.listCard-content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			box-sizing: border-box;

			.listCard-desc {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 12px;

				.listCard-classify {
					margin-right: 5px;
					padding: 0 5px;
					border: 1px solid red;
					color: red;
					border-radius: 15px;
				}

				.listCard-browse {
					color: #999;
					line-height: 1.5;
				}
			}
		}

		&.mode-column {
			flex-wrap: wrap;

			.listCard-title {
				width: 100%;
			}

			.listCard-content {
				padding-left: 0;
			}

			.listCard-image {
				display: flex;
				width: 100%;
				height: 70px;
				margin-top: 10px;

				.listCard-image-item {
					width: 100%;
					margin-left: 10px;

					&:first-child {
						margin-left: 0;
					}
				}
			}

			.listCard-desc {
				margin-top: 10px;
			}
		}

		&.mode-image {
			flex-direction: column;

			.listCard-image {
				width: 100%;
				height: 100px;
			}

			.listCard-content {
				padding-left: 0;
				margin-top: 10px;
			}

			.listCard-desc {
				margin-top: 10px;
			}
		}
	}
</style>
