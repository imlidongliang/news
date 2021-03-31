<template>
	<view class="label-wrapper">
		<view class="label-box">
			<view class="label-hd">
				<text class="label-text">我的标签</text>
				<view class="edit" @click="editLabel">{{is_editing? '完成' : '编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading"></uni-load-more>
			<view v-else class="label-content">
				<view class="label" v-for="(item, index) in my_labels" :key="item._id">
					{{item.name}}
					<uni-icons v-show="is_editing" class="remove-label" type="clear" size="16" color="#dd524d"
						@click="removeLabel(index)">
					</uni-icons>
				</view>
			</view>
			<view v-show="!my_labels.length && !loading" class="no-data">
				当前没有数据
			</view>
		</view>

		<view class="label-box">
			<view class="label-hd">
				<text class="label-text">标签推荐</text>
			</view>
			<uni-load-more v-if="loading" status="loading"></uni-load-more>
			<view v-else class="label-content">
				<view class="label" v-for="(item, index) in label_list" :key="item._id" @click="addLabel(index)">
					{{item.name}}
				</view>
			</view>
			<view v-show="!label_list.length && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading: true,
				is_editing: false,
				my_labels: [],
				label_list: []
			}
		},
		onLoad () {
			this.getLable()
		},

		methods: {
			editLabel() {
				if (this.is_editing) {
					this.is_editing = false
					this.setUpdateLabel()
				} else {
					this.is_editing = true
				}
			},
			setUpdateLabel() {
				let label_ids = this.my_labels.reduce((label_ids, next) => {
					label_ids.push(next._id)
					return label_ids
				}, [])
				uni.showLoading()
				this.$api.update_label({
						label_ids
					})
					.then(res => {
						const {
							msg
						} = res
						uni.hideLoading()
						uni.showToast({
							title: msg
						})
						uni.$emit('labelChange')
					})
			},
			removeLabel(index) {
				this.label_list.push(this.my_labels[index])
				this.my_labels.splice(index, 1)
			},
			addLabel(index) {
				if (!this.is_editing) return;
				this.my_labels.push(this.label_list[index])
				this.label_list.splice(index, 1)
			},
			getLable() {
				this.$api.get_label({
						type: 'all'
					}).then(res => {
						const {
							data
						} = res
						this.my_labels = data.filter(item => item.my_label)
						this.label_list = data.filter(item => !item.my_label)
						this.loading = false
					})
					.catch(err => {

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
		background-color: $main-bg-default;
	}

	.label-wrapper {
		width: 100%;

		.label-box {
			display: flex;
			flex-direction: column;
			background: #fff;
			margin-bottom: 10px;

			.label-hd {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 10px 15px;
				margin-bottom: 10px;
				border-bottom: 1px solid #f5f5f5;
				font-size: 14px;
				color: #666;

				.edit {
					color: #30b33a;
					font-weight: bold;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 0 15px 15px;

				.label {
					position: relative;
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					font-size: 12px;
					color: #666;
					border: 1px solid #666;
					border-radius: 5px;
					word-break: break-word;

					.remove-label {
						position: absolute;
						top: -8px;
						right: -8px;
						background-color: #fff;
						border-radius: 50%;
					}
				}
			}
		}

	}

	.no-data {
		height: 100px;
		line-height: 100px;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: #666;
	}
</style>
