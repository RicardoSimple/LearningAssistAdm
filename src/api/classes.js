import request from '@/utils/request'

export const createClass = (data) => {
  return request({
    url: '/class/create',
    method: 'post',
    data
  })
}
export const deleteClass = (id) => {
  return request({
    url: `/class/delete?id=${id}`,
    method: 'post'
  })
}
export const getClasses = (page, pageSize) => {
  return request({
    url: `/class/list?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })
}
