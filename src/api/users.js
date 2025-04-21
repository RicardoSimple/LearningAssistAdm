import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

/**
 *
 * @param {object} data
 * @returns
 */
export const register = (data) => {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @returns
 */
export const getUsers = () => {
  return request({
    url: '/api/users',
    method: 'get'
  })
}

/**
 * 获取单个用户的信息
 * @param {string} id
 * @returns
 */
export const getUsersById = (id) => {
  return request({
    url: `/api/users/${id}`,
    method: 'get'
  })
}

/**
 * 修改用户信息
 * @param {string} id
 * @param {object} data
 * @returns
 */
export const updateUsersById = (id, data) => {
  return request({
    url: `/api/users/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户信息
 * @param {string} id
 * @returns
 */

export const deleteUsersById = (id) => {
  return request({
    url: `/api/users/${id}`,
    method: 'delete'
  })
}
