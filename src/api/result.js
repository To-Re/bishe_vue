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

export function getStudentResultPaperDetail(data) {
  return request({
    url: '/api/student/result/paper/detail',
    method: 'get',
    params: data
  })
}