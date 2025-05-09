import request from '@/utils/request'

export const getAssignments = (data) => {
  return request({
    url: '/assignment/list',
    method: 'get',
    data
  })
}

export const createAssignment = (data) => {
  return request({
    url: '/assignment/create',
    method: 'post',
    data
  })
}

export const getMyAssignments = (page, pageSize) => {
  return request({
    url: `/assignment/my?page=${page}&pageSize=${pageSize}`,
    method: 'get'
  })
}
export const deleteAssignment = (id) => {
  return request({
    url: `/assignment/delete/${id}`,
    method: 'post'
  })
}
export const getSubmissions = (page, pageSize, assignment_id) => {
  return request({
    url: `/assignment/submissions?page=${page}&pageSize=${pageSize}&assignment_id=${assignment_id}`,
    method: 'get'
  })
}

export const evaluateSubmission = (data) => {
  return request({
    url: '/assignment/evaluate',
    method: 'post',
    data
  })
}

export const SmartEvaluateSubmission = (data) => {
  return request({
    url: '/assignment/algo/evaluate',
    method: 'post',
    data
  })
}
