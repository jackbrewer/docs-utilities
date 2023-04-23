type GetSelectionIndexArgs = {
  possibleElements: HTMLElement[];
  isNewTopLevelElement: boolean;
  selectedElementIndex: number;
  isShiftPressed: boolean;
};

export const getSelectionIndex = ({
  possibleElements,
  isNewTopLevelElement,
  selectedElementIndex,
  isShiftPressed,
}: GetSelectionIndexArgs) => {
  // We're starting a new selection stack – reset the index
  if (selectedElementIndex === -1) return 0;

  // We're in the same stack, but starting again from a new top-level place
  if (isNewTopLevelElement) return 0;

  // The selected element is in the stack

  // return the above element if holding shift
  if (isShiftPressed) {
    if (selectedElementIndex - 1 < 0) return 0;
    return selectedElementIndex - 1;
  }

  // Return the below element
  if (selectedElementIndex + 1 > possibleElements.length - 1) {
    return possibleElements.length - 1;
  }

  return selectedElementIndex + 1;
};
