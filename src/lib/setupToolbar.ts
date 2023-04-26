export const setupToolbar = ({ onChange }) => {
  const toolbarEl = document.querySelector('.js-toolbar') as HTMLElement;
  const toolbarButtonEls = [
    ...document.querySelectorAll('.js-toolbar-button'),
  ] as HTMLElement[];

  toolbarButtonEls[0].classList.add('is-active');
  onChange(toolbarButtonEls[0].dataset.mode);

  toolbarButtonEls.forEach((buttonEl) => {
    buttonEl.addEventListener('click', () => {
      toolbarButtonEls.forEach((buttonEl) => {
        buttonEl.classList.remove('is-active');
      });
      buttonEl.classList.add('is-active');
      onChange(buttonEl.dataset.mode);
    });
  });
};
