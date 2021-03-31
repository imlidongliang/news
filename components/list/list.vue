<template>
	<swiper class="list-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="item.name">
			<list-item :list="listCacheData[index]" :load="load[index]" @loadmore="loadmore">
			</list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue';
	export default {
		components: {
			listItem
		},
		name: "list",
		props: {
			tabList: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				listCacheData: {},
				load: {},
				page: 1,
				pageSize: 10
			};
		},
		watch: {
			tabList(newVal) {
				if (newVal.length === 0) return
				this.listCacheData = {}
				this.load = {}
				this.getList(0)
			}
		},
		created() {
			uni.$on('updateArticle', (type) => {
				if (type === 'follow') {
					this.listCacheData = {}
					this.load = {}
					this.getList(this.activeIndex)
				}
			})
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading !== 'noMore') {

					this.load[this.activeIndex].page++
					this.getList(this.activeIndex)
				}
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
					this.getList(current)
				}
			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
						name: this.tabList[current].name,
						page: this.load[current].page,
						pageSize: this.pageSize
					})
					.then((res) => {
						const {
							data
						} = res
						if (data.length === 0) {
							this.$set(this.load, current, {
								page: this.load[current].page,
								loading: 'noMore'
							})
							this.$forceUpdate()
							return;
						}
						let dataList = this.listCacheData[current] || []
						dataList.push(...data)

						this.$set(this.listCacheData, current, dataList)
					})
			}
		}
	}
</script>

<style lang="scss">
	.list-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;
		}

	}
</style>
