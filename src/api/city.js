import request from '@/utils/request'

export function selectByPage (page, rows) {
  let param = new URLSearchParams()
  param.append('page', page)
  param.append('rows', rows)
  return request({
    url: '/cityIndex/selectByPage',
    method: 'post',
    data: param
  })
}

export function selectByCityCode (code) {
  let param = new URLSearchParams()
  param.append('code', code)
  return request({
    url: '/cityIndex/selectByCityCode',
    method: 'post',
    data: param
  })
}

export function selectCityPushByCityCode (code) {
  let param = new URLSearchParams()
  param.append('code', code)
  return request({
    url: '/cityIndex/selectCityPushByCityCode',
    method: 'post',
    data: param
  })
}

export function selectCityJBByCode (cood) {
  let param = new URLSearchParams()
  param.append('cood', cood)
  return request({
    url: '/CityJB/selectCityJBByCode',
    method: 'post',
    data: param
  })
}
