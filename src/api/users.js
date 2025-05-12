import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: '/account/auth/login',
    method: 'post',
    data
  })
}
export const getUsers = (page, pageSize) => {
  return request({
    url: `/user/list?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })
}
export const createUser = (data) => {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}
export const updateUser = (data) => {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
export const getUsersByType = (type) => {
  return request({
    url: `/user/byType?type=${type}`,
    method: 'get'
  })
}
export const getUserInfo = (id) => {
  return request({
    url: `/user/info?id=${id}`,
    method: 'get'
  })
}
export const deleteUser = (id) => {
  return request({
    url: `/user/delete?id=${id}`,
    method: 'post'
  })
}
