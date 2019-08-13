/* 
包含n个接口请求函数的模块, 每个函数的返回值都是promise对象
根据接口文档编写
*/
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