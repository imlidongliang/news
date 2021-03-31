<template>
	<view class="feedback">
		<view class="feedback-title">
			意见反馈：
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">
			反馈图片：
		</view>
		<view class="feedback-image-list">
			<view class="feedback-image-item" v-for="(item, index) in imageList" :key="index">
				<view class="feedback-image-box">

					<image :src="item.url" mode="aspectFill"></image>
				</view>
				<view class="remove-image" @click="removeImage(index)">
					<uni-icons type="closeempty" size="16" color="#fff"></uni-icons>
				</view>
			</view>
			<view v-if="imageList.length < 5" class="feedback-image-item" @click="addImage">
				<view class="feedback-image-box">
					<uni-icons class="" type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>

		<button class="feedback-btn" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imageList: []
			}
		},
		methods: {
			addImage() {
				const count = 5 - this.imageList.length
				uni.chooseImage({
					count: count,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						let tempFiles = res.tempFiles
						// #ifdef MP-ALIPAY
						tempFiles = tempFilePaths
						// #endif
						tempFilePaths.forEach((item, index) => {
							let name = tempFiles[index].name
							let path =  tempFiles[index].path
							
							// #ifdef MP-ALIPAY
							path = tempFilePaths[index]
							// #endif
							
							// #ifdef MP
							name =  path.substr(path.lastIndexOf('/') + 1)
							// #endif
							//  处理 h5多选的状况
							if (index < count) {
								this.imageList.push({
									url: item,
									name: name
								})
							}

						})

					}
				})
			},
			removeImage(index) {
				this.imageList.splice(index, 1)
			},
			async submit() {
				if (!this.content) {
					uni.showToast({
						title: '请输入您要反馈的问题',
						icon: 'none'
					})
					return
				}
				uni.showLoading()
				let images = []
				for (let i = 0; i < this.imageList.length; i++) {
					const url = this.imageList[i].url
					const name = this.imageList[i].name
					const filePath = await this.uploadImage(url, name)

					images.push(filePath)
				}

				this.updateFeedback({
					content: this.content,
					feedbackImages: images
				})
			},
			async uploadImage(filePath, name) {
				const result = await uniCloud.uploadFile({
					filePath: filePath,
					cloudPath: name
				})

				return result.fileID
			},
			updateFeedback(data) {
				this.$api.update_feedback({
					...data
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: res.msg
					})
					
					setTimeout( () => {
						uni.switchTab({
							url: '/pages/tabbar/my/my'
						})
					}, 2000)
				})
				.catch( err => {
					uni.hideLoading()
					uni.showToast({
						title: '反馈提交失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback-title {
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}

	.feedback-content {
		margin: 15px;
		padding: 10px;
		border: 1px solid #eee;
		box-sizing: border-box;

		.feedback-textarea {
			padding: 0;
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}

	.feedback-image-list {
		display: flex;
		flex-wrap: wrap;
		padding: 10px;

		.feedback-image-item {
			position: relative;
			width: 33.3333%;
			height: 0;
			padding-top: 33.3333%;
			box-sizing: border-box;
			overflow: hidden;

			.remove-image {
				position: absolute;
				top: 0;
				right: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: $color-red;
			}

			.feedback-image-box {
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 5px;
				left: 5px;
				bottom: 5px;
				right: 5px;
				overflow: hidden;
				border-radius: 5px;
				border: 1px solid #eee;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.feedback-btn {
		margin: 15px;
		outline: none;
		background-color: $color-red;
		border-color: $color-red;
		border-radius: 5px;
	}
</style>
