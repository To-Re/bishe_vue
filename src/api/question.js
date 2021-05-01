import request from '@/utils/request'

export function getQuestionList() {
  return request({
    url: '/api/teacher/question/list',
    method: 'get'
  })
}