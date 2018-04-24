import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import pretty from 'pretty';
import 'react-quill/dist/quill.snow.css';

console.log(pretty)

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
      // return source
      return pretty(source);
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