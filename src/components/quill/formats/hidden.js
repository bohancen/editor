// 隐藏块
import { Quill } from 'react-quill';
let Block = Quill.import('blots/block');

class Blockquote extends Block { }
Blockquote.blotName = 'hidden';
Blockquote.tagName = 'div';
Blockquote.className = 'hidden-block';


export default Blockquote;