import { CLASS_BARRIER } from './constants';

// @ts-ignore
import stylesAsString from '../styles/content.css';

export const setupDefaultElements = () => {
  // Adds styles to the page
  var styleEl = document.createElement('style');
  styleEl.innerHTML = stylesAsString;
  document.head.appendChild(styleEl);

  // Adds barrier to the page
  // This is used to prevent clicks from passing through the overlay, causing
  // accidental navigation or other unwanted behaviour whilst in editing mode
  const barrierEl = document.createElement('div');
  barrierEl.classList.add(CLASS_BARRIER);
  document.body.appendChild(barrierEl);
};
