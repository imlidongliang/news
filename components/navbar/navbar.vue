<template>
	<view class="navbar">
		<view class="navbar--fixed">
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{ height: statusBarHeight + 'px'}"></view>
			<!-- #endif -->
			<view class="navbar-content" :class="{ search: isSearch}"
				:style="{ height: navbarHeight + 'px', width: navbarWidth + 'px'}" @click.stop="open">
				<view v-if="isSearch" class="navbar-back" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>

				<view v-if="!isSearch" class="navbar-search">
					<uni-icons class="navbar-search_icon" type="search" size="16" color="#999"></uni-icons>
					<view class="navbar-search_text">
						vue、uni-app
					</view>
				</view>
				<view v-else class="navbar-search">
					<input class="navbar-search_text" type="text" v-model="searchVal" @input="inputChange" />
				</view>
			</view>
		</view>
		<view :style="{ height: statusBarHeight + navbarHeight + 'px'}"></view>
	</view>
</template>

<script>
	export default {
		name: "navbar",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			isSearch: false
		},
		data() {
			return {
				statusBarHeight: 20,
				navbarHeight: 45,
				navbarWidth: 375,
				searchVal: ''
			};
		},
		watch: {
			value(newValue) {
				this.searchVal = newValue
			}
		},
		created() {
			const info = uni.getSystemInfoSync();
			this.statusBarHeight = info.statusBarHeight;
			this.navbarWidth = info.windowWidth;
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();

			this.navbarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info
				.statusBarHeight)
			this.navbarWidth = menuButtonInfo.left
			// #endif
			// #ifdef  MP-ALIPAY
			this.statusBarHeight = 0
			// #endif


		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			open() {
				if (this.isSearch) return;

				uni.navigateTo({
					url: "/pages/search/search",
				})
			},
			inputChange(e) {
				const {
					value
				} = e.detail

				this.$emit('input', value)
			}
		}
	}
</script>

<style lang="scss">
	.navbar {

		.navbar--fixed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: 99;
			background: $navbar-color;
		}

		.navbar-content {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 45px;
			padding: 0 15px;
			box-sizing: border-box;

			&.search {
				padding-left: 0;

				.navbar-back {
					margin-left: 10px;
					margin-right: 10px;
				}

				.navbar-search {
					border-radius: 5px;
				}
			}
		}

		.navbar-search {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0 10px;
			height: 30px;
			background: #fff;
			box-sizing: border-box;
			border-radius: 30px;

			.navbar-search_icon {
				margin-right: 10px;
			}

			.navbar-search_text {
				width: 100%;
				font-size: 14px;
				color: #999;
			}
		}
	}
</style>
