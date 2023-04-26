type SetElementPositionArgs = {
  element: HTMLElement;
  x: number;
  y: number;
};

export const setElementPosition = ({
  element,
  x,
  y,
}: SetElementPositionArgs) => {
  element.style.left = x + 'px';
  element.style.top = y + 'px';
};
