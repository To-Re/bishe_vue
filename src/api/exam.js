import request from '@/utils/request'

export function getExamList() {
  return request({
    url: '/api/teacher/exam/list',
    method: 'get'
  })
}

export function createExam(data) {
  return request({
    url: '/api/teacher/exam/create',
    method: 'post',
    data
  })
}