<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions,mapMutations} from 'vuex';
import dynamicRouters from '@/router/dynamicRouters';
import { getMenuByRouter,localSave} from "@/libs/util";
import { setTimeout } from 'timers';
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    ...mapMutations([
      'setRoutersList'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
  },
  mounted () {
    // const routers = getMenuByRouter(dynamicRouters);
    // const originRouteNames = this.$router.options.routes.map(r => r.name);
		// // 需要解决重复加入问题
    // if (routers && routers.length && originRouteNames.indexOf(routers[0].name) < 0) {
		// 		this.$router.addRoutes(dynamicRouters)
    //     this.setRoutersList(dynamicRouters);
    //     console.log(this.$router.options.routes)
    //     localSave('dynamicRouters',JSON.stringify(dynamicRouters))
    // }
    // // console.log(this.$store.getters.menuList)
    // console.log(dynamicRouters)
    // console.log(routers)
		// console.log(this.$store.getters.menuList)
	},
}

</script>

<style>

</style>
