import axios from '@/libs/api.request'
import axiosBase from 'axios'

// // // 创建副本
const baseURLAxios = axiosBase.create({
  // 基地址
  baseURL: 'http://192.168.1.77:10006/'
})

// export const getTableData = () => {
//   return axios.request({
//     url: 'get_table_data',
//     method: 'get'
//   })
// }

// export const getDragList = () => {
//   return axios.request({
//     url: 'get_drag_list',
//     method: 'get'
//   })
// }

// export const errorReq = () => {
//   return axios.request({
//     url: 'error_url',
//     method: 'post'
//   })
// }

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

// export const uploadImg = formData => {
//   return axios.request({
//     url: 'image/upload',
//     data: formData
//   })
// }

// export const getOrgData = () => {
//   return axios.request({
//     url: 'get_org_data',
//     method: 'get'
//   })
// }

// export const getTreeSelectData = () => {
//   return axios.request({
//     url: 'get_tree_select_data',
//     method: 'get'
//   })
// }
export const netWork = (URL, info) => {
  return axios.request({
    url: 'http://192.168.1.62:10007' + URL,
    data: info,
    method: 'post'
  })
}

// 暴露接口方法-- - 获取渠道信息
// export const getMerchantInfo = id => {
//   return axios.request({
//     url:'http://192.168.1.77:10006/channel/queryChannelById?id=' +id,
//     // data:id,
//     method: 'get'
//   })
// }

// 暴露接口方法---获取商户信息
export const userManagement = ({
         pageNum,
         pageSize,
         phone,
         channelName,
         status
       }) => {
         return baseURLAxios.post(`/user/queryUserListByCondition`, {
           pageNum,
           pageSize,
           phone,
           channelName,
           status
         })
       }
