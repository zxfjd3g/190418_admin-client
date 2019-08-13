import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

/* 
后台管理路由组件
*/
export default class Admin extends Component {
  render() {
    const user = memoryUtils.user

    // 如果当前用户没有登陆, 自动跳转到login
    if (!user._id) {
      // 在render()中自动跳转
      return <Redirect to="/login" />
      // 在事件回调函数中自动跳转: history.push()
    }

    return (
      <div>
        Hello {user.username}
      </div>
    )
  }
}
