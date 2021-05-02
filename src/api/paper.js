import request from '@/utils/request'

export function getPaperList() {
  return request({
    url: '/api/teacher/paper/list',
    method: 'get'
  })
}

export function createPaper(data) {
  return request({
    url: '/api/teacher/paper/create',
    method: 'post',
    data
  })
}

export function paperDetail(data) {
  return request({
    url: '/api/teacher/paper/detail',
    method: 'get',
    params: data
  })
}

export function updatePaper(data) {
  return request({
    url: '/api/teacher/paper/update',
    method: 'post',
    data
  })
}

export function paperQuestionList(data) {
  return request({
    url: '/api/teacher/paper/question/list',
    method: 'get',
    params: data
  })
}

export function bindPaperQuestion(data) {
  return request({
    url: '/api/teacher/paper/question/bind',
    method: 'post',
    params: data
  })
}

export function deletePaperQuestion(data) {
  return request({
    url: '/api/teacher/paper/question/delete',
    method: 'post',
    params: data
  })
}