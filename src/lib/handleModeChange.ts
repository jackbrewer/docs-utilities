import { MODES } from './constants';

type ModeTypes = (typeof MODES)[number];

export const handleModeChange = (mode: ModeTypes) => {
  console.log('Mode changed to:', mode);
  document.body.classList.remove(...MODES.map((m) => `du-mode--${m}`));
  document.body.classList.add(`du-mode--${mode}`);
  return mode;
};
