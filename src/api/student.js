import request from '@/utils/request'

export function studentInfoDetail() {
    return request({
        url: '/api/student/info',
        method: 'get'
    })
}