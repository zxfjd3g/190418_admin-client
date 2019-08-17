import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Select,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

/*
用来添加或更新的form组件
 */
class UserForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object,
    roles: PropTypes.array
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 }
    }

    const { user, roles } = this.props
    return (
      <Form {...formItemLayout}>
        <FormItem label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: user.username
            })(
              <Input type="text" placeholder="请输入用户名" />
            )
          }
        </FormItem>

        {
          !user._id ?
            (
              <FormItem label="密码">
                {
                  getFieldDecorator('password', {
                    initialValue: ''
                  })(
                    <Input type="password" placeholder="请输入密码" />
                  )
                }
              </FormItem>
            ) : null
        }



        <FormItem label="手机号">
          {
            getFieldDecorator('phone', {
              initialValue: user.phone
            })(
              <Input type="phone" placeholder="请输入手机号" />
            )
          }
        </FormItem>

        <FormItem label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: user.email
            })(
              <Input type="email" placeholder="请输入邮箱" />
            )
          }
        </FormItem>

        <FormItem label="角色">
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
              rules: [
                {required: true, message: '必须指定角色'}
              ]
            })(
              <Select style={{ width: 200 }} placeholder='请选择角色'>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(UserForm)