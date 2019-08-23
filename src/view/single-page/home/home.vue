<template>
	<h1>首页</h1>
</template>

<script>
import dynamicRouters from '@/router/dynamicRouters';
import { getMenuByRouter } from "../../../libs/util";
import { mapGetters,mapMutations } from 'vuex'
export default {
	name: 'home',
	data () {
		return {
		}
	},
	methods: {
		...mapMutations([
			'setRoutersList'
    ]),
	},
	mounted () {
		// const routers = getMenuByRouter(dynamicRouters);
		// const originRouteNames = this.$router.options.routes.map(r => r.name)
		// // 需要解决重复加入问题
    // if (dynamicRouters && dynamicRouters.length && originRouteNames.indexOf(dynamicRouters[0].name) < 0) {
		// 		this.$router.addRoutes(dynamicRouters)
		// 		this.setRoutersList(dynamicRouters);
		// }
		// // console.log(this.$store.getters.menuList)
		// console.log(dynamicRouters)
		// console.log(routers)
		// console.log(this.$router.options.routes)
		// console.log(dynamicRouters)
		// console.log(this.$store.getters.menuList)
	},
}
</script>
