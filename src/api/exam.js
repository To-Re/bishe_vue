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

export function examDetail(data) {
  return request({
    url: '/api/teacher/exam/detail',
    method: 'get',
    params: data
  })
}

export function bindExamKlass(data) {
  return request({
    url: '/api/teacher/exam/klass/bind',
    method: 'post',
    data
  })
}

export function examKlassList(data) {
  return request({
    url: '/api/teacher/exam/klass/list',
    method: 'get',
    params: data
  })
}

export function deleteExamKlass(data) {
  return request({
    url: '/api/teacher/exam/klass/delete',
    method: 'post',
    data
  })
}

export function updateExam(data) {
  return request({
    url: '/api/teacher/exam/update',
    method: 'post',
    data
  })
}


export function getStudentExamList() {
  return request({
    url: '/api/student/exam/list',
    method: 'get'
  })
}