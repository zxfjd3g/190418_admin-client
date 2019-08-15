import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'

import LinkButton from '../../components/link-button'
import { reqProducts } from "../../api"
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

/*
商品管理的默认首页子路由
*/
export default class ProductHome extends Component {

  state = {
    products: [], // 当前页的product数组
    total: 0, // product的部数量
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: price => `¥${price}`
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'status',
        render: status => {
          if (status===1) {
            return (
              <span>
                <Button type="primary">下架</Button>
                <span>在售</span>
              </span>
            )
          } else {
            return (
              <span>
                <Button type="primary">上架</Button>
                <span>已下架</span>
              </span>
            )
          }
        }
      },

      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
            <LinkButton>详情</LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  /* 
  异步获取指定页码的商品列表显示
  */
  getProducts = async (pageNum) => {
    const result = await reqProducts(pageNum, PAGE_SIZE)
    if (result.status===0) {
      const {total, list} = result.data
      this.setState({
        total,
        products: list,
      })
    }
  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getProducts(1)
  }

  render() {
    // 读取状态数据
    const { products, total } = this.state
    // Card的头部左侧
    const title = (
      <span>
        <Select value="2" style={{ width: 200}}>
          <Option value="1">按名称搜索</Option>
          <Option value="2">按描述搜索</Option>
        </Select>
        <Input type="text" style={{ width: 200, margin: '0 15px'}} placeholder="关键字"></Input>
        <Button type="primary">搜索</Button>
      </span>
    )

    // Card的头部右侧
    const extra = (
      <Button type="primary">
        <Icon type="plus"></Icon>
        添加商品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            pageSize: PAGE_SIZE, 
            total,
            /* onChange: (page) => {this.getProducts(page)} */
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}
