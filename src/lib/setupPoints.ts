import { handleDrag } from './handleDrag';
import { handleResize } from './handleResize';

type SetupPointsArgs = {
  element: HTMLElement;
};

export const setupPoints = ({ element }: SetupPointsArgs) => {
  // Resize from corners or edges
  const resizePoints = [
    'left-top',
    'center-top',
    'right-top',
    'left-middle',
    'right-middle',
    'left-bottom',
    'center-bottom',
    'right-bottom',
  ];

  resizePoints.forEach((point) => {
    const pointElement = document.querySelector(
      `.box__point[data-point="${point}"]`
    ) as HTMLElement;
    pointElement.addEventListener('mousedown', (event) =>
      handleResize({
        element,
        event,
        left: point.includes('left'),
        top: point.includes('top'),
        xResize: point.includes('left') || point.includes('right'),
        yResize: point.includes('top') || point.includes('bottom'),
      })
    );
  });

  // Drag from center

  const dragPoints = ['center-middle'];

  dragPoints.forEach((point) => {
    const pointElement = document.querySelector(
      `.box__point[data-point="${point}"]`
    ) as HTMLElement;
    pointElement.addEventListener(
      'mousedown',
      (event) =>
        handleDrag({
          element,
          event,
        }),
      false
    );
  });
};
