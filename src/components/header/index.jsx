import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../link-button'
import { removeUser } from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuConfig from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import {reqWeather} from '../../api'

import './index.less'

/* 
Admin的左侧导航组件
*/
class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', 
    weather: ''
  }

  updateTime = () => {
    // 启动循环定时器, 每隔1s更新一下时间状态
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    }, 1000);
  }

  getWeather = async () => {
    const { dayPictureUrl, weather } = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  /* 
  得到当前请求对应的标题
  */
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuConfig.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  logout = () => {
    Modal.confirm({ // 配置对象
      title: '确认退出吗?',
      onOk: () => {
        // 删除保存的user数据
        removeUser()
        memoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  /* 
  异步获取天气信息显示
  */
  componentDidMount() {
    this.updateTime()
    this.getWeather()
  }

  render() {
    const { currentTime, dayPictureUrl, weather } = this.state
    const user = memoryUtils.user
    // 得到当前请求对应的标题
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username} </span>
          <LinkButton onClick={this.logout}>
            退出
          </LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{ title }</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
