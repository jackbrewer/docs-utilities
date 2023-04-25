export const template = `
<div class="du-box__wrapper">
  <div class="du-box js-box">
    <div class="du-box__drag js-box-drag"></div>
    <div class="du-box__guide du-box__guide--vertical"></div>
    <div class="du-box__guide du-box__guide--horizontal"></div>
    <div class="du-box__point js-box-point" data-point="left-top"></div>
    <div class="du-box__point js-box-point" data-point="center-top"></div>
    <div class="du-box__point js-box-point" data-point="right-top"></div>
    <div class="du-box__point js-box-point" data-point="left-middle"></div>
    <div class="du-box__point js-box-point" data-point="right-middle"></div>
    <div class="du-box__point js-box-point" data-point="left-bottom"></div>
    <div class="du-box__point js-box-point" data-point="center-bottom"></div>
    <div class="du-box__point js-box-point" data-point="right-bottom"></div>
  </div>
</div>
`;

export const toolbar = `
<div class="du-toolbar">
  <button class="du-toolbar__button js-toolbar-button" data-mode="select" title="Focus element">
    <svg width="24px" height="24px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21 13V8a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path clip-rule="evenodd" d="M20.879 16.917c.494.304.463 1.043-.045 1.101l-2.567.291-1.151 2.312c-.228.459-.933.234-1.05-.334l-1.255-6.116c-.099-.48.333-.782.75-.525l5.318 3.271z" stroke="currentColor" stroke-width="1.2"></path><path d="M12 11.01l.01-.011M16 11.01l.01-.011M8 11.01l.01-.011" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </button>
  <button class="du-toolbar__button js-toolbar-button" data-mode="manual" title="Manual focus">
    <svg width="24px" height="24px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M11 13.6V21H3.6a.6.6 0 01-.6-.6V13h7.4a.6.6 0 01.6.6zM11 21h3M3 13v-3M6 3H3.6a.6.6 0 00-.6.6V6M14 3h-4M21 10v4M18 3h2.4a.6.6 0 01.6.6V6M18 21h2.4a.6.6 0 00.6-.6V18M11 10h3v3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </button>
  <button disabled class="du-toolbar__button js-toolbar-button" data-mode="blur" title="Blur element">
    <svg width="24px" height="24px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </button>
  <button disabled class="du-toolbar__button js-toolbar-button" data-mode="close" title="Hide toolbar">
    <svg width="24px" height="24px" stroke-width="1.2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M19.141 5A9.97 9.97 0 0012 2C6.477 2 2 6.477 2 12a9.968 9.968 0 002.859 7M19.14 5A9.967 9.967 0 0122 12c0 5.523-4.477 10-10 10a9.97 9.97 0 01-7.141-3M19.14 5L4.86 19" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
  </button>
</div>
`;
