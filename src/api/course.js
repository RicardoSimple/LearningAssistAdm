import request from '@/utils/request'

export const createSubject = (data) => {
  return request({
    url: '/course/subject/create',
    method: 'post',
    data
  })
}

export const createCourse = (data) => {
  return request({
    url: '/course/create',
    method: 'post',
    data
  })
}

export const deleteCourse = (id) => {
  return request({
    url: `/course/delete?id=${id}`,
    method: 'post'
  })
}

export const getCourses = (page, pageSize) => {
  return request({
    url: `/course/get?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export const getSubjects = () => {
  return request({
    url: '/course/subject/getAll',
    method: 'get'
  })
}
