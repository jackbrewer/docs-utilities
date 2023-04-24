// Ensure these match the values in the CSS
// export const CLASS_BLUR = 'u-blur-selected';
export const CLASS_TOP_LEVEL = '📜-docs-utilities';
export const CLASS_RESIZING = 'docs-utilities--resizing';
export const CLASS_DRAGGING = 'docs-utilities--dragging';

export const CLASS_BARRIER = 'u-barrier';

export const CLASS_BOX = 'box';
export const CLASS_BOX_GUIDE = 'box__guide';
export const CLASS_BOX_POINT = 'box__point';

// These elements filtered as invisible when clicked on
export const IGNORED_CLASSES = [CLASS_BOX, CLASS_BOX_GUIDE, CLASS_BARRIER];
// These elements cancel the filtering completely when clicked on
export const CANCEL_CLASSES = [CLASS_BOX_POINT];

export const FOCUS_SPACING = 12;

export const IGNORED_ELEMENTS = [
  // Top-level elements
  'BODY',
  'HTML',
  // Common SVG content
  'PATH',
  'LINE',
  'POLYGON',
  'CIRCLE',
  'RECT',
  'ELLIPSE',
  'G',
  'TEXT',
];
