import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Menu, Icon } from 'antd'

import logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu, Item } = Menu

/* 
Admin的左侧导航组件
*/
export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <Link to="/home" className="left-nav-header">
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          theme="dark"
          mode="inline"
        >
          <Item key="/home">
            <Link to="/home">
              <Icon type="pie-chart" />
              <span>首页</span>
            </Link>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Item key="/category">
              <Link to="/category">
                <Icon type="pie-chart" />
                <span>品类管理</span>
              </Link>
            </Item>
            <Item key="/product">
              <Link to="/product">
                <Icon type="pie-chart" />
                <span>商品管理</span>
              </Link>
            </Item>
          </SubMenu>
         
        </Menu>
      </div>
    )
  }
}
