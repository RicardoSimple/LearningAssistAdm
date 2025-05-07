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
export const getAllClass = () => {
  return request({
    url: '/class/all',
    method: 'get'
  })
}
export const bindClass = (data) => {
  return request({
    url: '/class/bind',
    method: 'post',
    data
  })
}
export const bindUserClass = (data) => {
  return request({
    url: '/class/user/bind',
    method: 'post',
    data
  })
}
export const getMyClass = () => {
  return request({
    url: '/class/my',
    method: 'get'
  })
}
export const getClassStudents = (classId) => {
  return request({
    url: `/class/my/students?classId=${classId}`,
    method: 'get'
  })
}
