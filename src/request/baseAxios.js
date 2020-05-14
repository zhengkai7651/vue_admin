import axios from 'axios'
import Qs from 'qs'

const service = axios.create({
  baseURL: '/api',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  timeout: 6000,
})


service.interceptors.request.use(
  config => {
    config.data = Qs.stringify(config.data)
    if (config.method == 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000, //让每个请求都携带一个不同的时间参数，防止浏览器缓存不发送请求
        ...config.params
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)



export default service;  