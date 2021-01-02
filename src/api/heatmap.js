import request from '@/utils/request'

export function selectJingqu () {
  let param = new URLSearchParams()
  return request({
    url: '/heatmap/selectJingqu',
    method: 'post',
    data: param
  })
}

export function selectJT () {
  let param = new URLSearchParams()
  return request({
    url: '/heatmap/selectJT',
    method: 'post',
    data: param
  })
}

export function selectGS () {
  let param = new URLSearchParams()
  return request({
    url: '/heatmap/selectGS',
    method: 'post',
    data: param
  })
}

export function selectCS () {
  let param = new URLSearchParams()
  return request({
    url: '/heatmap/selectCS',
    method: 'post',
    data: param
  })
}
