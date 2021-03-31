<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x="true">
			<view class="tab-scroll--box">
				<view class="tab-scroll-item" :class="{active: tabIndex === index}" v-for="(item, index) in list" :key="index" @click="clickTab(item, index)">
					{{ item.name }}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icon" @click="openLable">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tab",
		props: {
			tabIndex: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				activeInde: 0
			}
		},
		watch: {
			tabIndex (newVal) {
				this.activeInde = newVal
			}
		},
		methods: {
			clickTab (item, index) {
				this.activeInde = index;
				
				this.$emit('tab', {
					data: item,
					index
				})
			},
			openLable () {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid #f5f5f5;

		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
		}
		.tab-scroll--box {
			display: flex;
			align-items: center;
			height: 45px;
		}
		.tab-scroll-item {
			flex-shrink: 0;
			padding: 0 10px;
			color: #333;
			font-size: 14px;
			
			&.active {
				color: $navbar-color
			}
		}
		.tab-icon {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 10px;
			
			&::after {
				content: '';
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				display: block;
				width: 1px;
				background: #ddd;
			}
		}
	}
</style>
