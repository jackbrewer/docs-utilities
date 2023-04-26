// Ensure these match the values in the CSS
// export const CLASS_BLUR = 'u-blur-selected';
export const CLASS_TOP_LEVEL = 'du-initialized';
export const CLASS_RESIZING = 'du--resizing';
export const CLASS_DRAGGING = 'du--dragging';

export const CLASS_BARRIER = 'du-barrier';

export const CLASS_BOX = 'du-box';
export const CLASS_BOX_GUIDE = 'du-box__guide';
export const CLASS_BOX_POINT = 'du-box__point';

export const CLASS_DRAG = 'du-box__drag';

export const CLASS_BLUR = 'du--blur-target';

export const CLASS_TOOLBAR = 'du-toolbar';
export const CLASS_TOOLBAR_BUTTON = 'du-toolbar__button';

// These elements filtered as invisible when clicked on
export const IGNORED_CLASSES = [CLASS_BOX, CLASS_BOX_GUIDE, CLASS_BARRIER];
// These elements cancel the filtering completely when clicked on
export const CANCEL_CLASSES = [
  CLASS_BOX_POINT,
  CLASS_TOOLBAR,
  CLASS_TOOLBAR_BUTTON,
  CLASS_DRAG,
];

export const MODES = ['select', 'manual', 'blur', 'close'] as const;

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
