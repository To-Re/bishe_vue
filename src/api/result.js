import request from '@/utils/request'

export function getResultList() {
  return request({
    url: '/api/teacher/result/list',
    method: 'get'
  })
}