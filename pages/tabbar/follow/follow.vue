<template>
	<view class="follow">
		<view class="follow-tab">
			<view class="follow-tab__scroll">
				<view class="follow-tab__item" :class="{ active: activeIndex === 0}" @click="tap(0)">
					文章
				</view>
				<view class="follow-tab__item" :class="{ active: activeIndex === 1}" @click="tap(1)">
					作者
				</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-swiper" :current="activeIndex" @change="change">
				<swiper-item class="swiper-item">
					<list-scroll>
						<uni-load-more v-if="list.length === 0 && !articleShow" status="loading"></uni-load-more>
						<list-card v-else v-for="item in list" :item="item" type="follow" :key="item._id"></list-card>
						<view v-if="articleShow" class="no-data">
							没有收藏文章
						</view>
					</list-scroll>
				</swiper-item>
				<swiper-item class="swiper-item">
					<list-scroll>
						<uni-load-more v-if="authorList.length === 0 && !authorShow" status="loading"></uni-load-more>
						<list-author class="author" v-for="item in authorList" :item="item" type="follow" :key="item.id"></list-author>
						<view v-if="authorShow" class="no-data">
							没有关注作者
						</view>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				list: [],
				authorList: [],
				articleShow: false,
				authorShow: false
			}
		},
		onLoad() {
			uni.$on('updateArticle', () => {
				this.getFollow()
			})
			uni.$on('updateAuthor', () => {
				this.getAuthor()
			})
			this.getFollow()
			this.getAuthor()
		},
		methods: {
			tap(index) {
				this.activeIndex = index
			},
			getAuthor () {
				this.$api.get_author()
					.then(res => {
						const {
							data
						} = res
						this.authorList = data

						this.authorShow = data.length ? false : true
					})
			},
			getFollow() {
				this.$api.get_follow()
					.then(res => {
						const {
							data
						} = res
						this.list = data

						this.articleShow = data.length ? false : true
					})
			},
			change(e) {
				const {
					current
				} = e.detail
				this.activeIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow {
		display: flex;
		height: 100%;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;

		.follow-tab {
			height: 30px;
			padding: 10px 20px;

			.follow-tab__scroll {
				display: flex;
				width: 100%;
				height: 100%;
				border-radius: 5px;
				border: 1px solid $color-red;

				.follow-tab__item {
					display: flex;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;
					flex: 1;
					border-right: 1px solid $color-red;

					&:last-child {
						border-right: 0;
					}

					&.active {
						color: $color-red;
					}
				}
			}
		}

		.follow-list {
			flex: 1;

			.follow-swiper {
				height: 100%;
			}
			
			.author {
				margin: 0 15px;
			}
		}
		
		
	}

	.no-data {
		padding: 50px;
		font-size: 14px;
		color: #999;
		text-align: center;
	}
</style>
