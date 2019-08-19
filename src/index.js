/* 
入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import App from './App'
import './utils/memoryUtils'

ReactDOM.render((
  /* 向所有容器组件提供store */
  <Provider store={store}>
    < App />
  </Provider>
), document.getElementById('root'))

