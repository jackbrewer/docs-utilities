import { CLASS_DRAGGING } from './constants';
import { setElementPosition } from './setElementPosition';

type HandleDragArgs = {
  element: HTMLElement;
  event: MouseEvent;
};

export const handleDrag = ({ element, event }: HandleDragArgs) => {
  document.body.classList.add(CLASS_DRAGGING);
  const target = event.target as HTMLElement;

  let initX = element.offsetLeft;
  let initY = element.offsetTop;
  let mousePressX = event.clientX;
  let mousePressY = event.clientY;

  function eventMoveHandler(event: MouseEvent) {
    setElementPosition({
      element,
      x: initX + (event.clientX - mousePressX),
      y: initY + (event.clientY - mousePressY),
    });
  }

  element.addEventListener('mousemove', eventMoveHandler, false);
  window.addEventListener(
    'mouseup',
    function eventEndHandler() {
      element.removeEventListener('mousemove', eventMoveHandler, false);
      window.removeEventListener('mouseup', eventEndHandler);
      document.body.classList.remove(CLASS_DRAGGING);
    },
    false
  );
};
