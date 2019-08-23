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

export default [
	{
		path: '/',
		name: '_home',
		redirect: '/home',
		component:()=> import('@/components/main/main'),
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
		component: ()=> import('@/components/main/main'),
		children: [
			{
				path: 'Information',
				name: 'Information',
				meta: {
					icon: 'md-funnel',
					title: '商户信息'
				},
				component: INFO
			},
			{
				path: 'account',
				name: 'account',
				meta: {
					icon: 'md-funnel',
					title: '商户账号'
				},
				component: ACCOUNT
			},
		]
	},
	{
		path: '/commodity',
		name: 'commodity',
		meta: {
			icon: 'md-menu',
			title: '商品'
		},
		component:()=> import('@/components/main/main'),
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
		component: ()=> import('@/components/main/main'),
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
	}
]