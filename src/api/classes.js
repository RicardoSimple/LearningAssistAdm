import request from '@/utils/request'

export const createClass = (data) => {
  return request({
    url: '/class/create',
    method: 'post',
    data
  })
}
export const getClasses = (page, pageSize) => {
  return request({
    url: `/class/list?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })
}
