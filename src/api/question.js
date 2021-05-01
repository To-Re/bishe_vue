import request from '@/utils/request'

export function getQuestionList() {
  return request({
    url: '/api/teacher/question/list',
    method: 'get'
  })
}

export function createQuestion(data) {
  return request({
    url: '/api/teacher/question/create',
    method: 'post',
    data
  })
}