type SetElementSizeArgs = {
  element: HTMLElement;
  w: number;
  h: number;
};

export const setElementSize = ({ element, w, h }: SetElementSizeArgs) => {
  element.style.width = w + 'px';
  element.style.height = h + 'px';
};
