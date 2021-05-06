import request from '@/utils/request'

export function getResultList() {
  return request({
    url: '/api/teacher/result/list',
    method: 'get'
  })
}

export function getResultDetail(data) {
  return request({
    url: '/api/teacher/result/detail',
    method: 'get',
    params: data
  })
}
