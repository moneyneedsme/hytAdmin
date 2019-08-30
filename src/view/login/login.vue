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
import { getMenuByRouter,localSave,localRead} from "@/libs/util";
import { setTimeout } from 'timers';
import {netWorkHttp} from '@/api/data';
import {matchingRoute} from '@/router/matching'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'setAsyncRouter'
    ]),
    ...mapMutations([
      'setRoutersList'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.getTreeData();
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    forData(array,ary){
				var data = []
        for(var i=0;i<array.length;i++){
					ary[i].path = array[i].path;
					if(array[i].children){
						ary[i].children = forData(array[i].children)
					}
				}
				return data
    },
    getTreeData(){
      let data = {
        channelId:1,
        permissionType:1,
        userType:2
      }
      netWorkHttp('/permission/queryUserMenu',data).then(res=>{
        if(res.data.code===200){
          const data = res.data.result;
          const routers = getMenuByRouter(data);
          const originRouteNames = this.$router.options.routes.map(r => r.name);
          // // 需要解决重复加入问题
          if (routers && routers.length && originRouteNames.indexOf(routers[0].name) < 0) {
              const AsyncRouter= this.filterAsyncRouter(data);
              this.$router.addRoutes(AsyncRouter);
              this.setAsyncRouter(AsyncRouter);
          }
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
      })
    },
    //将后台传来的字符串替换为组件
    filterAsyncRouter(asyncRouterMap){
      const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        route.component =matchingRoute(route.component); //匹配路由
      }
      if (route.children && route.children.length) {
        route.children = this.filterAsyncRouter(route.children)
      }
        return true
      })
      return accessedRouters
    }
  },
  mounted () {
    
	},
}

</script>

<style>

</style>
