import { CLASS_BLUR } from './constants';
import { filterStackedElements } from './filterStackedElements';

// Take the event from a click handler and get the stacked elements from the
// point of the click. Then filter out the elements we don’t want to select.
// Then check if the target element is already selected, if it is, remove
// the blur class, if it isn’t, add the blur class.

export const handleBlurClick = (event: MouseEvent) => {
  const stackedElements = document.elementsFromPoint(
    event.clientX,
    event.clientY
  ) as HTMLElement[];

  const targetElement = filterStackedElements({
    stackedElements,
  })[0];

  // Check if the target element is not already selected
  if (targetElement.classList.contains(CLASS_BLUR)) {
    targetElement.classList.remove(CLASS_BLUR);
  } else {
    targetElement.classList.add(CLASS_BLUR);
  }
};
