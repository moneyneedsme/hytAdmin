import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {localRead} from "@/libs/util";
import dynamicRouters from '@/router/dynamicRouters';
import {netWorkHttp} from '@/api/data';
// import { setToken, getToken, canTurnTo, setTitle } from '@/libs/util'
import { setToken, getToken,setTitle,getMenuByRouter } from '@/libs/util'
import {matchingRoute} from '@/router/matching'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

// const turnTo = (to, access, next) => {
//   if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
//   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
// }
function filterAsyncRouter (asyncRouterMap){
  const accessedRouters = asyncRouterMap.filter(route => {
  if (route.component) {
    route.component =matchingRoute(route.component); //匹配路由
  }
  if (route.children && route.children.length) {
    route.children = filterAsyncRouter(route.children)
  }
    return true
  })
  return accessedRouters
}
//刷新路由
function refreshRoute (){
  let data = {
    channelId:1,
    permissionType:1,
    userType:2
  }
  netWorkHttp('/permission/queryUserMenu',data).then(res=>{
    if(res.data.code===200){
      const data = res.data.result;
      console.log(data)
      const routers = getMenuByRouter(data);
      const originRouteNames = router.options.routes.map(r => r.name);
      // // 需要解决重复加入问题
      if (routers && routers.length && originRouteNames.indexOf(routers[0].name) < 0) {
          const AsyncRouter= filterAsyncRouter(data);
          router.addRoutes(AsyncRouter);
          store.commit('setRoutersList',AsyncRouter)
      }
    }
  })
  // const routersList = JSON.parse(localRead('dynamicRouters'));
  // const originRouteNames = router.options.routes.map(r => r.name);
  //   // 需要解决重复加入问题
  // if (routersList && routersList.length && originRouteNames.indexOf(routersList[0].name) < 0) {
  //   store.commit('setRoutersList',routersList)
  //     setTimeout(()=>{
  //       router.addRoutes(routersList) 
  //       router.addRoutes([{ path: '*', redirect: '/404' }])
  //     },10)
  // }
  console.log(store)
}

router.beforeEach( async (to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {   //判断是否获取到数据
      // turnTo(to, store.state.user.access, next)   //store.state.user.access  == ['super_admin'] ['super_admin', 'admin']
      next();
      // if(!from.name){ //页面刷新 
      //   refreshRoute();
      // }
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        // turnTo(to, user.access, next)
        next();
        if(!from.name){ //页面刷新 
          refreshRoute();
        }
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})


export default router
