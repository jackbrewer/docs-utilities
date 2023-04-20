# Docs Utilities

A Chrome extension to help prepare screenshots for Docs.

> **Warning**
> This is an early prototype, please suggest features and report bugs!

To use, click an option in the extension menu, then select an element on page.

To change the focussed element, select the "focus" option, and click an element on page. To change the selection, click a different element. Clicking the same element will move the focus to the next element in the stack. Holding shift whilst clicking will do the reverse.

To add blur to an element, select the blur button, then select an element. To remove blur, click the element again.

Hitting escape, or opening the extension menu will cancel the interactive mode, leaving the selections in place.

To remove all styles, refresh the page :)

## Installation (Chrome)

- Download and uncompress the .zip from the "Code" dropdown above
- Go to your Google Chrome extensions window at chrome://extensions/
- Toggle on Developer mode (top right corner)
- Click "Load unpacked" and select the folder for the uncompressed zip
- You should now see the extension icon in your browser extensions bar (if not, it may be hidden with your extensions – you can optionally "pin" it to keep it visible)

## TODO

- [ ] Tests/linting/formatting
- [ ] Build process
- [ ] Draggable resize for focus mode
