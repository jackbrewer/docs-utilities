import { setElementPosition } from './lib/setElementPosition';
import { setElementSize } from './lib/setElementSize';
import { setupDefaultElements } from './lib/setupDefaultElements';
import { setupPoints } from './lib/setupPoints';
import { handleFocusClick } from './lib/handleFocusClick';
import { CLASS_TOP_LEVEL } from './lib/constants';

console.log('Docs Utilities: Activated!');

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

  // Setup drag and resize event handlers for the points
  setupPoints({ element: box });

  // Handle dom element clicks
  const handleFocusClickWrapper = (event: MouseEvent) => {
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
  };

  document.addEventListener('mousedown', handleFocusClickWrapper);
};

const isInitialised = document.body.classList.contains(CLASS_TOP_LEVEL);
if (isInitialised) {
  console.log('Already initialised…');
} else {
  initialise();
}
