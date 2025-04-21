import request from '@/utils/request'

export const getRoutes = (roles) => {
  // console.log(roles)
  return request({
    url: `/api/user/routes?roles=${JSON.stringify(roles)}`,
    method: 'get'
  })
}
