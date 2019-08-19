import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

export default class Auth extends PureComponent {

  static propTypes = {
    role: PropTypes.object
  }

  state = {
    checkedKeys: []
  }

  getMenus = () => {
    return this.state.checkedKeys
  }

  getTreeNodes = (menuList) => {
    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )      
    })
  }

  /* 
  当用户改变某个treeNode的勾选状态时自动调用
  */
  handleCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }

  /* 
 第一次render前调用, 后面再打开显示时不会再调用
 */
  componentWillMount() {
    const menus = this.props.role.menus
    this.setState({ checkedKeys: menus })
  }

  /* 
  组件将要接收到新的props
  */
  componentWillReceiveProps(nextProps) {
    // 读取最新传入的role, 更新checkedKeys状态
    const menus = nextProps.role.menus
    this.setState({ checkedKeys: menus })
  }

  render() {
    console.log('auth render()')

    const {name} = this.props.role
    const { checkedKeys } = this.state

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }

    return (
      <div>
        <Item label="角色名称:" {...formItemLayout}>
          <Input disabled value={name}></Input>
        </Item>

        <Tree
          checkable
          defaultExpandAll
          onCheck={this.handleCheck}
          checkedKeys={checkedKeys}
        >
          <TreeNode title="平台权限" key="0-0">
            {
              this.getTreeNodes(menuList)
            }

            {/* <TreeNode title="parent 1-0" key="0-0-0" >
              <TreeNode title="leaf" key="0-0-0-0" />
              <TreeNode title="leaf" key="0-0-0-1" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
              <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
            </TreeNode> */}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
