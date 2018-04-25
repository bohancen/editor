import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import pretty from 'pretty';
import 'react-quill/dist/quill.snow.css';

var toolbarOptions = [
   ['bold', 'italic', 'strike'],        // toggled buttons
   ['blockquote', 'code-block'],
   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
   ['link', 'image', 'video'],
   ['clean']                                         // remove formatting button
];

class MyComponent extends Component {
   constructor(props) {
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
      this.quillRef = null; 
      this.reactQuillRef = null; // ReactQuill component
      window.insertText = this.insertText.bind(this)
   }
   componentDidMount() {
      console.log(this)
      this.attachQuillRefs()
   }
   componentDidUpdate() {
      this.attachQuillRefs()
   }
   attachQuillRefs = () => {
      if (typeof this.reactQuillRef.getEditor !== 'function') return;
      this.quillRef = this.reactQuillRef.getEditor();
   }
   insertText = () => {
      var range = this.quillRef.getSelection();
      console.log(range)
      this.quillRef.setContents([
            { insert: 'Hello ' },
            { insert: 'World!', attributes: { bold: true } },
            { insert: '\n' }
      ]);
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
                  {'toolbar': toolbarOptions}
               }
               ref={(el) => { this.reactQuillRef = el }}
               value={this.state.text}
               onChange={this.handleChange} 
               clipboard={
                     {matchVisual: false}
               }
                  />
            <button onClick={this.insertText}>insertText</button>
            <pre>
               {this.tidyHtml(this.state.text)}
            </pre>
         </div>
      )
   }
}

export default MyComponent