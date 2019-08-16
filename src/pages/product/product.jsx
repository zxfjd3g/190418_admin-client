import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './product-home'
import ProductDetail from './product-detail'
import ProductAddUpdate from './product-add-update'

import './product.less'

/**
 * 商品管理
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact/>
        <Route path="/product/detail/:id" component={ProductDetail}/>
        <Route path="/product/addupdate" component={ProductAddUpdate}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}
