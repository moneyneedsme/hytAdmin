// import MAIN from '@/components/main'
// import HOME from '@/view/single-page/home/home';
// import INFO from '@/view/custom/merchant/info';
// import ACCOUNT from '@/view/custom/merchant/account';
// import GOODSCOMMODITY from '@/view/custom/commodity/goodsCommodity';
// import CHANNElGOODSCOMMODITY from '@/view/custom/commodity/channelGoodsCommodity';
// import COMMODITYTYPES from '@/view/custom/commodity/commodityTypes';
// import CHANNElCOMMODITYTYPES from '@/view/custom/commodity/channelCommodityTypes';
// import COMMODITYPRICE from '@/view/custom/commodity/commodityPrice';
// import COMMODITYPRICEDETAILS from '@/view/custom/commodity/commodityPriceDetails';
// import DEVICEMANAGEMENT from '@/view/custom/equipment/deviceManagement';
// import TROUBLESHOOTING from '@/view/custom/equipment/troubleshooting';
// import GIS from '@/view/custom/equipment/GIS';
// import SUBAREALINE from '@/view/custom/equipment/subareaLine';
// import GOODWAYGOODS from '@/view/custom/equipment/goodwayGoods';
// import CLIENTMANAGEMENT from '@/view/custom/client/clientManagement';
// import INTEGRAL from '@/view/custom/client/integral';
// import STOCKCONTROL from '@/view/custom/stock/stockControl';
// import STOCKADD from '@/view/custom/stock/stockAdd';
// import DEPARTMENT from '@/view/custom/system/department'
// import USERMANAGEMENT from '@/view/custom/system/userManagement';
// import ROLE from '@/view/custom/system/role';
// import PURVIEW from '@/view/custom/system/purview';
// import DICT from '@/view/custom/system/dict';
// import APPMANAGE from '@/view/custom/system/appManage';
// import APPSECRET from '@/view/custom/system/appSecret'

