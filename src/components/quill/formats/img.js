import { Quill } from 'react-quill';
let BlockEmbed = Quill.import('blots/embed');

class ImageBlot2 extends BlockEmbed {
  static create(value) {
    let node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src')
    };
  }
}
ImageBlot2.blotName = 'image-diy';
ImageBlot2.tagName = ['img'];

// Quill.register(ImageBlot2);

export default ImageBlot2 