<template>
	<h1>首页</h1>
</template>

<script>
import dynamicRouters from '@/router/dynamicRouters';
import { getMenuByRouter } from "../../../libs/util";
import { mapGetters,mapMutations } from 'vuex'
import {localRead} from "@/libs/util";
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
		// const routersList = JSON.parse(localRead('dynamicRouters'));
		// const originRouteNames = this.$router.options.routes.map(r => r.name)
		// // 需要解决重复加入问题
    // if (routersList && routersList.length && routersList.indexOf(routersList[0].name) < 0) {
		// 		this.$router.addRoutes(routersList)
		// }
		// // console.log(this.$store.getters.menuList)
		// // console.log(dynamicRouters)
		// // console.log(routers)
		// console.log(this.$router.options.routes)
		// console.log(dynamicRouters)
		// console.log(this.$store.getters.menuList)
	},
}
</script>
