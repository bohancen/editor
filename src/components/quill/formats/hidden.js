// 隐藏块
import { Quill } from 'react-quill';
import Delta from 'quill-delta';
import Parchment from 'parchment';
console.log(Quill)
// let Parchment = Quill.import('Parchment');

// let Delta = Quill.import('delta');
let Block = Quill.import('blots/block');
let Break = Quill.import('blots/break');
let Inline = Quill.import('blots/inline');
let TextBlot = Quill.import('blots/text');
let Container = Quill.import('blots/container');
let Embed = Quill.import('blots/embed');

class HiddenItem extends Block {
  static formats(domNode) {
    return domNode.tagName === this.tagName ? undefined : super.formats(domNode);
  }

  format(name, value) {
    if (name === Hidden.blotName && !value) {
      this.replaceWith(Parchment.create(this.statics.scope));
    } else {
      super.format(name, value);
    }
  }

  remove() {
    if (this.prev == null && this.next == null) {
      this.parent.remove();
    } else {
      super.remove();
    }
  }

  replaceWith(name, value) {
    this.parent.isolate(this.offset(this.parent), this.length());
    if (name === this.parent.statics.blotName) {
      this.parent.replaceWith(name, value);
      return this;
    } else {
      this.parent.unwrap();
      return super.replaceWith(name, value);
    }
  }
}
HiddenItem.blotName = 'hidden-item';
HiddenItem.tagName = 'article';

class Hidden extends Block {
  static create(value) {
    let node = super.create(value);
    return node;
  }

  // 获取formats 类型  几种 bullet ordered unchecked checked false
  static formats(domNode) {
    if (domNode.tagName === 'OL') return 'ordered';
    if (domNode.tagName === 'UL') {
      if (domNode.hasAttribute('data-checked')) {
        return domNode.getAttribute('data-checked') === 'true' ? 'checked' : 'unchecked';
      } else {
        return 'bullet';
      }
    }
    return undefined;
  }

  constructor(domNode) {
    super(domNode);
  }

  format(name, value) {
    if (this.children.length > 0) {
      this.children.tail.format(name, value);
    }
  }

  formats() {
    // We don't inherit from FormatBlot
    return { [this.statics.blotName]: this.statics.formats(this.domNode) };
  }

  insertBefore(blot, ref) {
    if (blot instanceof HiddenItem) {
      super.insertBefore(blot, ref);
    } else {
      let index = ref == null ? this.length() : ref.offset(this);
      let after = this.split(index);
      console.log(after)
      if (after){

        after.parent.insertBefore(blot, after);
      }
    }
  }

  optimize(context) {
    super.optimize(context);
    let next = this.next;
    if (next != null && next.prev === this &&
      next.statics.blotName === this.statics.blotName &&
      next.domNode.tagName === this.domNode.tagName &&
      next.domNode.getAttribute('data-checked') === this.domNode.getAttribute('data-checked')) {
      next.moveChildren(this);
      next.remove();
    }
  }

  replace(target) {
    if (target.statics.blotName !== this.statics.blotName) {
      console.log(this.statics.defaultChild)
      let item = Parchment.create(this.statics.defaultChild);
      target.moveChildren(item);
      this.appendChild(item);
    }
    super.replace(target);
  } 
}
// es7 支持静态方法可以写在static
Hidden.blotName = 'hidden-diy';
Hidden.scope = Parchment.Scope.BLOCK_BLOT;
Hidden.tagName = 'section';
Hidden.defaultChild = 'hidden-item';
Hidden.className = 'hidden-block';
Hidden.allowedChildren = [HiddenItem];
// Hidden.allowedChildren = [HiddenItem];
// Hidden.defaultChild = 'break';
// Hidden.defaultChild = 'hidden-item';
// Hidden.allowedChildren = [HiddenItem];

export { HiddenItem, Hidden as default };
