import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { Menu, Icon } from 'antd'

import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

/* 
Admin的左侧导航组件
*/
class LeftNav extends Component {


  /* 
    判断当前登陆用户是否有对item的权限
  */
  hasAuth = (item) => {
    const user = memoryUtils.user
    const menus = user.role.menus
    /* 
    1. 如果当前是admin
    2. item是一个公开的
    3. item的key在当前用户对应的menus中
    */
    if (user.username === 'admin' || item.isPublic || menus.indexOf(item.key)!=-1) {
      return true
    } else if (item.children) {
      // 4. 某个子item的key在menus中
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key) != -1)
      return !!cItem
    }
    return false
  }

  /*
  根据菜单数据数组返回标签(Item/SubMenu)数组
    reduce() + 递归
  */
 getMenuNodes2 = (menuList) => {
   const path = this.props.location.pathname
   // [1, 2, 5, 10].reduce((pre, item) => pre + (item%2===0 ? item : 0), 0)
   return menuList.reduce((pre, item) => {

    if (this.hasAuth(item)) {
      // 向pre中添加<Item>
      if (!item.children) {
        pre.push(
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else {

        // 当前item的children中某个item的key与当前请求的path相同, 当前item的key就是openKey
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
        if (cItem) {
          // 保存openKey
          this.openKey = item.key
        }

        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes2(item.children)
            }
          </SubMenu>
        )
      }
    }
    
    // 向pre中添加<SubMenu>
    return pre
   }, [])
 }

  /* 
  根据菜单数据数组返回标签(Item/SubMenu)数组
    map() + 递归
  */
  getMenuNodes = (menuList) => {
    return menuList.map((item) => {
      // 返回<Item>
      if (!item.children) {
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else { // 返回<SubMenu>
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        )
      }
    })
  }

  /* 
  在第一次render()之前执行
    1). 同步操作
    2). 第一次render()就需要
  */
  componentWillMount () {
    this.menuNodes = this.getMenuNodes2(menuList)
  }

  /* 
  在第一次render()之后执行
    1). 异步操作(ajax请求, 启动定时器..)
    2). 第一次render()不用
  */
  componentDidMount () {

  }


  render() {
    // 得到请求的路由路径
    let path = this.props.location.pathname
    if (path.indexOf('/product/')===0) {
      path = '/product'
    }
   
    console.log('path', path, this.openKey) 

    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          theme="dark"
          mode="inline"
          /* defaultSelectedKeys={[path]} */ /* 只有第一次指定的有效 */
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

// 新组件会向LeftNav组件传递3个属性: history/location/match
export default withRouter(LeftNav)
