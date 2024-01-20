const container = document.querySelector(".container");
const sizeElement = document.querySelector(".size");
const color = document.querySelector(".color");
const resetBtn = document.querySelector(".button");
const eraseBtn = document.querySelector(".erase");
const filenameInput = document.getElementById("filenameInput");

let size = sizeElement.value;
let draw = false; 
let eraseMode = false;

function addGrid() {
  container.style.setProperty("--size", size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.classList.add("box");

    if (i % 2 === 0) {
      div.style.backgroundColor = "#fff"; 
    } else {
      div.style.backgroundColor = "#ddd"; 
    }

    div.addEventListener("mouseover", () => onMouseOver(div));
    div.addEventListener("mousedown", () => onMouseDown(div));

    container.appendChild(div);
  }
}

addGrid();

function onMouseOver(div) {
  if (draw) {
    if (eraseMode) {
      div.style.backgroundColor = ""; 
    } else {
      div.style.backgroundColor = color.value;
    }
  }
}

function onMouseDown(div) {
  if (draw) {
    if (eraseMode) {
      div.style.backgroundColor = ""; 
    } else {
      div.style.backgroundColor = color.value; 
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

sizeElement.addEventListener("input", function () {
  size = sizeElement.value;
  reset();
});
function eraseGrids() {
  eraseMode = !eraseMode;
  if (eraseMode) {
    const cursorIcon = 'url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA66TnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAC4AAABuAAAA4AAAAdwAAAO4AAAHcAAABuAAAAXAAAADgAAAAAAAAA///////////////////////////////////////////////////////////////////////////////////////////////////////////+D////A////gP///wD///4A///8Af//+AP///AH///wD///8B////A////wf///8="), auto';
    eraseBtn.style.cursor = cursorIcon;

  } else {
    eraseBtn.style.cursor = ""; 
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