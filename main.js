const container = document.querySelector(".container");
const sizeElement = document.querySelector(".size");
const color = document.querySelector(".color");
const resetBtn = document.querySelector(".button");
const eraseBtn = document.querySelector(".erase");
const filenameInput = document.getElementById("filenameInput");

let size = sizeElement.value;
let draw = true; // Initial mode is drawing
let eraseMode = false;

function addGrid() {
  container.style.setProperty("--size", size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    div.addEventListener("mouseover", () => onMouseOver(div));
    div.addEventListener("mousedown", () => onMouseDown(div));

    container.appendChild(div);
  }
}

addGrid();

function onMouseOver(div) {
  if (draw) {
    if (eraseMode) {
      div.style.backgroundColor = ""; // Erase the grid
    } else {
      div.style.backgroundColor = color.value; // Draw with the selected color
    }
  }
}

function onMouseDown(div) {
  if (draw) {
    if (eraseMode) {
      div.style.backgroundColor = ""; // Erase the grid
    } else {
      div.style.backgroundColor = color.value; // Draw with the selected color
    }
  }
}

window.addEventListener("mousedown", function () {
  draw = true;
});

window.addEventListener("mouseup", function () {
  draw = false;
});

function reset() {
  container.innerHTML = "";
  addGrid();
}

resetBtn.addEventListener("click", reset);

sizeElement.addEventListener("keyup", function () {
  size = sizeElement.value;
  reset();
});

function eraseGrids() {
  eraseMode = !eraseMode;
  if (eraseMode) {
    const cursorIcon = 'url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA66TnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAC4AAABuAAAA4AAAAdwAAAO4AAAHcAAABuAAAAXAAAADgAAAAAAAAA///////////////////////////////////////////////////////////////////////////////////////////////////////////+D////A////gP///wD///4A///8Af//+AP///AH///wD///8B////A////wf///8="), auto';
    eraseBtn.style.cursor = cursorIcon;
  } else {
    eraseBtn.style.cursor = ""; // Reset cursor to default
  }
}

eraseBtn.addEventListener("click", eraseGrids);

function saveAsImg() {
  const filename = window.prompt("Enter filename", "pixel_art");

  if (filename === null || filename.trim() === "") {
    return;
  }

  html2canvas(container).then(function (canvas) {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = filename + ".png";
    link.click();
  });
}