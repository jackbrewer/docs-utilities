import { IGNORED_CLASSES, IGNORED_ELEMENTS } from './constants';

type FilterStackedElementsArgs = {
  stackedElements: HTMLElement[];
};

export const filterStackedElements = ({
  stackedElements,
}: FilterStackedElementsArgs) =>
  stackedElements.filter((el) => {
    // Ignore elements we don’t want to select directly – SVG components etc
    if (IGNORED_ELEMENTS.includes(el.tagName)) {
      return false;
    }

    // Ignore elements added by the extension, using their classes
    if (IGNORED_CLASSES.some((className) => el.classList.contains(className))) {
      return false;
    }

    // Ignore elements which have the same dimensions as their child
    // This is to ignore elements which are just wrappers for other elements
    // where selecting them would not produce a different visual result
    if (
      el.children.length > 0 &&
      (el.children[0] as HTMLElement).offsetWidth === el.offsetWidth &&
      (el.children[0] as HTMLElement).offsetHeight === el.offsetHeight
    ) {
      return false;
    }

    return true;
  });
