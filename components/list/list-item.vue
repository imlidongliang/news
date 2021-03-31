<template>
	<list-scroll class="list-scroll" @loadmore="loadmore">
		<list-card :item="item" v-for="(item, index) in list" :key="item._id"></list-card>
		<uni-load-more v-if="list.length === 0 || list.length > 7" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		name: 'listItem',
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			load: {
				type: Object,
				default () {
					return {
						loading: 'loading'
					}
				}
			}
		},
		data() {
			return {
				loading: 'loading'
			}
		},
		methods: {
			loadmore() {
				this.$emit('loadmore')
			}
		}

	}
</script>
<style lang="scss">
	.list-scroll {
		height: 100%;
	}
</style>
