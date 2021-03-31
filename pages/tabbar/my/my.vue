<template>
	<view>
		<!-- 头部 -->
		<view class="my-header">
			<view class="my-header-bg">
				<image :src="userInfo.avatar" mode="aspectFill"></image>
			</view>
			<view class="my-header__logo">
				<view class="my-header__logo-box">
					<image :src="userInfo.avatar" mode="aspectFill"></image>
				</view>
				<text class="my-name">{{userInfo.author_name}}</text>
			</view>
			<view class="my-header__info">
				<view class="item">
					<text class="label">
						关注
					</text>
					<text>{{userInfo.follow_count}}</text>
				</view>
				<view class="item">
					<text class="label">
						粉丝
					</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<view class="item">
					<text class="label">
						积分
					</text>
					<text>{{userInfo.integral_count || 0}}</text>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="my-content">
			<view class="my-menu-list">
				<view class="my-menu-item" @click="open('my-article')">
					<uni-icons class="icon" type="contact" size="16" color="#666"></uni-icons>
					<text class="content">
						我的文章
					</text>
					<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
				</view>
				<view class="my-menu-item" @click="open('feedback')">
					<uni-icons class="icon" type="help" size="16" color="#666"></uni-icons>
					<text class="content">
						意见反馈
					</text>
					<uni-icons type="arrowright" size="14" color="#666"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('user', ['userInfo'])
		},
		methods: {
			open (path) {
				uni.navigateTo({
					url: '/pages/' + path + '/' + path
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.my-header {
		position: relative;
		padding-bottom: 15px;

		.my-header-bg {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			filter: blur(8px);
			opacity: .3;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-header__logo {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 30px;

			.my-header__logo-box {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-name {
				margin-top: 15px;
				font-size: 16px;
				font-weight: bold;
			}
		}
	}

	.my-header__info {
		display: flex;
		margin-top: 15px;

		.item {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			color: #999;

			.label {
				font-size: 14px;
				color: #333;
			}
		}
	}

	.my-menu-item {
		display: flex;
		align-items: center;
		padding: 15px;
		margin-bottom: 10px;
		background-color: #fff;
		color: #333;
		font-size: 14px;

		.icon {
			margin-right: 10px;
		}

		.content {
			flex: 1;
		}
	}
</style>
