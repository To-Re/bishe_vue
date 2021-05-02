import request from '@/utils/request'

export function getPaperList() {
  return request({
    url: '/api/teacher/paper/list',
    method: 'get'
  })
}
