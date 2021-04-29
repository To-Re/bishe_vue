import request from '@/utils/request'

export function getKlassList() {
  return request({
    url: '/api/teacher/klass/list',
    method: 'get'
  })
}

export function createKlass(data) {
  return request({
    url: '/api/teacher/klass/create',
    method: 'post',
    data
  })
}

export function updateKlass(data) {
  return request({
    url: '/api/teacher/klass/update',
    method: 'post',
    data
  })
}