import { handleDrag } from './handleDrag';

export const setupDrag = ({ element }) => {
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
