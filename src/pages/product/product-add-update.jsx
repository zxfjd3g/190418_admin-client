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
import PicturesWall from "./pictures-wall"
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

  constructor (props) {
    super(props)
    // 创建一个ref容器
    this.pwRef = React.createRef()
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
  检查价格
  */
  validatePrice = (rule, value, callback) => {
    if (value < 0) {
      callback('价格不能小于0')
    } else {
      callback()
    }
  }

  /* 
  提交的响应回调
  */
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields((error, values) => {
      if (!error) {
        const {name, desc, price, categoryId} = values
        console.log(name, desc, price, categoryId)

        // 得到所有上传图片文件名的数组
        const imgs = this.pwRef.current.getImgs()
        console.log('imgs', imgs)
      }
    })
  }

  componentDidMount () {
    this.getCategorys()
  }

  componentWillMount () {
    const product = this.props.location.state
    this.product = product || {} // 如果是添加保存的是{}
    this.isUpdate = !!this.product._id
  }

  render() {
    const { product, isUpdate } = this
    const { categorys } = this.state
    const { getFieldDecorator } = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>{isUpdate ? '更新' : '添加'}商品</span>
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
                initialValue: product.name,
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
                initialValue: product.desc,
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
                initialValue: product.price,
                rules: [
                  { required: true, message: '商品价格必须输入'},
                  {validator: this.validatePrice}
                ]
              })(
                <Input type="number" placeholder="商品价格" addonAfter="元"></Input>
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: product.categoryId,
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
          <Item label="商品图片" wrapperCol={{ span: 15}}>
            {/* 内部会将组件对象保存到ref容器对象: current: 组件对象 */}
            <PicturesWall ref={this.pwRef} imgs={product.imgs}/>
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
