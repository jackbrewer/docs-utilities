import { CLASS_RESIZING } from './constants';
import { setElementPosition } from './setElementPosition';
import { setElementSize } from './setElementSize';

type HandleResizeArgs = {
  element: HTMLElement;
  event: MouseEvent;
  left: boolean;
  top: boolean;
  xResize: boolean;
  yResize: boolean;
};

export const handleResize = ({
  element,
  event,
  left = false,
  top = false,
  xResize = false,
  yResize = false,
}: HandleResizeArgs) => {
  document.body.classList.add(CLASS_RESIZING);

  const minWidth = 40;
  const minHeight = 40;

  const initX = element.offsetLeft;
  const initY = element.offsetTop;
  const mousePressX = event.clientX;
  const mousePressY = event.clientY;

  const initW = element.offsetWidth;
  const initH = element.offsetHeight;

  function eventMoveHandler(event) {
    let wDiff = event.clientX - mousePressX;
    let hDiff = event.clientY - mousePressY;

    let newW = initW;
    let newH = initH;
    let newX = initX;
    let newY = initY;

    if (xResize) {
      if (left) {
        newW = initW - wDiff;
        if (newW < minWidth) {
          newW = minWidth;
          wDiff = initW - minWidth;
        }
        newX += wDiff;
      } else {
        newW = initW + wDiff;
        if (newW < minWidth) {
          newW = minWidth;
          wDiff = minWidth - initW;
        }
      }
    }

    if (yResize) {
      if (top) {
        newH = initH - hDiff;
        if (newH < minHeight) {
          newH = minHeight;
          hDiff = initH - minHeight;
        }
        newY += hDiff;
      } else {
        newH = initH + hDiff;
        if (newH < minHeight) {
          newH = minHeight;
          hDiff = minHeight - initH;
        }
      }
    }

    setElementSize({ element, w: newW, h: newH });
    setElementPosition({ element, x: newX, y: newY });
  }

  window.addEventListener('mousemove', eventMoveHandler, false);
  window.addEventListener(
    'mouseup',
    function eventEndHandler() {
      window.removeEventListener('mousemove', eventMoveHandler, false);
      window.removeEventListener('mouseup', eventEndHandler);
      document.body.classList.remove(CLASS_RESIZING);
    },
    false
  );
};
