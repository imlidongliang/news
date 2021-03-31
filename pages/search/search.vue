<template>
	<view class="search-page">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="search-list">
			<view v-if="is_history" class="label-box">
				<view class="label-hd">
					<text class="label-text">搜索历史</text>
					<view class="history-clear" @click="clearHistoryList">清空</view>
				</view>
				<view v-if="historyList.length" class="label-content">
					<view class="label" v-for="(item, index) in historyList" :key="index" @click="openHistory(item)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>

			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading"></uni-load-more>
				<view v-else>
					<view v-if="searchList.length">
					
						<list-card :item="item" v-for="(item, index) in searchList" :key="item._id" @click="clickHandle">
						</list-card>
					</view>
					<view v-else class="no-data">
						没有搜到相关数据
					</view>
				</view>
			</list-scroll>

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				value: '',
				is_history: true,
				searchList: [],
				loading: false
			}
		},
		computed: {
			...mapState({
				historyList: state => state.search_history.historyList
			})
		},
		methods: {
			clickHandle() {
				this.$store.dispatch('search_history/set_history', {
					name: this.value
				})
			},
			openHistory(item) {
				this.value = item.name
				this.getList(this.value)
			},
			clearHistoryList() {
				this.$store.dispatch('search_history/clear_history')
				
				uni.showToast({
					title: '清空成功'
				})
			},
			change(val) {
				this.value = val

				if (!val) {
					clearTimeout(this.time)
					this.mark = false
					this.getList(val)
					return
				}
				if (!this.mark) {
					this.mark = true

					this.time = setTimeout(() => {
						this.mark = false
						this.getList(val)
					}, 1000)
				}
			},
			getList(value) {
				if (!value) {
					this.searchList = []
					this.is_history = true
					return;
				}
				this.is_history = false
				this.loading = true
				this.$api.get_search({
						value
					})
					.then((res) => {
						const {
							data
						} = res
						this.searchList = data
						this.loading = false
					})
					.catch( err => {
						this.loading = false
					})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.search-page {
		display: flex;
		flex-direction: column;
		flex: 1;

		.label-box {
			display: flex;
			flex-direction: column;
			background: #fff;

			.label-hd {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 15px;
				margin-bottom: 10px;
				border-bottom: 1px solid #f5f5f5;
				font-size: 14px;
				color: #666;

				.label-text {
					color: $uni-color-error
				}

				.history-clear {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 0 15px 15px;

				.label {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					font-size: 12px;
					color: #666;
					border: 1px solid #666;
					border-radius: 5px;
					word-break: break-word;

				}
			}
		}
	}

	.no-data {
		height: 200px;
		line-height: 200px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
