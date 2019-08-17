import React, { Component } from 'react'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

export default class Auth extends Component {

  getTreeNodes = (menuList) => {
    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )      
    })
  }

  render() {

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }

    return (
      <div>
        <Item label="角色名称:" {...formItemLayout}>
          <Input value="test1" disabled></Input>
        </Item>

        <Tree
          checkable
          defaultExpandAll
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
