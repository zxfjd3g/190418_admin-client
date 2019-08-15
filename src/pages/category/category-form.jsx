import React, { Component } from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

const {Item} = Form

/* 
分类添加/修改的表单组件
*/
class CategoryForm extends Component {

  // 类(函数)对象: CategoryForm.propTypes
  static propTypes = {
    categoryName: PropTypes.string
  }
  // CategoryForm的实例
  // xxx = 2

  render() {
    const { categoryName } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName || '',
              rules: [
                { required: true, message: '分类名称是必须的' }
              ]
            })(
              <Input type="text" placeholder="分类名称"/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(CategoryForm)
