/* 
一个根据老的state和指定的action计算处理后返回一个新的state的函数模块
*/
import { combineReducers } from 'redux'
import { getUser } from '../utils/storageUtils'

import {
  SET_HEADER_TITLE,
  RECEIVE_USER,
  SHOW_MSG,
  RESET_USER
} from './action-types'

/* 
管理头部标题的reducer函数
*/
const initHeaderTitle = '首页'
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.headerTitle
    default:
      return state
  }
}

/* 
管理登陆用户的reducer函数
*/
const initUser = getUser() // 从storage中读取出user作为初始值
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    case SHOW_MSG:  // 在reducer中不要直接修改state数据, 而是要返回一个新的state数据
      return {...state, msg: action.data}
    case RESET_USER:
      return {msg: '请重新登陆'}
    default:
      return state
  }
}

/* 
返回是整合了多个子reducer的总reducer
function xxx(state, action) {} // state是总的state
总state的结构:
  {
    headerTitle: '首页',
    user: {username: 'tom',...}
  }
*/
export default combineReducers({
  headerTitle: headerTitle,
  user: user
})