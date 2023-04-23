document.addEventListener('DOMContentLoaded', function () {
  // Send a message to the content script when the popup is opened
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (typeof tabs[0].id !== 'number') return;
    chrome.tabs.sendMessage(tabs[0].id, { action: 'popupOpened' });
  });

  var buttons = document.querySelectorAll('button');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Get the selected type from the button's data attribute
      var intent = button.dataset.intent;

      // Send a message to the content script with the selected className
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (typeof tabs[0].id !== 'number') return;
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            action: 'activateExtension',
            intent,
          },
          function (/* response */) {
            // Close the popover when the message is sent
            window.close();
          }
        );
      });
    });
  });
});

// Dispatch a custom event when the popover opens
var popoverEvent = new Event('popoverOpened');
document.dispatchEvent(popoverEvent);
