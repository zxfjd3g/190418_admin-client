import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import { 
  reqProducts, 
  reqSearchProducts,
  reqUpdateProductStatus
} from "../../api"
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtils from '../../utils/memoryUtils';

const Option = Select.Option

/*
商品管理的默认首页子路由
*/
export default class ProductHome extends Component {

  state = {
    products: [], // 当前页的product数组
    total: 0, // product的部数量
    searchType: 'productName', // 搜索类型
    searchName: '', // 搜索的关键字
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
        // dataIndex: 'status',
        render: product => {
          let btnText = '下架'
          let text = '在售'
          if (product.status===2) {
            btnText = '上架'
            text = '已下架'
          } 

          const status = product.status===1 ? 2 : 1
          const productId = product._id

          return (
            <span>
              <Button type="primary" onClick={() => this.updateStatus(productId, status)}>{btnText}</Button>
              <span>{text}</span>
            </span>
          )
        }
      },

      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
            <LinkButton 
              onClick={() => {
                memoryUtils.product = product // 将product保存到内存
                this.props.history.push(`/product/detail/${product._id}`, product)
              }}
            >
              详情
            </LinkButton>
            <LinkButton>修改</LinkButton>
          </span>
        )
      }
    ]
  }

  /* 
  更新商品的状态
  */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateProductStatus(productId, status)
    if (result.status===0) {
      message.success('更新商品状态成功')
      this.getProducts(this.pageNum)
    }
  }

  /* 
  异步获取指定页码的商品列表显示
  */
  getProducts = async (pageNum) => {
    // 保存当前页码
    this.pageNum = pageNum

    const {searchName, searchType} = this.state
    let result
    if (!searchName) {
      result = await reqProducts(pageNum, PAGE_SIZE)
    } else {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
    }

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
    const { products, total, searchName, searchType } = this.state
    // Card的头部左侧
    const title = (
      <span>
        <Select 
          value={searchType} 
          style={{ width: 200 }} 
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          type="text" 
          style={{ width: 200, margin: '0 15px' }} 
          placeholder="关键字" 
          value={searchName}
          onChange={event => this.setState({ searchName: event.target.value })}
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    // Card的头部右侧
    const extra = (
      <Button type="primary" onClick={() => this.props.history.push('/product/addupdate')}>
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
            current: this.pageNum,
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
