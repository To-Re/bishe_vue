import request from '@/utils/request'

export function studentInfoDetail() {
    return request({
        url: '/api/student/info',
        method: 'get'
    })
}

export function updateStudentInfo(data) {
  return request({
    url: '/api/student/info/update',
    method: 'post',
    data
  })
}

export function getStudentExamDetail(data) {
  return request({
    url: '/api/student/exam/detail',
    method: 'get',
    params: data
  })
}

export function commitAnswer(data) {
  return request({
    url: '/api/student/exam/commit',
    method: 'post',
    data
  })
}