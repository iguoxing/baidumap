export function BMAPGL () {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      resolve(BMAPGL)
    }
    debugger
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'http://api.map.baidu.com/api?v=1.0&type=webgl&ak=jX6OoWt9FTLcmOMxbDIVokZYGch1QS03&callback=init'
    script.onerror = reject
    document.head.appendChild(script)
  })
}
