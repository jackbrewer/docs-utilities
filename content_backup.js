let isInitialized = false;
let isEditing = false;
// let element = null;
// let blurredElements = [];
// let focussedElement = null;

/**
 * TODO:
 * =====
 * - [ ] Make the pre-blur hover effect use a standalone element to avoid clickthrough
 * - [ ] Hitting ESC should cancel the edit mode
 * - [ ] Opening the popup should cancel the edit mode
 * - [ ] selecting an element should cancel edit mode
 * - [ ] Navigating away from the page (out of edit mode) should clear all the styles
 * - [ ] The popup should have a button to clear all styles
 * - [ ] The focus mode should allow multiple clicks to go deeper into the DOM (then loop round)
 * - [ ] The click-blocker should be a standalone element rather than a ::before
 * - [ ] The click-blocker should be active when edit mode is entered
 * - [ ] The focus click-blocker should still allow the blur selection to work
 * - [ ] The blur click-blocker should still allow the focus selection to work
 *
 * Feature requests
 * ================
 * - [ ] Draw a custom focus area with click/drag
 * - [ ] Edit any blur area with click/drag (with modifier key?)
 * - [ ] Draw a custom blur area with click/drag (if possible with CSS)
 * - [ ] Whitelist preferred elements? e.g. a card gets preference over a card>div if similar size?
 */

const reset = () => {
  document.body.classList.remove("u-editing");
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.action);
  if (request.action === "popupOpened") {
    // Handle the popup opened event
    console.log("Popup opened!");
    isEditing = false;

    reset();

    if (!isInitialized) {
      isInitialized = true;

      // Adds styles to the page
      var style = document.createElement("style");
      style.innerHTML = `
        /* Can be used to blur out sensitive info */
        .u-blur-hover {
          transition: background 0.2s ease-in-out;
          background-color: rgb(255, 255, 0, 0.2);
        }

        .u-blur-selected {
          transition: filter 0.2s ease-in-out;
          filter: blur(6px);
        }

        .u-dynamic-lightbox {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          border-radius: 8px;
          box-shadow: 0 0 0 100vmax rgb(0 0 0 / 40%);
          z-index: 999999;
          transition: all 0.2s ease-in-out;
          /* background-color: rgba(255, 255, 204, 0.5); */
        }

        .u-dynamic-lightbox--hidden {
          opacity: 0;
        }

        .u-editing .u-barrier {
          position: fixed;
          inset: 0;
          z-index: 999998;
          background: rgba(0, 255, 0, 0.2);
        }
      `;
      document.head.appendChild(style);

      const barrier = document.createElement("div");
      barrier.classList.add("u-barrier");
      document.body.appendChild(barrier);
    }
  }

  if (request.action === "activateExtension") {
    isEditing = true;

    document.body.classList.add("u-editing");

    if (request.intent === "blur") {
      handleBlur();
    }

    if (request.intent === "focus") {
      // Add the highlight box to the DOM
      addHighlightBox();
      handleFocus();
    }
  }
});

const handleFocus = () => {
  document.addEventListener("click", moveHighlightBox);
};

const toggleHoverEffect = (e) => {
  if (e.type === "mouseover" || e.type === "click") {
    e.target.classList.add("u-blur-hover");
  } else if (e.type === "mouseout") {
    e.target.classList.remove("u-blur-hover");
  }
};

const toggleSelectedEffect = (e) => {
  // Check if the target element is not already selected
  if (e.target.classList.contains("u-blur-selected")) {
    e.target.classList.remove("u-blur-selected");
  } else {
    e.target.classList.add("u-blur-selected");
  }
};

const handleBlur = () => {
  document.addEventListener("mouseover", toggleHoverEffect);
  document.addEventListener("mouseout", toggleHoverEffect);
  document.addEventListener("click", toggleSelectedEffect);
};

function applyHoverEffect(e, className) {
  // Check if the target element is not already selected
  if (!selectedElements.includes(e.target)) {
    // Add the hover style to the target element
    e.target.classList.add(className);
  }
}

function removeHoverEffect(e, className) {
  // Check if the target element is not already selected
  if (!selectedElements.includes(e.target)) {
    // Remove the hover style from the target element
    e.target.classList.remove(className);
  }
}

function addHighlightBox() {
  if (document.getElementById("highlight-box")) {
    return;
  }
  var highlightBox = document.createElement("div");
  highlightBox.classList.add("u-dynamic-lightbox");
  highlightBox.classList.add("u-dynamic-lightbox--hidden");
  highlightBox.id = "highlight-box";
  document.body.appendChild(highlightBox);
}

function moveHighlightBox(event) {
  event.stopPropagation();
  event.preventDefault();

  const targetElement = document.elementsFromPoint(
    event.clientX,
    event.clientY
  )[1];

  // Get the border-radius style of the element
  var radius = window
    .getComputedStyle(targetElement)
    .getPropertyValue("border-radius");

  // Get the highlight box element
  var highlightBox = document.getElementById("highlight-box");

  // Remove the hidden class from the highlight box
  highlightBox.classList.remove("u-dynamic-lightbox--hidden");

  // Get position using getBoundingClientRect()
  var rect = targetElement.getBoundingClientRect();

  const gap = 12;

  highlightBox.style.top = rect.top + window.pageYOffset - gap + "px";
  highlightBox.style.left = rect.left + window.pageXOffset - gap + "px";
  highlightBox.style.width = rect.width + gap * 2 + "px";
  highlightBox.style.height = rect.height + gap * 2 + "px";

  if (radius !== "0px") {
    highlightBox.style.borderRadius = `calc(${radius} + ${gap}px)`;
  } else {
    highlightBox.style.borderRadius = "";
  }
}
