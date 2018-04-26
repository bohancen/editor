// 引用块
import { Quill } from 'react-quill';
let Block = Quill.import('blots/block');

class QuoteBlot extends Block { }
QuoteBlot.blotName = 'blockquote';
QuoteBlot.tagName = 'blockquote';

export default QuoteBlot