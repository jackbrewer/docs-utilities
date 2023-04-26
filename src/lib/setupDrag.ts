import { handleDrag } from './handleDrag';

type SetupDragArgs = {
  element: HTMLElement;
};

export const setupDrag = ({ element }: SetupDragArgs) => {
  const dragElement = element.querySelector('.js-box-drag') as HTMLElement;
  dragElement.addEventListener(
    'mousedown',
    (event) =>
      handleDrag({
        element,
        event,
      }),
    false
  );
};
