import React, { Component } from 'react'
import {Card, List, Icon} from 'antd'

import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import { IMG_BASE_URL } from '../../utils/constants'
import { reqProduct, reqCategory } from '../../api'

const Item = List.Item

/*
商品管理的详情子路由
*/
export default class ProductDetail extends Component {

  state = {
    product: {},
    categoryName: ''
  }

  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    if (result.status===0) {
      const categoryName = result.data.name
      this.setState({
        categoryName
      })
    }
  }

  componentWillMount () {
    // 从内存中读取product, 如果有才更新状态
    const product = memoryUtils.product
    if (product._id) {
      this.setState({
        product
      })
    }
  }

  async componentDidMount () {
    // 如果状态中的product没有数据, 根据param参数发请求获取
    if (!this.state.product._id) { // 没有商品对象
      const productId = this.props.match.params.id
      const result = await reqProduct(productId)
      if (result.status===0) {
        const product = result.data
        // 得到商品对象后获取分类显示
        this.getCategory(product.categoryId)
        this.setState({product})
      }
    } else {// 有商品对象
      const categoryId = this.state.product.categoryId
      this.getCategory(categoryId)
    }
  }

  render() {
    // 读取状态数据
    const { product, categoryName } = this.state

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="product-detail-left">商品名称:</span>
            <span>{ product.name }</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品描述:</span>
            <span>{ product.desc }</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品价格:</span>
            <span>{ product.price }元</span>
          </Item>
          <Item>
            <span className="product-detail-left">所属分类:</span>
            <span>{ categoryName }</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品图片:</span>
            <span>
              {
                product.imgs && product.imgs.map(img => (
                  <img className="product-detail-img" key={img} src={IMG_BASE_URL + img} alt="img"/>
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="product-detail-left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: product.detail }}>
            </span>
          </Item>

        </List>
      </Card>
    )
  }
}
