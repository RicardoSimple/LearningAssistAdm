import request from '@/utils/request'

export const getRoutes = (roles) => {
  console.log(roles)
  return request({
    url: `/user/routes?roles=[${JSON.stringify(roles)}]`,
    method: 'get'
  })
}
