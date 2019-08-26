import axios from '@/libs/api.request'
import axiosBase from 'axios'

// 创建副本
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

// 暴露接口方法-- - 获取用户信息
// export const getMerchantInfo = id => {
//   return axios.request({
//     url:'http://192.168.1.77:10006/channel/queryChannelById?id=' +id,
//     // data:id,
//     method: 'get'
//   })
// }

// 暴露接口方法---获取用户信息
export const userManagement = ({
  channelId,
  pageNum,
  pageSize,
  phone,
  status,
  userName
}) => {
  return baseURLAxios.post(`/user/queryUserListByCondition`, {
    channelId,
    pageNum,
    pageSize,
    phone,
    status,
    userName
  })
}
// 暴露接口方法---新增用户信息
export const addUser = ({
  birth, //出生日期
  channelId, //渠道id
  deptId, //部门id
  email, //电子邮件
  image, //头像
  imageAddress, //头像地址
  name, //姓名
  operator, //操作人
  password, //密码
  phone, //手机
  remark, //备注
  sex, //性别
  status, //状态
  type, //类型
  userName //用户
}) => {
  return baseURLAxios.post(`/user/addUser`, {
    birth,
    channelId,
    deptId,
    email,
    image,
    imageAddress,
    name,
    operator,
    password,
    phone,
    remark,
    sex,
    status,
    type,
    userName
  })
}

// 暴露接口方法---删除用户信息
export const delUser = ({ id }) => {
  return baseURLAxios.delete(`/user/deleteUser?id=${id}`)
}

// 暴露接口方法---修改用户信息
export const editUser = ({
  birth, //出生日期
  deptId, //部门id
  email, //电子邮件
  id, //主键id
  image, //头像
  imageAddress, //头像地址
  name, //姓名
  operator, //操作人
  password, //密码
  phone, //手机
  remark, //备注
  sex, //性别
  status, //状态
  type, //类型
  userName //用户
}) => {
  return baseURLAxios.put(`/user/modifyUser`, {
    birth,
    deptId,
    email,
    id,
    image,
    imageAddress,
    name,
    operator,
    password,
    phone,
    remark,
    sex,
    status,
    type,
    userName
  })
}

// 暴露接口的方法---根据ID查询用户信息
// export const getUserInfo = ({ id }) => {
//   return baseURLAxios.get(`/user/queryUserById`,{
//     params:{
//       id
//     }
//   })
// }