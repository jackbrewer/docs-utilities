import { CLASS_LIGHTBOX_HIDDEN, FOCUS_SPACING } from './constants';
import { filterStackedElements } from './filterStackedElements';
import { getSelectionIndex } from './getSelectionIndex';

type HandleFocusClickArgs = {
  event: MouseEvent;
  focussedElement: HTMLElement | null;
  topLevelElement: HTMLElement | null;
};

export const handleFocusClick = ({
  event,
  focussedElement,
  topLevelElement,
}: HandleFocusClickArgs) => {
  const stackedElements = document.elementsFromPoint(
    event.clientX,
    event.clientY
  ) as HTMLElement[];

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
  // Get the border-radius style of the clicked element
  var radius = window
    .getComputedStyle(targetElement)
    .getPropertyValue('border-radius');

  // Get the highlight box element
  var highlightBox = document.getElementById('highlight-box');

  if (highlightBox) {
    highlightBox.classList.remove(CLASS_LIGHTBOX_HIDDEN);
    highlightBox.style.top =
      rect.top + window.pageYOffset - FOCUS_SPACING + 'px';
    highlightBox.style.left =
      rect.left + window.pageXOffset - FOCUS_SPACING + 'px';
    highlightBox.style.width = rect.width + FOCUS_SPACING * 2 + 'px';
    highlightBox.style.height = rect.height + FOCUS_SPACING * 2 + 'px';
    highlightBox.style.borderRadius =
      !radius || radius === '0px' ? '' : `calc(${radius} + ${FOCUS_SPACING}px)`;
  }

  return {
    newFocussedElement: targetElement,
    newTopLevelElement: possibleElements[0],
  };
};
