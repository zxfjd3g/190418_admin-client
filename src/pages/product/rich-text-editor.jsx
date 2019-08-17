import React, { Component } from 'react'
import { message } from 'antd'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

/*
用来指定商品详情信息的富文本编程器组件
 */
export default class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  constructor(props) {
    super(props)
    // 根据传入的html文本初始显示
    const detail = this.props.detail
    let editorState
    if (detail) { // 如果传入才需要做处理
      const blocksFromHtml = htmlToDraft(detail)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      editorState = EditorState.createWithContent(contentState)
    } else {
      editorState = EditorState.createEmpty()
    }
    // 初始化状态
    this.state = {
      editorState
    }
  }

  /*
  当输入改变时立即保存状态数据
   */
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  /*
  得到输入的富文本数据
   */
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText); // {status: 0, data: {url: 'img'}}
          resolve(response);
        });
        xhr.addEventListener('error', () => {
          message.error('上传图片失败')
        });
      }
    );
  }

  render() {
    const { editorState } = this.state

    return (
      <Editor
        editorState={editorState}
        editorStyle={{ height: 250, border: '1px solid #000', padding: '0 30px' }}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    )
  }
}
