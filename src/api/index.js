/* 
包含n个接口请求函数的模块, 每个函数的返回值都是promise对象
根据接口文档编写
*/
import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

/* 
1. 登陆
*/
/* export function reqLogin({username, password}) {
  return ajax.post('/login', {username, password})
} */
export const reqLogin = ({ username, password }) => ajax.post(BASE + '/login', { username, password })


/* 
2. 添加用户
*/
export const reqAddUser = (user) => ajax({
  url: BASE + '/manage/user/add',
  method: 'POST',
  data: user
})


/* 
获取天气信息(jsonp) 
*/
export const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  
  return new Promise((resolve, reject) => { // 执行器函数
    jsonp(url, {}, (err, data) => {
      if (!err && data.error === 0) {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // reject(err)
        message.error('获取天气信息失败!')
      }
    })
  })
  
}

/* 
获取所有商品分类的列表
*/
export const reqCategorys = () => ajax.get('/manage/category/list')
// export const reqCategorys = () => ajax({
//   method: 'GET',
//   url: '/manage/category/list'
// })
// export const reqCategorys = () => ajax('/manage/category/list')


/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

/* 
修改分类
*/
export const reqUpdateCategory = (categoryId, categoryName) => ajax.post('/manage/category/update', {
  categoryId, categoryName
})
