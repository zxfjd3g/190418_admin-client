import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Icon
} from 'antd'

import LinkButton from "../../components/link-button"
import { reqCategorys } from '../../api'

const Item = Form.Item
const Option = Select.Option


/*
商品管理的添加/修改子路由
*/
class ProductAddUpdate extends Component {

  state = {
    categorys: []
  }

  /* 
  异步获取所有分类数组显示
  */
  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status===0) {
      this.setState({
        categorys: result.data
      })
    }
  }

  /* 
  提交的响应回调
  */
  handleSubmit = (event) => {
    event.preventDefault()
    alert('点击提交')
  }

  componentDidMount () {
    this.getCategorys()
  }

  render() {

    const { categorys } = this.state
    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>添加商品</span>
      </span>
    )

    // 所有表单项的布局
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };


    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称" >
            {
              getFieldDecorator('name', {
                initialValue: '',
                rules: [
                  {required: true, message: '商品名称必须输入'}
                ]
              })(
                <Input type="text" placeholder="商品名称"></Input>
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品描述必须输入'}
                ]
              })(
                <Input type="text" placeholder="商品描述"></Input>
              )
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品价格必须输入'}
                ]
              })(
                <Input type="number" placeholder="商品价格" addonAfter="元"></Input>
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: '',
                rules: [
                  { required: true, message: '商品分类必须指定'}
                ]
              })(
                <Select>
                  <Option value="">未选择</Option>
                  {
                    categorys.map(c => <Option value={c._id} key={c._id}>{c.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)
