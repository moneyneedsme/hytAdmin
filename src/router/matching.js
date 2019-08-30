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
