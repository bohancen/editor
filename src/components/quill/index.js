import React, { Component } from 'react'
import * as Quill from 'react-quill'; // Typescript
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
console.log(Quill)

class MyComponent extends Component {
   constructor(props) {
      super(props)
      this.state = { text: '' } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(value) {
      this.setState({ text: value })
   }
   
   tidyHtml(source) {
      return source
      // return html_beautify(source, {
      //    unformatted: [],
      //    preserve_newlines: false,
      // });
   }

   render() {
      return (
         <div>
            <ReactQuill 
               value={this.state.text}
               onChange={this.handleChange} 
            />
            <pre>
               {this.tidyHtml(this.state.text)}
            </pre>
         </div>
      )
   }
}

export default MyComponent