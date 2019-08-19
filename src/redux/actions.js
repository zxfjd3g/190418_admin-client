/* 
包含n个用于创建action的工厂函数(action creator)
同步action: 是一个对象, {type: xxx, data: 数据}
异步action: 是一个函数, dispatch => {1. 发异步ajax请求, 2. 根据结果分发同步action}
*/
import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_MSG
} from './action-types'
import { reqLogin } from '../api'

/* 
设置头部标题的同步action
*/
export const setHeaderTitle = (headerTitle) => ({type: SET_HEADER_TITLE, headerTitle})

/* 
接收登陆成功的用户
*/
export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

/* 
显示登陆失败错误信息
*/
export const showMsg = (msg) => ({type: SHOW_MSG, data: msg})


/* 
登陆的异步action
*/
export function login(username, password) {
  return async dispatch => {
    //1. 发异步ajax请求
    const result = await reqLogin({username, password})
    // 2. 根据结果分发同步action
    if (result.status===0) { // 登陆成功
      const user = result.data
      dispatch(receiveUser(user))
    } else { // 登陆失败
      const msg = result.msg
      dispatch(showMsg(msg))
    }
  }
}