import MAIN from '@/components/main'
import HOME from '@/view/single-page/home/home';
import INFO from '@/view/custom/merchant/info';
import ACCOUNT from '@/view/custom/merchant/account';
import GOODSCOMMODITY from '@/view/custom/commodity/goodsCommodity';
import COMMODITYTYPES from '@/view/custom/commodity/commodityTypes';
import DEVICEMANAGEMENT from '@/view/custom/equipment/deviceManagement';
import TROUBLESHOOTING from '@/view/custom/equipment/troubleshooting';
import GIS from '@/view/custom/equipment/GIS';
import SUBAREALINE from '@/view/custom/equipment/subareaLine';
import GOODWAYGOODS from '@/view/custom/equipment/goodwayGoods';
import CLIENTMANAGEMENT from '@/view/custom/client/clientManagement';
import INTEGRAL from '@/view/custom/client/integral';
import STOCKCONTROL from '@/view/custom/stock/stockControl';
import STOCKADD from '@/view/custom/stock/stockAdd';
import DEPARTMENT from '@/view/custom/system/department'
import USERMANAGEMENT from '@/view/custom/system/userManagement';


// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
const router1 = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
const router2 = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: () => import('@/components/main/main'),
    meta: {
      hideInMenu: false,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: false,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: HOME
      }
    ]
  },
  {
    path: '/merchant',
    name: 'merchant',
    meta: {
      icon: 'md-menu',
      title: '商户'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: '/merchant/Information',
        name: 'Information',
        meta: {
          icon: 'md-funnel',
          title: '商户信息'
        },
        component: INFO
      },
      {
        path: '/merchant/account',
        name: 'account',
        meta: {
          icon: 'md-funnel',
          title: '商户账号'
        },
        component: ACCOUNT
      }
    ]
  },
  {
    path: '/commodity',
    name: 'commodity',
    meta: {
      icon: 'md-menu',
      title: '商品'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: 'goodsCommodity',
        name: 'goodsCommodity',
        meta: {
          icon: 'md-funnel',
          title: '商品管理'
        },
        component: GOODSCOMMODITY
      },
      {
        path: 'commodityTypes',
        name: 'commodityTypes',
        meta: {
          icon: 'md-funnel',
          title: '商品类型'
        },
        component: COMMODITYTYPES
      }
    ]
  },
  {
    path: '/equipment',
    name: 'equipment',
    meta: {
      icon: 'md-menu',
      title: '设备'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: '/equipment/deviceManagement',
        name: 'deviceManagement',
        meta: {
          icon: 'md-funnel',
          title: '设备管理'
        },
        component: DEVICEMANAGEMENT
      },
      {
        path: '/equipment/troubleshooting',
        name: 'troubleshooting',
        meta: {
          icon: 'md-funnel',
          title: '故障报修'
        },
        component: TROUBLESHOOTING
      },
      {
        path: '/equipment/GIS',
        name: 'GIS',
        meta: {
          icon: 'md-funnel',
          title: 'GIS'
        },
        component: GIS
      },
      {
        path: '/equipment/subareaLine',
        name: 'subareaLine',
        meta: {
          icon: 'md-funnel',
          title: '分区线路'
        },
        component: SUBAREALINE
      },
      {
        path: '/equipment/goodwayGoods',
        name: 'goodwayGoods',
        meta: {
          icon: 'md-funnel',
          title: '货道商品'
        },
        component: GOODWAYGOODS
      }
    ]
  },
  // 客户类
  {
    path: '/client',
    name: '客户',
    meta: {
      icon: 'md-menu',
      title: '客户'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: 'clientManagement',
        name: '会员',
        meta: {
          icon: 'md-funnel',
          title: '会员'
        },
        component: CLIENTMANAGEMENT
      },
      {
        path: 'integral',
        name: '积分',
        meta: {
          icon: 'md-funnel',
          title: '积分'
        },
        component: INTEGRAL
      }
    ]
  },
  // 库存类
  {
    path: '/stock',
    name: '库存',
    meta: {
      icon: 'md-menu',
      title: '库存'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: 'stockControl',
        name: '库存监控',
        meta: {
          icon: 'md-funnel',
          title: '库存监控'
        },
        component: STOCKCONTROL
      },
      {
        path: 'stockAdd',
        name: '补货记录',
        meta: {
          icon: 'md-funnel',
          title: '补货记录'
        },
        component: STOCKADD
      }
    ]
  },

  // 系统类
  {
    path: '/system',
    name: '系统',
    meta: {
      icon: 'md-menu',
      title: '系统'
    },
    component: () => import('@/components/main/main'),
    children: [
      {
        path: 'department',
        name: '部门管理',
        meta: {
          icon: 'md-funnel',
          title: '部门管理'
        },
        component: DEPARTMENT
      },
      {
        path: 'userManagement',
        name: '用户管理',
        meta: {
          icon: 'md-funnel',
          title: '用户管理'
        },
        component: USERMANAGEMENT
      }
    ]
  }
]
export default router2;
