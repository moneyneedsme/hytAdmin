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
import {netWorkHttp} from '@/api/data';
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
        console.log(res.data)
        if(res.data.code===200){
          console.log(res.data)
          const data = res.data.result;
          const routers = getMenuByRouter(res.data.result);
          const originRouteNames = this.$router.options.routes.map(r => r.name);
          // // 需要解决重复加入问题
          if (routers && routers.length && originRouteNames.indexOf(routers[0].name) < 0) {
              console.log(res.data.result)
              console.log(dynamicRouters)
              console.log(this.$router)
              this.$router.addRoutes([{
                children:[],
                meta:{
                  icon: "md-home",
                  title: "首页"
                },
                name: "首页",
                path: "/",
                component:MAIN
              }])
              this.setRoutersList(res.data.result);
              localSave('dynamicRouters',JSON.stringify(res.data.result))
          }
        }else if(res.data.code===500){
          this.$Message.error(res.data.message);
        }
      }).catch(err=>{
        this.$Message.error('网络连接失败或超时');
      })
    }
  },
  mounted () {
    const routers = getMenuByRouter(dynamicRouters);
    const originRouteNames = this.$router.options.routes.map(r => r.name);
    
    // 需要解决重复加入问题
    if (routers && routers.length && originRouteNames.indexOf(routers[0].name) < 0) {
        console.log(dynamicRouters)
        console.log(routers)
        console.log(this.$router.options.routes)
				this.$router.addRoutes(dynamicRouters)
        this.setRoutersList(dynamicRouters);
        localSave('dynamicRouters',JSON.stringify(dynamicRouters))
    }
    // this.getTreeData();
	},
}

</script>

<style>

</style>
