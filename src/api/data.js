import axios from '@/libs/api.request'
import axiosBase from 'axios'
//上传文件地址
export const Upload= 'http://192.168.1.77:10006/file/uploadFile';


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
export const netWorkHttp = (URL, info,method='post') => {
  return axios.request({
    url: 'http://192.168.1.77:10006' + URL,
    data: info,
    method
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

// 用户篇
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

// 部门篇
// 暴露接口方法---获取部门信息
export const department = ({ channelId, deptName, pageNum, pageSize }) => {
  return baseURLAxios.post(`/dept/queryDeptListByCondition`, {
    channelId,
    deptName,
    pageNum,
    pageSize
  })
}

// 暴露接口方法---新增部门信息
export const addDepartment = ({
  channelId, //渠道id
  deptName, //部门名称
  operator, //操作人
  pid, //父ID
  pids, //父IDS
  remark, //备注
  sort //排序
}) => {
  return baseURLAxios.post(`/dept/addDept`, {
    channelId,
    deptName,
    operator,
    pid,
    pids,
    remark,
    sort
  })
}

// 暴露接口方法---删除部门信息
export const delDepartment = ({ id }) => {
  return baseURLAxios.delete(`/dept/deleteDept?id=${id}`)
}

// 暴露接口方法---修改部门信息
export const editDepartment = ({
  channelId, //渠道id
  deptName, //部门名称
  id, //主键id
  operator, //操作人
  pid, //父ID
  pids, //父IDS
  remark, //备注
  sort //排序
}) => {
  return baseURLAxios.post(`/dept/modifyDept`, {
    channelId,
    deptName,
    id,
    operator,
    pid,
    pids,
    remark,
    sort
  })
}

// 角色篇
// 暴露接口方法---获取角色信息
export const role = ({ channelId, roleName, pageNum, pageSize }) => {
  return baseURLAxios.post(`/role/queryRoleListByCondition`, {
    channelId,
    roleName,
    pageNum,
    pageSize
  })
}

// 暴露接口方法---新增角色信息
export const addRole = ({
  channelId, //渠道id
  createDate, //创建时间
  operator, //操作人
  remark, //备注
  role, //角色
  roleName, //角色名称
  updateDate //修改时间
}) => {
  return baseURLAxios.post(`/role/addRole`, {
    channelId,
    createDate,
    operator,
    remark,
    role,
    roleName,
    updateDate
  })
}

// 暴露接口方法---删除角色信息
export const delRole = ({ roleId }) => {
  return baseURLAxios.delete(`/role/deleteRole?roleId=${roleId}`)
}

// 暴露接口方法---修改角色信息
export const editRole = ({
  channelId, //渠道id
  id, //主键id
  operator, //操作人
  remark, //备注
  role, //角色
  roleName //角色名称
}) => {
  return baseURLAxios.put(`/role/modifyRole`, {
    channelId,
    id,
    operator,
    remark,
    role,
    roleName
  })
}

// 商户/渠道篇
// 暴露接口方法---获取商户/渠道信息
export const merchant = ({ channelName, pageNum, pageSize }) => {
  return baseURLAxios.post(`/channel/queryChannelListByCondition`, {
    channelName,
    pageNum,
    pageSize
  })
}

// 暴露接口方法---新增商户/渠道信息
export const addMerchant = ({
  channelName, //渠道名称
  operator, //操作人
  pid, //父id
  pids, //父ids
  remark //备注
}) => {
  return baseURLAxios.post(`/channel/addChannel`, {
    channelName,
    operator,
    pid,
    pids,
    remark
  })
}

// 暴露接口方法---删除商户/渠道信息
export const delMerchant = ({ channelId }) => {
  return baseURLAxios.delete(`/channel/deleteChannel?channelId=${channelId}`)
}

// 暴露接口方法---修改商户/渠道信息
export const editMerchant = ({
  channelName, //渠道名称
  id, //主键id
  operator, //操作人
  pid, //父id
  pids, //父ids
  remark //备注
}) => {
  return baseURLAxios.post(`/channel/modifyChannel`, {
    channelName,
    id,
    operator,
    pid,
    pids,
    remark
  })
}

// 暴露接口方法---获取商户/渠道信息树
export const getMerchantTree = ({ channelId }) => {
  return baseURLAxios.get(
    `/channel/queryChannelTreeByChannelId?channelId=${channelId}`
  )
}

// AppSecret秘钥管理篇
// 暴露接口方法---获取秘钥信息
export const appSecret = ({
  appId, //应用id
  appSecret, // 秘钥
  enable, //是否启用
  mchId, //商户号
  mchName, //商户名
  pageNum, //页码
  pageSize //页容量
}) => {
  return baseURLAxios.post(`/appSecret/queryAppSecretListByCondition`, {
    appId,
    appSecret,
    enable,
    mchId,
    mchName,
    pageNum,
    pageSize
  })
}

// 暴露接口方法---新增秘钥信息
export const addAppSecret = ({
  appId, //应用id
  appSecret, // 秘钥
  enable, //是否启用
  mchId, //商户号
  mchName, //商户名
  operator, //操作人
  remark //备注
}) => {
  return baseURLAxios.post(`/appSecret/addAppSecret`, {
  appId, 
  appSecret, 
  enable, 
  mchId, 
  mchName, 
  operator, 
  remark 
  })
}


// 暴露接口方法---删除秘钥信息
export const delAppSecret = ({ id }) => {
  return baseURLAxios.delete(`/appSecret/deleteAppSecret?id=${id}`)
}

// 暴露接口方法---修改秘钥信息
export const editAppSecret = ({
  appId, //应用id
  appSecret, // 秘钥
  enable, //是否启用
  id, //主键id
  mchId, //商户号
  mchName, //商户名
  operator, //操作人
  remark //备注
}) => {
  return baseURLAxios.post(`/appSecret/modifyAppSecret`,
    {
      appId,
      appSecret,
      enable,
      id,
      mchId,
      mchName,
      operator,
      remark
    }
  )
}
