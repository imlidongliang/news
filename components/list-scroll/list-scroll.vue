<template>
	<scroll-view class="scroll-item" scroll-y="true" @scrolltolower="loadmore">
		<view>
			<slot></slot>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "list-scroll",
		data() {
			return {

			};
		},
		methods: {
			loadmore () {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scroll-item {
		display: flex;
		height: 100%;
		flex-direction: column;
	}
</style>
