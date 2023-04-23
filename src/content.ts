import {
  CLASS_EDITING,
  CLASS_LIGHTBOX,
  CLASS_LIGHTBOX_HIDDEN,
} from './lib/constants';
import { handleBlurClick } from './lib/handleBlurClick';
import { handleFocusClick } from './lib/handleFocusClick';
import { setupDefaultElements } from './lib/setupDefaultElements';

let isEditing = false;
let isInitialized = false;

const enterEditMode = () => {
  isEditing = true;
  document.body.classList.add(CLASS_EDITING);
};

const exitEditMode = () => {
  isEditing = false;
  document.body.classList.remove(CLASS_EDITING);
  disableBlurMode();
  disableFocusMode();
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'popupOpened') {
    exitEditMode();

    if (!isInitialized) {
      isInitialized = true;
      setupDefaultElements();
    }
  }

  if (request.action === 'activateExtension') {
    enterEditMode();

    if (request.intent === 'blur') {
      enableBlurMode();
    }

    if (request.intent === 'focus') {
      enableFocusMode();
    }
  }
});

// Focus mode

let focussedElement: HTMLElement | null = null;
let topLevelElement: HTMLElement | null = null;

const handleFocusClickWrapper = (event: MouseEvent) => {
  let { newFocussedElement, newTopLevelElement } = handleFocusClick({
    event,
    focussedElement,
    topLevelElement,
  });

  focussedElement = newFocussedElement;
  topLevelElement = newTopLevelElement;
};

const enableFocusMode = () => {
  addHighlightBox();
  document.addEventListener('click', handleFocusClickWrapper);
  document.addEventListener('keydown', handleFocusKeydown);
};

const disableFocusMode = () => {
  focussedElement = null;
  topLevelElement = null;
  document.removeEventListener('click', handleFocusClickWrapper);
  document.removeEventListener('keydown', handleFocusKeydown);
};

function addHighlightBox() {
  if (document.getElementById('highlight-box')) {
    return;
  }
  var highlightBox = document.createElement('div');
  highlightBox.classList.add(CLASS_LIGHTBOX);
  highlightBox.classList.add(CLASS_LIGHTBOX_HIDDEN);
  highlightBox.id = 'highlight-box';
  document.body.appendChild(highlightBox);
}

const handleFocusKeydown = (event) => {
  if (event.key === 'Escape') {
    exitEditMode();
    disableFocusMode();
  }
};

// Blur mode
const enableBlurMode = () => {
  document.addEventListener('click', handleBlurClick);
  document.addEventListener('keydown', handleBlurKeydown);
};

const disableBlurMode = () => {
  document.removeEventListener('click', handleBlurClick);
  document.removeEventListener('keydown', handleBlurKeydown);
};

const handleBlurKeydown = (event) => {
  if (event.key === 'Escape') {
    exitEditMode();
    disableBlurMode();
  }
};
