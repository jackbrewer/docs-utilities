let isInitialized = false;
let isEditing = false;

const ignoredClickElements = ["BODY", "HTML"];
const ignoredClickClasses = ["u-dynamic-lightbox", "u-barrier"];

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "popupOpened") {
    exitEditMode();

    if (!isInitialized) {
      isInitialized = true;

      // Adds styles to the page
      var style = document.createElement("style");
      style.innerHTML = `
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
          box-shadow: 0 0 0 200vmax rgb(0 0 0 / 40%);
          z-index: 999999;
          transition: all 0.2s ease-in-out;
        }

        .u-dynamic-lightbox--hidden {
          opacity: 0;
        }

        .u-editing .u-barrier {
          position: fixed;
          inset: 0;
          z-index: 999998;
          /* box-shadow: 0 0 0 4px inset rgba(0, 200, 0); */
        }
      `;
      document.head.appendChild(style);

      const barrier = document.createElement("div");
      barrier.classList.add("u-barrier");
      document.body.appendChild(barrier);
    }
  }

  if (request.action === "activateExtension") {
    enterEditMode();

    if (request.intent === "blur") {
      enableBlurMode();
    }

    if (request.intent === "focus") {
      enableFocusMode();
    }
  }
});

const enterEditMode = () => {
  isEditing = true;
  document.body.classList.add("u-editing");
};

const exitEditMode = () => {
  isEditing = false;
  document.body.classList.remove("u-editing");
  disableBlurMode();
  disableFocusMode();
};

// Focus mode

let focussedElement = null;
let topLevelElement = null;

const enableFocusMode = () => {
  addHighlightBox();
  document.addEventListener("click", handleFocusClick);
  document.addEventListener("keydown", handleFocusKeydown);
};

const disableFocusMode = () => {
  focussedElement = null;
  topLevelElement = null;
  document.removeEventListener("click", handleFocusClick);
  document.removeEventListener("keydown", handleFocusKeydown);
};

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

const handleFocusClick = (event) => {
  const gap = 12;

  const possibleElements = document
    .elementsFromPoint(event.clientX, event.clientY)
    .filter((el) => {
      if (ignoredClickElements.includes(el.tagName)) {
        return false;
      }
      if (
        ignoredClickClasses.some((className) =>
          el.classList.contains(className)
        )
      ) {
        return false;
      }
      return true;
    });

  const selectedElementIndex = possibleElements.indexOf(focussedElement);
  const isNewTopLevelElement = possibleElements[0] !== topLevelElement;
  console.log(selectedElementIndex);

  // Is the shift button pressed?
  const isShiftPressed = event.shiftKey;

  const targetElement =
    possibleElements[
      getSelectionIndex({
        possibleElements,
        isNewTopLevelElement,
        selectedElementIndex,
        isShiftPressed,
      })
    ];

  focussedElement = targetElement;
  topLevelElement = possibleElements[0];

  console.log(
    targetElement,
    document.elementsFromPoint(event.clientX, event.clientY)
  );

  // Get clicked elements position using getBoundingClientRect()
  var rect = targetElement.getBoundingClientRect();
  // Get the border-radius style of the clicked element
  var radius = window
    .getComputedStyle(targetElement)
    .getPropertyValue("border-radius");

  // Get the highlight box element
  var highlightBox = document.getElementById("highlight-box");
  highlightBox.classList.remove("u-dynamic-lightbox--hidden");
  highlightBox.style.top = rect.top + window.pageYOffset - gap + "px";
  highlightBox.style.left = rect.left + window.pageXOffset - gap + "px";
  highlightBox.style.width = rect.width + gap * 2 + "px";
  highlightBox.style.height = rect.height + gap * 2 + "px";
  highlightBox.style.borderRadius =
    !radius || radius === "0px" ? "" : `calc(${radius} + ${gap}px)`;
};

const getSelectionIndex = ({
  possibleElements,
  isNewTopLevelElement,
  selectedElementIndex,
  isShiftPressed,
}) => {
  // We're starting a new selection stack – reset the index
  if (selectedElementIndex === -1) return 0;

  // We're in the same stack, but starting again from a new top-level place
  if (isNewTopLevelElement) return 0;

  // The selected element is in the stack,

  // return the above element if holding shift
  if (isShiftPressed) {
    if (selectedElementIndex - 1 < 0) return 0;
    return selectedElementIndex - 1;
  }

  // Return the below element
  if (selectedElementIndex + 1 > possibleElements.length - 1) {
    return possibleElements.length - 1;
  }
  return selectedElementIndex + 1;
};

const handleFocusKeydown = (event) => {
  if (event.key === "Escape") {
    exitEditMode();
    disableFocusMode();
  }
};

// Blur mode

const enableBlurMode = () => {
  document.addEventListener("click", handleBlurClick);
  document.addEventListener("keydown", handleBlurKeydown);
};

const disableBlurMode = () => {
  document.removeEventListener("click", handleBlurClick);
  document.removeEventListener("keydown", handleBlurKeydown);
};

handleBlurClick = (event) => {
  const targetElement = document
    .elementsFromPoint(event.clientX, event.clientY)
    .filter((el) => {
      if (ignoredClickElements.includes(el.tagName)) {
        return false;
      }
      if (
        ignoredClickClasses.some((className) =>
          el.classList.contains(className)
        )
      ) {
        return false;
      }
      return true;
    })[0];
  // Check if the target element is not already selected
  if (targetElement.classList.contains("u-blur-selected")) {
    targetElement.classList.remove("u-blur-selected");
  } else {
    targetElement.classList.add("u-blur-selected");
  }
};

const handleBlurKeydown = (event) => {
  if (event.key === "Escape") {
    exitEditMode();
    disableBlurMode();
  }
};
