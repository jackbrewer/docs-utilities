import { MODES } from './constants';

type ModeTypes = (typeof MODES)[number];

type ValidateAndUpdateModeArgs = {
  mode?: string;
  onChange: (mode: ModeTypes) => void;
};
const validateAndUpdateMode = ({
  mode,
  onChange,
}: ValidateAndUpdateModeArgs) => {
  if (mode && MODES.includes(mode)) {
    return onChange(mode);
  }
};

type SetupToolbarArgs = {
  onChange: (mode: ModeTypes) => void;
};
export const setupToolbar = ({ onChange }: SetupToolbarArgs) => {
  // const toolbarEl = document.querySelector('.js-toolbar') as HTMLElement;
  const toolbarButtonEls = [
    ...document.querySelectorAll('.js-toolbar-button'),
  ] as HTMLElement[];

  // Set initial mode
  const initialEl = toolbarButtonEls[0];
  initialEl.classList.add('is-active');
  validateAndUpdateMode({
    mode: initialEl.dataset.mode,
    onChange,
  });

  toolbarButtonEls.forEach((buttonEl) => {
    buttonEl.addEventListener('click', () => {
      toolbarButtonEls.forEach((buttonEl) => {
        buttonEl.classList.remove('is-active');
      });
      buttonEl.classList.add('is-active');
      validateAndUpdateMode({
        mode: buttonEl.dataset.mode,
        onChange,
      });
    });
  });
};

export const resetToolbarActiveState = () => {
  const toolbarButtonEls = [
    ...document.querySelectorAll('.js-toolbar-button'),
  ] as HTMLElement[];

  toolbarButtonEls.forEach((buttonEl) => {
    buttonEl.classList.remove('is-active');
  });

  const initialEl = toolbarButtonEls[0];
  initialEl.classList.add('is-active');
};
