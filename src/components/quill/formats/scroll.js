// 隐藏块
import { Quill } from 'react-quill';

let Scroll = Quill.import('blots/scroll');
let Block, { BlockEmbed} = Quill.import('blots/block');
let Container = Quill.import('blots/container');

class ScrollBlock extends Scroll {
  
}
ScrollBlock.blotName = 'ScrollBlock';
ScrollBlock.className = 'ScrollBlock';
ScrollBlock.tagName = 'DIV';
ScrollBlock.defaultChild = 'block';
ScrollBlock.allowedChildren = [Block, BlockEmbed, Container];

export default ScrollBlock
