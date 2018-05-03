// 分割线
import { Quill } from 'react-quill';
let BlockEmbed = Quill.import('blots/block/embed');

class Hr extends BlockEmbed {}
Hr.blotName = 'Hrblock';
Hr.tagName = 'DIV';
Hr.className = 'Hrblock';

export default Hr