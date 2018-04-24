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
      let position = range ? range.index : 0;
      this.quillRef.insertText(position, 'Hello, World! ')
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