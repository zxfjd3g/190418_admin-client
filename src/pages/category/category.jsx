import React, { Component } from 'react'
import { Card, Button, Icon, Table, Modal, message } from 'antd'

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import LinkButton from '../../components/link-button'
import CategoryForm from './category-form'

/**
 * 分类管理
 */
export default class Category extends Component {

  state = {
    categorys: [],
    loading: false,
    showStatus: 0, // 0: 都不显示, 1: 显示添加, 2: 显示修改
  }

  /* 
  异步获取所有分类列表显示
  */
  getCategorys = async () => {
    // 显示loading
    this.setState({
      loading: true
    })

    const result = await reqCategorys()

    // 隐藏loading
    this.setState({
      loading: false
    })

    if (result.status===0) {
      const categorys  = result.data
      this.setState({
        categorys
      })
    }
  }

  /* 
    初始化Table所有列的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        // render: (name) => name.toUpperCase()
      },
      {
        width: 300,
        title: '操作',
        render: (category) => ( // 渲染当前行时会自动传入当前行对应的数据对象
          <LinkButton 
            onClick={() => this.showUpdate(category)}
          >
            修改分类
          </LinkButton>
        )
      }
    ]
  }

  /* 
    更新分类
  */
  updateCateogory = () => {
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框的值(变为初始值)
        this.form.resetFields()

        // 隐藏添加界面
        this.setState({
          showStatus: 0
        })

        const categoryId = this.category._id
        const categoryName = values.categoryName
        const result = await reqUpdateCategory(categoryId, categoryName)
        if (result.status===0) {
          message.success('修改分类成功')
          // 显示最新列表
          this.getCategorys()
        } else {
          message.error('修改失败: ' + result.msg)
        }
      }
    })
    
  }

  /* 
    添加分类
    父组件想得到子组件的一个数据(form): 子组件向父组件通信 ==> 函数类型的props
  */
  addCategory = () => {
    // 1. 进行表单验证
    this.form.validateFields(async (error, values) => {
      if (!error) { // 验证通过了

        // 重置输入框的值(变为初始值)
        this.form.resetFields()

        // 隐藏添加界面
        this.setState({
          showStatus: 0
        })

        // 2. 收集数据
        const categoryName = values.categoryName

        // 3. 发请求添加
        const result = await reqAddCategory(categoryName)
        // 4. 根据请求结果做不同处理
        if (result.status===0) {
          message.success('添加分类成功')
          // 显示最新列表
          this.getCategorys()
        } else {
          message.error('添加失败: ' + result.msg)
        }
      }
    })

    
  }

  /* 
  隐藏对话框
  */
  handleCancel = () => {
    // 重置输入数据
    this.form.resetFields()
    // 隐藏对话框
    this.setState({
      showStatus: 0
    })
  }

  /* 
  显示添加界面
  */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /* 
  显示修改界面
  */
  showUpdate = (category) => {
    // 保存category
    this.category = category

    // 显示修改界面
    this.setState({
      showStatus: 2
    })
  }

  /* 
  接收form并保存的函数
  */
  setForm = (form) => {
    this.form = form
  }



  componentWillMount () {
    this.initColumns()
  }

  componentDidMount () {
    this.getCategorys()
  }

  render() {

    // 取出状态数据
    const { categorys, loading, showStatus } = this.state
    // 取出当前需要修改的分类
    const category = this.category || {} // 避免初始render时报错

    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"/>
        添加
      </Button>
    )

    return (
      <Card extra={extra}>
        <Table 
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={categorys} 
          columns={this.columns} 
          pagination={{ pageSize: 5, showQuickJumper: true}}
        />

        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.updateCateogory}
          onCancel={this.handleCancel}
        >
          <CategoryForm categoryName={category.name} setForm={this.setForm}/>
        </Modal>

        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm setForm={this.setForm}/>
        </Modal>
      </Card>
    )
  }
}
