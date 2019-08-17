import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'

import { formateDate } from "../../utils/dateUtils"
import LinkButton from '../../components/link-button'
import AddForm from './add-form'
import Auth from './auth'
import { reqRoles, reqAddRole } from '../../api'

/**
 * 角色管理
 */
export default class Role extends Component {
  state = {
    roles: [],
    isShowAdd: false,
    isShowAuth: false,
  }

  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        // render: create_time => formateDate(create_time)
        render: formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      },
      {
        title: '操作',
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
      },
    ]
  }

  showAuth = (role) => {
    this.role = role
    this.setState({
      isShowAuth: true
    })
  }

  getRoles = async () => {
    const result = await reqRoles()
    if (result.status===0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }

  addRole = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.form.resetFields()
        this.setState({
          isShowAdd: false
        })
        const { roleName } = values
        const result = await reqAddRole(roleName)
        if (result.status===0) {
          message.success('添加角色成功')
          this.getRoles()
        }
      }
    })
  }

  updateRole = () => {

  }

  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getRoles()
  }


  render() {
    const { roles, isShowAdd, isShowAuth } = this.state
    const title = <Button type="primary" onClick={() => this.setState({isShowAdd: true})}>创建角色</Button>

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
        />

        <Modal 
          visible={isShowAdd} 
          title="添加角色" 
          onOk={this.addRole}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ isShowAdd: false })
          }}
        >
          <AddForm setForm={(form) => this.form = form} />
        </Modal>

        <Modal 
          visible={isShowAuth} 
          title="设置角色权限" 
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          <Auth />
        </Modal>
      </Card>
    )
  }
}
