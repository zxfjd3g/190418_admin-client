import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import './login.less'
import logo from './images/logo.png'

const Item = Form.Item
/* 
登陆路由组件
*/
class Login extends Component {

  handleSubmit = e => {
    // 阻止事件默认行为(提交表单)
    e.preventDefault()

    const values = this.props.form.getFieldsValue()
    const username = this.props.form.getFieldValue('username')
    const pwd = this.props.form.getFieldValue('pwd')
    console.log(values, username, pwd)

    alert('发送登陆的ajax请求')
  }

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>

              {
                getFieldDecorator('username', { //配置对象: 属性名是一些特定名称   options
                  // rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('pwd', {

                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登  陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


const WrappedLoginForm = Form.create()(Login)   // 组件名: 'Form(Login)'

export default WrappedLoginForm

/* 
实例对象: 简称对象
函数对象: 将函数作为对象使用
方法: 是特别的属性, 属性值是函数
一般属性: 属性值不是函数的属性
form组件: 组件中渲染了<Form> 
class WrappedLoginForm extends Component {

  render () {

    return <Login form={强大对象}></Login>
  }
}
*/

class A extends Component {

  render () {

    return <div><B></B></div>
  }
}

class B extends Component {

  render() {

    return <div>B</div>
  }
}