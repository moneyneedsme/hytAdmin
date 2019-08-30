export const matchingRoute = (name)=>{
  switch(name){
    case 'MAIN':
      return () => import('@/components/main');
      break;
    case 'HOME':
        return () => import('@/view/single-page/home/home');
        break;
    case 'INFO':
        return () => import('@/view/custom/merchant/info');
        break;
    case 'ACCOUNT':
        return () => import('@/view/custom/merchant/account');
        break;
    case 'GOODSCOMMODITY':
        return () => import('@/view/custom/commodity/goodsCommodity');
        break;
    case 'CHANNElGOODSCOMMODITY':
        return () => import('@/view/custom/commodity/channelGoodsCommodity');
        break;
    case 'COMMODITYTYPES':
        return () => import('@/view/custom/commodity/commodityTypes');
        break;
    case 'CHANNElCOMMODITYTYPES':
        return () => import('@/view/custom/commodity/channelCommodityTypes');
        break;
    case 'COMMODITYPRICE':
        return () => import('@/view/custom/commodity/commodityPrice');
        break;
    case 'COMMODITYPRICEDETAILS':
        return () => import('@/view/custom/commodity/commodityPriceDetails');
        break;
    case 'DEVICEMANAGEMENT':
        return () => import('@/view/custom/equipment/deviceManagement');
        break;
    case 'TROUBLESHOOTING':
        return () => import('@/view/custom/equipment/troubleshooting');
        break;
    case 'GIS':
        return () => import('@/view/custom/equipment/GIS');
        break;
    case 'SUBAREALINE':
        return () => import('@/view/custom/equipment/subareaLine');
        break;
    case 'GOODWAYGOODS':
        return () => import('@/view/custom/equipment/goodwayGoods');
        break;
    case 'CLIENTMANAGEMENT':
        return () => import('@/view/custom/client/clientManagement');
        break;
    case 'INTEGRAL':
        return () => import('@/view/custom/client/integral');
        break;
    case 'STOCKCONTROL':
        return () => import('@/view/custom/stock/stockControl');
        break;
    case 'STOCKADD':
        return () => import('@/view/custom/stock/stockAdd');
        break;
    case 'DEPARTMENT':
        return () => import('@/view/custom/system/department');
        break;
    case 'USERMANAGEMENT':
        return () => import('@/view/custom/system/userManagement');
        break;
    case 'ROLE':
        return () => import('@/view/custom/system/role');
        break;
    case 'PURVIEW':
        return () => import('@/view/custom/system/purview');
        break;
    case 'DICT':
        return () => import('@/view/custom/system/dict');
        break;
    case 'APPMANAGE':
        return () => import('@/view/custom/system/appManage');
        break;
    case 'APPSECRET':
        return () => import('@/view/custom/system/appSecret');
        break;
    default:
        return () => import('@/view/single-page/home/home');
  }
}

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
// export const matchingRoute = (name)=>{
//   switch(name){
//     case 'MAIN':
//       return MAIN
//       break;
//     case 'HOME':
//         return HOME
//         break;
//     case 'INFO':
//         return INFO
//         break;
//     case 'ACCOUNT':
//         return ACCOUNT
//         break;
//     case 'GOODSCOMMODITY':
//         return GOODSCOMMODITY
//         break;
//     case 'CHANNElGOODSCOMMODITY':
//         return CHANNElGOODSCOMMODITY
//         break;
//     case 'COMMODITYTYPES':
//         return COMMODITYTYPES
//         break;
//     case 'CHANNElCOMMODITYTYPES':
//         return CHANNElCOMMODITYTYPES
//         break;
//     case 'COMMODITYPRICE':
//         return COMMODITYPRICE;
//         break;
//     case 'COMMODITYPRICEDETAILS':
//         return COMMODITYPRICEDETAILS;
//         break;
//     case 'DEVICEMANAGEMENT':
//         return DEVICEMANAGEMENT;
//         break;
//     case 'TROUBLESHOOTING':
//         return TROUBLESHOOTING;
//         break;
//     case 'GIS':
//         return GIS;
//         break;
//     case 'SUBAREALINE':
//         return SUBAREALINE;
//         break;
//     case 'GOODWAYGOODS':
//         return GOODWAYGOODS;
//         break;
//     case 'CLIENTMANAGEMENT':
//         return CLIENTMANAGEMENT;
//         break;
//     case 'INTEGRAL':
//         return INTEGRAL
//         break;
//     case 'STOCKCONTROL':
//         return STOCKCONTROL;
//         break;
//     case 'STOCKADD':
//         return STOCKADD;
//         break;
//     case 'DEPARTMENT':
//         return DEPARTMENT;
//         break;
//     case 'USERMANAGEMENT':
//         return USERMANAGEMENT;
//         break;
//     case 'ROLE':
//         return ROLE;
//         break;
//     case 'PURVIEW':
//         return PURVIEW;
//         break;
//     case 'DICT':
//         return DICT;
//         break;
//     case 'APPMANAGE':
//         return APPMANAGE;
//         break;
//     case 'APPSECRET':
//         return APPSECRET;
//         break;
//     default:
//         return HOME;
//   }
// }