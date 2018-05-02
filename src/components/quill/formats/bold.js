import { Quill } from 'react-quill';
let Inline = Quill.import('blots/inline');

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold-diy';
// BoldBlot.tagName = 'font';
BoldBlot.tagName = 'b';
BoldBlot.className = 'inline-style-bold';

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic-diy';
// ItalicBlot.tagName = 'font';
ItalicBlot.tagName = 'i';
ItalicBlot.className = 'inline-style-italic';

class StrikeBlot extends Inline { }
StrikeBlot.blotName = 'strike-diy';
StrikeBlot.tagName = 'font';
StrikeBlot.className = 'inline-style-strike';

export { BoldBlot, ItalicBlot, StrikeBlot}