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