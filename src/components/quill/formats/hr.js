// 分割线
import { Quill } from 'react-quill';
let BlockEmbed = Quill.import('blots/block/embed');

class Hr extends BlockEmbed { }
Hr.blotName = 'Hr';
Hr.tagName = 'hr';

export default Hr