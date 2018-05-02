// 隐藏块
import { Quill } from 'react-quill';
import Delta from 'quill-delta';
import Parchment from 'parchment';

// let Delta = Quill.import('delta');
let Block = Quill.import('blots/block');
let TextBlot = Quill.import('blots/text');
let Container = Quill.import('blots/container');

class HiddenItem extends Block {
  static formats(domNode) {
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode);
  }
}
HiddenItem.blotName = 'hidden-item';
HiddenItem.tagName = 'section';

class Hidden extends Block {
  // static blotName = 'hidden-diy';
  // static className = 'hidden-block';
  // static scope = Parchment.Scope.BLOCK_BLOT;
  // static tagName = ['section', 'div'];
  // static defaultChild = 'hidden-item';
  // static allowedChildren = [HiddenItem];

  // Block 类的静态方法重写
  static create(value) {
    // console.log(value)
    let domNode = super.create(value);
    // console.log(domNode)
    return domNode;
  }
  static formats() {
    // console.log(arguments)
    return true;
  }
  
}
// es7 支持静态方法可以写在static
Hidden.blotName = 'hidden-diy';
// Hidden.scope = Parchment.Scope.BLOCK_BLOT;
Hidden.tagName = 'section';
Hidden.className = 'hidden-block';
// Hidden.defaultChild = 'hidden-item';
// Hidden.allowedChildren = [HiddenItem];

// export default Hidden;
export { HiddenItem, Hidden as default };
