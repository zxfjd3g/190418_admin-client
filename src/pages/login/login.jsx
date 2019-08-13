import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import { reqLogin } from '../../api'
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

    // const values = this.props.form.getFieldsValue()
    // const username = this.props.form.getFieldValue('username')
    // const password = this.props.form.getFieldValue('password')
    // console.log(values, username, password)

    // 进行表单的统一校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) { // 校验成功
        // alert('校验成功, 发送登陆的ajax请求')
        // try {} catch (error) {}
        const result = await reqLogin(values)
        if (result.status===0) { // 登陆请求成功
          // 得到user
          const user = result.data
          // 保存user

          // 跳转到admin  location/match/history
          this.props.history.replace('/')
        } else { // 登陆请求失败
          message.error(result.msg)
        }
      }
    })
  }

  /* 
  自定义验证校验密码
      1). 必须输入
      2). 必须大于等于4位
      3). 必须小于等于12位
      4). 必须是英文、数字或下划线组成
  */
  validatePwd = (rule,value, callback) => {
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    } else if (value.length<4) {
      callback('密码不能小于4位')
    } else if (value.length > 12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 通过校验
    }
  }
// alt + shift + R
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
              /*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
              */
                /* 声明式验证: 使用库写好的规则进行验证 */
              }
              {
                getFieldDecorator('username', { //配置对象: 属性名是一些特定名称   options
                  initialValue: 'admin', // 初始值
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入!' },
                    { min: 4, message: '用户名不能小于4位!' },
                    { max: 12, message: '用户名不能大于12位!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成!' },
                  ],
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
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [ // 自定义验证
                    { validator: this.validatePwd}
                  ]
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
/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */