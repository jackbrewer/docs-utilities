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
    const altKey = event.altKey;

    let wDiff = event.clientX - mousePressX;
    let hDiff = event.clientY - mousePressY;

    let newW = initW;
    let newH = initH;
    let newX = initX;
    let newY = initY;

    if (xResize) {
      if (left) {
        newW = altKey ? initW - wDiff * 2 : initW - wDiff;
        if (newW < minWidth) return;
        newX += wDiff;
      } else {
        newW = altKey ? initW + wDiff * 2 : initW + wDiff;
        if (newW < minWidth) return;
        if (altKey) {
          newX -= wDiff;
        }
      }
    }

    if (yResize) {
      if (top) {
        newH = altKey ? initH - hDiff * 2 : initH - hDiff;
        if (newH < minHeight) return;
        newY += hDiff;
      } else {
        newH = altKey ? initH + hDiff * 2 : initH + hDiff;
        if (newH < minHeight) return;
        if (altKey) {
          newY -= hDiff;
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
