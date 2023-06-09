import { CLASS_TOP_LEVEL, MODES } from './lib/constants';
import { handleBlurClick } from './lib/handleBlurClick';
import { handleFocusClick } from './lib/handleFocusClick';
import { handleModeChange } from './lib/handleModeChange';
import { setElementPosition } from './lib/setElementPosition';
import { setElementSize } from './lib/setElementSize';
import { setupDefaultElements } from './lib/setupDefaultElements';
import { setupDrag } from './lib/setupDrag';
import { setupPoints } from './lib/setupPoints';
import { resetToolbarActiveState, setupToolbar } from './lib/setupToolbar';

console.log('Docs Utilities: Activated!');
type ModeTypes = (typeof MODES)[number];

let mode: ModeTypes = MODES[0];

const initialise = () => {
  document.body.classList.add(CLASS_TOP_LEVEL);

  // "State"
  let focussedElement: HTMLElement | null = null;
  let topLevelElement: HTMLElement | null = null;

  // Add elements to DOM
  const { box } = setupDefaultElements();

  // Set initial position and size of focus area
  //get half of the viewport width and height
  const initialWidth = 200;
  const initialHeight = 150;
  const initialX = (window.innerWidth - initialWidth) / 2;
  const initialY = (window.innerHeight - initialHeight) / 2;
  setElementPosition({ element: box, x: initialX, y: initialY });
  setElementSize({ element: box, w: initialWidth, h: initialHeight });

  const handleModeChangeWrapper = (newMode: ModeTypes) => {
    mode = handleModeChange(newMode);
  };

  // Setup Toolbar
  setupToolbar({ onChange: handleModeChangeWrapper });

  // Setup drag and resize event handlers for the points
  setupPoints({ element: box });
  setupDrag({ element: box });

  // Handle dom element clicks
  const handleDocumentClick = (event: MouseEvent) => {
    if (mode === 'blur') {
      handleBlurClick(event);
    }

    if (mode === 'select') {
      let newElements = handleFocusClick({
        element: box,
        event,
        focussedElement,
        topLevelElement,
      });

      if (newElements) {
        focussedElement = newElements.newFocussedElement;
        topLevelElement = newElements.newTopLevelElement;
      }
    }
  };

  document.addEventListener('mousedown', handleDocumentClick);
};

const isInitialised = document.body.classList.contains(CLASS_TOP_LEVEL);
if (isInitialised) {
  console.log('Already initialised…');
  handleModeChange(MODES[0]);
  resetToolbarActiveState();
} else {
  initialise();
}