// export default [
//   {
//     path: '/',  
//     name: '_home',
//     redirect: '/home',
//     component: () => import('@/components/main/main'),
//     meta: {
//       hideInMenu: false,
//       notCache: true
//     },
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           hideInMenu: false,
//           title: '首页',
//           notCache: true,
//           icon: 'md-home'
//         },
//         component: HOME
//       }
//     ]
//   },
//   {
//     path: '/merchant',
//     name: 'merchant',
//     meta: {
//       icon: 'md-menu',
//       title: '商户'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: '/merchant/Information',
//         name: 'Information',
//         meta: {
//           icon: 'md-funnel',
//           title: '商户信息'
//         },
//         component: INFO
//       },
//       {
//         path: '/merchant/account',
//         name: 'account',
//         meta: {
//           icon: 'md-funnel',
//           title: '商户账号'
//         },
//         component: ACCOUNT
//       }
//     ]
//   },
//   {
//     path: '/commodity',
//     name: 'commodity',
//     meta: {
//       icon: 'md-menu',
//       title: '商品'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: '/commodity/commodityPrice', //path
//         name: 'commodityPrice',// title
//         meta: {
//           icon: 'md-funnel', //icon
//           title: '商品价格模版'//name
//         },
//         component: COMMODITYPRICE //component
// 			},
// 			{
//         path: '/commodity/commodityPriceDetails',
//         name: 'commodityPriceDetails',
//         meta: {
//           icon: 'md-funnel',
//           title: '商品价格模版详情'
//         },
//         component: COMMODITYPRICEDETAILS
//       },
//       {
//         path: '/commodity/commodityTypes',
//         name: 'commodityTypes',
//         meta: {
//           icon: 'md-funnel',
//           title: '基础商品类型'
//         },
//         component: COMMODITYTYPES
//       },
//       {
//         path: '/commodity/goodsCommodity',
//         name: 'goodsCommodity',
//         meta: {
//           icon: 'md-funnel',
//           title: '基础商品'
//         },
//         component: GOODSCOMMODITY
//       },
//       {
//         path: '/commodity/channelCommodityTypes',
//         name: 'channelCommodityTypes',
//         meta: {
//           icon: 'md-funnel',
//           title: '渠道商商品分类'
//         },
//         component: CHANNElCOMMODITYTYPES
//       },
//       {
//         path: '/commodity/channelGoodsCommodity',
//         name: 'channelGoodsCommodity',
//         meta: {
//           icon: 'md-funnel',
//           title: '渠道商商品'
//         },
//         component: CHANNElGOODSCOMMODITY
//       }
//     ]
//   },
//   {
//     path: '/equipment',
//     name: 'equipment',
//     meta: {
//       icon: 'md-menu',
//       title: '设备'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: '/equipment/deviceManagement',
//         name: 'deviceManagement',
//         meta: {
//           icon: 'md-funnel',
//           title: '设备管理'
//         },
//         component: DEVICEMANAGEMENT
//       },
//       {
//         path: '/equipment/troubleshooting',
//         name: 'troubleshooting',
//         meta: {
//           icon: 'md-funnel',
//           title: '故障报修'
//         },
//         component: TROUBLESHOOTING
//       },
//       {
//         path: '/equipment/GIS',
//         name: 'GIS',
//         meta: {
//           icon: 'md-funnel',
//           title: 'GIS'
//         },
//         component: GIS
//       },
//       {
//         path: '/equipment/subareaLine',
//         name: 'subareaLine',
//         meta: {
//           icon: 'md-funnel',
//           title: '分区线路'
//         },
//         component: SUBAREALINE
//       },
//       {
//         path: '/equipment/goodwayGoods',
//         name: 'goodwayGoods',
//         meta: {
//           icon: 'md-funnel',
//           title: '货道商品'
//         },
//         component: GOODWAYGOODS
//       }
//     ]
//   },
//   // 客户类
//   {
//     path: '/client',
//     name: '客户',
//     meta: {
//       icon: 'md-menu',
//       title: '客户'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: 'clientManagement',
//         name: '会员',
//         meta: {
//           icon: 'md-funnel',
//           title: '会员'
//         },
//         component: CLIENTMANAGEMENT
//       },
//       {
//         path: 'integral',
//         name: '积分',
//         meta: {
//           icon: 'md-funnel',
//           title: '积分'
//         },
//         component: INTEGRAL
//       }
//     ]
//   },
//   // 库存类
//   {
//     path: '/stock',
//     name: '库存',
//     meta: {
//       icon: 'md-menu',
//       title: '库存'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: 'stockControl',
//         name: '库存监控',
//         meta: {
//           icon: 'md-funnel',
//           title: '库存监控'
//         },
//         component: STOCKCONTROL
//       },
//       {
//         path: 'stockAdd',
//         name: '补货记录',
//         meta: {
//           icon: 'md-funnel',
//           title: '补货记录'
//         },
//         component: STOCKADD
//       }
//     ]
//   },

//   // 系统类
//   {
//     path: '/system',
//     name: '系统',
//     meta: {
//       icon: 'md-menu',
//       title: '系统'
//     },
//     component: () => import('@/components/main/main'),
//     children: [
//       {
//         path: 'department',
//         name: '部门管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '部门管理'
//         },
//         component: DEPARTMENT
//       },
//       {
//         path: 'userManagement',
//         name: '用户管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '用户管理'
//         },
//         component: USERMANAGEMENT
//       },
//       {
//         path: 'role',
//         name: '角色管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '角色管理'
//         },
//         component: ROLE
//       },
//       {
//         path: 'purview',
//         name: '权限管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '权限管理'
//         },
//         component: PURVIEW
//       },
//       {
//         path: 'dict',
//         name: '字典管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '字典管理'
//         },
//         component: DICT
//       },
//       {
//         path: 'appManage',
//         name: '应用管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '应用管理'
//         },
//         component: APPMANAGE
//       },
//       {
//         path: 'appSecret',
//         name: '秘钥管理',
//         meta: {
//           icon: 'md-funnel',
//           title: '秘钥管理'
//         },
//         component: APPSECRET
//       }
//     ]
//   }
// ]