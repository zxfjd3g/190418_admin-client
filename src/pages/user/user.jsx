import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
} from 'antd'

import LinkButton from '../../components/link-button'
import UserForm from './user-form'
import {
  reqUsers,
  reqAddOrUpdateUser,
  reqDeleteUser
} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from "../../utils/constants";

/*
后台管理的用户管理路由组件
 */
export default class User extends Component {

  state = {
    isShow: false, // 是否显示对话框
    users: [], // 所有用户的列表
    roles: [], // 所有角色的列表
  }

  /*
  初始化Table的字段列表
   */
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: role_id => this.state.roles.find(role => role._id===role_id).name
        // render: role_id => this.rolesObj[role_id].name
        render: role_id => this.rolesObj[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            &nbsp;&nbsp;
            <LinkButton onClick={() => this.clickDelete(user)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }


  /*
  根据角色的数组生成一个包含所有角色名的对象容器
  */
  initRolesObj = (roles) => {
    this.rolesObj = roles.reduce((pre, role) => {
      // pre[role._id] = role
      pre[role._id] = role.name
      return pre
    }, {})
  }

  /*
  响应点击删除用户
   */
  clickDelete = (user) => {
    Modal.confirm({
      content: `确定删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          this.getUsers()
        }
      }
    })
  }

  /*
  显示修改用户的界面
   */
  showUpdate = (user) => {
    // 保存user
    this.user = user
    this.setState({
      isShow: true
    })
  }

  /*
  异步获取所有用户列表
   */
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data
      // 根据roles的数组生成roles的对象容器
      this.initRolesObj(roles)

      this.setState({
        users,
        roles
      })
    }
  }


  /*
  显示添加用户的界面
   */
  showAddUser = () => {
    this.user = null
    this.setState({
      isShow: true
    })
  }

  /*
  添加/更新用户
   */
  AddOrUpdateUser = async () => {
    // 获取表单数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    if (this.user) {
      user._id = this.user._id
    }
    this.setState({
      isShow: false
    })

    const result = await reqAddOrUpdateUser(user)
    if (result.status === 0) {
      this.getUsers()
    }

  }

  componentWillMount() {
    this.initColumns()
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {

    const { users, roles, isShow } = this.state
    const user = this.user || {}

    const title = <Button type="primary" onClick={this.showAddUser}>创建用户</Button>

    return (
      <div>
        <Card title={title}>
          <Table
            columns={this.columns}
            rowKey='_id'
            dataSource={users}
            bordered
            pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
          />
          <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onCancel={() => this.setState({ isShow: false })}
            onOk={this.AddOrUpdateUser}
          >
            <UserForm
              setForm={(form) => this.form = form}
              user={user}
              roles={roles}
            />
          </Modal>
        </Card>
      </div>
    )
  }
}


/* 

2个引用变量指向同一个对象
1). 通过一个引用变量改变对象内部的数据  ==> 另一个引用变量也看得见
2). 将一个引用变量指向一个新的对象  ==>  另一个引用变量看到还是原来对象(它内部没有变化)
var a = {m: 1}
var b = a

// a.m = 2  // b.m  2
// a = {m: 3}  // b.m 1

function fn (a) {
  // a.m = 4
  a = {m: 5}
}
fn(a)  // b.m

var x = {}
function fn2 (x) {

  x = 3
}
fn2(x)


*/