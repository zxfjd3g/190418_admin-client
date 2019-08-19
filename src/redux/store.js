/* 
redux最核心管理对象: store
  getState(): 读取状态数据
  dispatch(actioin): 更新状态数据
*/
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './reducer'

// 向外默认暴露一个store对象
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))