import React, { Component } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import pretty from 'pretty';
import 'react-quill/dist/quill.snow.css';

import './style.css';
// import Bold from './formats/bold'
import Hidden from './formats/hidden'
import Hr from './formats/hr'
import Quote from './formats/quote'
import Video from './formats/video'

// Quill.register(Bold);
Quill.register(Hidden);
Quill.register(Hr);
Quill.register(Quote);
Quill.register(Video);

var toolbarOptions = [
  ['italic', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
];

class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = { text: '' } // You can also pass a Quill Delta here
    // this.formats = ['italic', 'underline'] // default formats
    this.handleChange = this.handleChange.bind(this)
    this.quillRef = null;
    this.reactQuillRef = null; // ReactQuill component
    window.insertText = this.insertText
    window.insertVideo = this.insertVideo

  }
  componentDidMount() {
    this.attachQuillRefs()
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate')
    this.attachQuillRefs()
  }
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  // 
  insertVideo = () => {
    let range = this.quillRef.getSelection(true);
    let url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0';
    this.quillRef.insertText(range.index, '\n', Quill.sources.USER);
    this.quillRef.insertEmbed(range.index + 1, 'insertVideo', url, Quill.sources.USER);
    this.quillRef.formatText(range.index + 1, 1, { height: '170', width: '400' });
    this.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
  }

  insertText = (boolean=true) => {
    console.log(boolean)
    // this.quillRef.insertText(0, 'Test', { bold: true });
    // this.quillRef.formatText(0, 4, 'bold', true); let range = quill.getSelection(true);
    // this.quillRef.undo() ???
    this.quillRef.format('hidden-block', boolean);

    // let range = this.quillRef.getSelection(true);
    // console.log(Quill.sources.USER)
    // this.quillRef.insertText(range.index, '\n', Quill.sources.USER);
    // this.quillRef.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
    // this.quillRef.setSelection(range.index + 2, Quill.sources.SILENT);
    // var range = this.quillRef.getSelection();
    // console.log(range)
    // this.quillRef.setContents([
    //       { insert: 'Hello ' },
    //       { insert: 'World!', attributes: { bold: true } },
    //       { insert: '\n' }
    // ]);
    // 内联媒体
    // this.quillRef.insertEmbed(range.index, 'image', 'http://p1.qhimgs4.com/dmfd/158_88_/t0171ea6adfcc333ffc.jpg?size=297x300');
    // let position = range ? range.index : 0;
    // this.quillRef.insertText(position, 'Hello, World! ')
    // this.quillRef.formatText(range.index, range.length, 'bold', true);
    // let {bold} = this.quillRef.getFormat();
    // this.quillRef.formatText(...Object.values(range),{
    //   'bold': !bold
    // });
    // 判断当前有哪些样式
    // var sty = this.quillRef.getFormat();
    // console.log(sty);
    // 插入链接
    // this.quillRef.insertText(position, 'Hello', 'link', 'https://world.com');
  }
  handleChange(value) {
    console.log(value)
    // value 是html
    this.setState({ text: value })
  }

  tidyHtml(source) {
    // return source
    return pretty(source);
  }

  render() {
    return (
      <div>
        <ReactQuill
          modules={
            { 'toolbar': toolbarOptions }
          }
          formats={this.formats} // the custom format is already registered
          ref={(el) => { this.reactQuillRef = el }}
          value={this.state.text}
          onChange={this.handleChange}
          // clipboard={
          //   { matchVisual: false }
          // }
        >
        </ReactQuill>
        <button onClick={() => this.insertText()}>insertText</button>
        <button onClick={() => this.insertVideo()}>insertVideo</button>
        <pre>
          {this.tidyHtml(this.state.text)}
        </pre>
      </div>
    )
  }
}

export default MyComponent