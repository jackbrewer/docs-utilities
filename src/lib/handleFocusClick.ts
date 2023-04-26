import { CANCEL_CLASSES, FOCUS_SPACING } from './constants';
import { filterStackedElements } from './filterStackedElements';
import { getSelectionIndex } from './getSelectionIndex';

type HandleFocusClickArgs = {
  element: HTMLElement;
  event: MouseEvent;
  focussedElement: HTMLElement | null;
  topLevelElement: HTMLElement | null;
};

export const handleFocusClick = ({
  element,
  event,
  focussedElement,
  topLevelElement,
}: HandleFocusClickArgs) => {
  const stackedElements = document.elementsFromPoint(
    event.clientX,
    event.clientY
  ) as HTMLElement[];

  // If the clicked element is in the cancelClickClasses array, return
  if (
    stackedElements.some((el) =>
      CANCEL_CLASSES.some((className) => el.classList.contains(className))
    )
  ) {
    return;
  }

  const possibleElements = filterStackedElements({
    stackedElements,
  });

  const selectedElementIndex = focussedElement
    ? possibleElements.indexOf(focussedElement)
    : -1;
  const isNewTopLevelElement = possibleElements[0] !== topLevelElement;

  // Is the shift button pressed?
  const isShiftPressed = event.shiftKey;

  const targetElement =
    possibleElements[
      getSelectionIndex({
        possibleElements,
        isNewTopLevelElement,
        selectedElementIndex,
        isShiftPressed,
      })
    ];

  // Get clicked elements position using getBoundingClientRect()
  var rect = targetElement.getBoundingClientRect();

  // Get the highlight box element
  element.style.top = rect.top + window.pageYOffset - FOCUS_SPACING + 'px';
  element.style.left = rect.left + window.pageXOffset - FOCUS_SPACING + 'px';
  element.style.width = rect.width + FOCUS_SPACING * 2 + 'px';
  element.style.height = rect.height + FOCUS_SPACING * 2 + 'px';

  return {
    newFocussedElement: targetElement,
    newTopLevelElement: possibleElements[0],
  };
};
