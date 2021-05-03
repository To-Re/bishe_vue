import request from '@/utils/request'

export function getExamList() {
    return request({
      url: '/api/teacher/exam/list',
      method: 'get'
    })
  }