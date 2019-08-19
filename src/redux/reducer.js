/* 
一个根据老的state和指定的action计算处理后返回一个新的state的函数模块
*/
import { combineReducers } from 'redux'
import { getUser } from '../utils/storageUtils'

/* 
管理头部标题的reducer函数
*/
const initHeaderTitle = '首页'
function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
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