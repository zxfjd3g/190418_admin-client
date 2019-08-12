/* 
应用根组件
*/
import React, {Component} from 'react'
import {HashRouter, BrowserRouter, Route, Switch} from 'react-router-dom'
import Admin from './pages/admin/admin.jsx'
import Login from './pages/login/login.jsx'


export default class App extends Component {


  render () {
    return (
      <BrowserRouter>
        <Switch>{/* 从前往后匹配, 一旦匹配停止向下, 默认用的模糊 */}
          <Route path="/login" component={Login}/>
          <Route path="/" component={Admin}/>
        </Switch>
      </BrowserRouter>
    )
  }
}