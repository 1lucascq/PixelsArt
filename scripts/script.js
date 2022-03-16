const pixelBoard = document.querySelector('#pixel-board');
const pixelBoardPrevState = [];

// Tools

let eraser = false; let paintBucket = false;
let pixelBoardIndex = pixelBoardPrevState.length ? pixelBoardPrevState.length : 0;

const eraserEl = document.querySelector('#eraser');
eraserEl.addEventListener('click', () => {
  eraser = true; paintBucket = false;
});
const paintBucketEl = document.querySelector('#paint-bucket');
paintBucketEl.addEventListener('click', () => {
  eraser = false; paintBucket = true;
});
const paintBrushEl = document.querySelector('#paint-brush');
paintBrushEl.addEventListener('click', () => {
  eraser = false; paintBucket = false;
});

const toolsItems = document.getElementsByClassName('tool');
const SELECTED_TOOL = 'selected-tool';
function selectTool(e) {
  for (let i = 0; i < toolsItems.length; i += 1) {
    if (toolsItems[i].classList.contains(SELECTED_TOOL)) {
      toolsItems[i].classList.toggle(SELECTED_TOOL);
    }
  }
  e.target.classList.toggle(SELECTED_TOOL);
}

for (let i = 0; i < toolsItems.length; i += 1) {
  toolsItems[i].addEventListener('click', selectTool);
}

// Back and Forward buttons

const backBtn = document.querySelector('#back');

function goBack() {
  const previousPixelData = pixelBoardPrevState[pixelBoardIndex - 1];
  const { pixel, color } = previousPixelData;
  if (previousPixelData.wasPaintBucket === true) {
    previousPixelData.pixel.forEach(({ bPixel, bColor }) => {
      const pixelToChange = document.querySelector(`#${bPixel}`);
      pixelToChange.style.backgroundColor = bColor;
    });
    pixelBoardIndex = pixelBoardIndex === 0 ? 0 : pixelBoardIndex - 1;
    return '';
  }

  const pixelToChange = document.querySelector(`#${pixel}`);
  pixelToChange.style.backgroundColor = color;
  pixelBoardIndex = pixelBoardIndex === 0 ? 0 : pixelBoardIndex - 1;
}

backBtn.addEventListener('click', goBack);

const forwardBtn = document.querySelector('#forward');

function goForward() {
  const MAX = pixelBoardPrevState.length;
  if (pixelBoardIndex === MAX) pixelBoardIndex -= 1;
  const nextPixelData = pixelBoardPrevState[pixelBoardIndex];
  if (nextPixelData.wasPaintBucket === true) {
    nextPixelData.pixel.forEach(({ bPixel, bNewColor }) => {
      const pixelToChange = document.querySelector(`#${bPixel}`);
      pixelToChange.style.backgroundColor = bNewColor;
    });
    pixelBoardIndex = pixelBoardIndex === MAX ? MAX : pixelBoardIndex + 1;
    return '';
  }
  const { pixel, newColor } = nextPixelData;
  const pixelToChange = document.querySelector(`#${pixel}`);
  pixelToChange.style.backgroundColor = newColor;
  pixelBoardIndex = pixelBoardIndex === MAX ? MAX : pixelBoardIndex + 1;
}

forwardBtn.addEventListener('click', goForward);

// Paint Functions && Board Creator

let doDraw = false;

function drawToFalse() { doDraw = false; }

function drawToTrue() { doDraw = true; }

window.addEventListener('mousedown', drawToTrue);
window.addEventListener('mouseup', drawToFalse);

function useEraser(e) {
  if (eraser) { e.target.style.backgroundColor = '#FFFFFF'; }
}

function usePaintBucket(selectedColor) {
  if (paintBucket) {
    const allPixels = document.querySelectorAll('.pixel');
    const pixelsState = [];
    for (let i = 0; i < allPixels.length; i += 1) {
      const pixel = allPixels[i];
      pixel.style.backgroundColor = window.getComputedStyle(selectedColor).backgroundColor;
      const pixelChanged = {
        bPixel: pixel.id,
        bColor: pixel.dataset.backgroundColor,
        bNewColor: window.getComputedStyle(selectedColor).backgroundColor,
      };
      pixelsState.push(pixelChanged);
    }
    pixelBoardPrevState[pixelBoardIndex - 1].wasPaintBucket = true;
    pixelBoardPrevState[pixelBoardIndex - 1].pixel = pixelsState;
    console.log(pixelBoardPrevState[pixelBoardIndex - 1]);
  }
}

function manageBoardState(e, isPaintBucket = false, selectedColor) {
  if (pixelBoardPrevState.length === 50) {
    pixelBoardPrevState.shift();
  }

  const pixelChanged = {
    pixel: e.target.id,
    color: e.target.dataset.backgroundColor,
    newColor: window.getComputedStyle(selectedColor).backgroundColor,
    wasPaintBucket: isPaintBucket,
  };
  pixelBoardPrevState.push(pixelChanged); pixelBoardIndex = pixelBoardPrevState.length;
}

function mainAction(e) {
  const selectedColor = document.querySelector('.selected');
  manageBoardState(e, false, selectedColor);
  useEraser(e);
  usePaintBucket(selectedColor);
  e.target.dataset.backgroundColor = selectedColor.style.backgroundColor
    ? selectedColor.style.backgroundColor : 'black';
  if (!eraser && !paintBucket) {
    e.target.style.backgroundColor = window.getComputedStyle(selectedColor).backgroundColor;
  }
}

function mouseDownPaint(e) {
  if (doDraw === false) return '';
  mainAction(e);
}

function createBoard() {
  const DEFAULT_BOARDSIZE = 10;
  pixelBoard.style.gridTemplateColumns = `repeat(${DEFAULT_BOARDSIZE}, 40px)`;
  for (let x = 0; x < DEFAULT_BOARDSIZE; x += 1) {
    for (let y = 0; y < DEFAULT_BOARDSIZE; y += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.dataset.backgroundColor = '#FFFFFF';
      pixel.dataset.x = x;
      pixel.dataset.y = y;
      pixel.id = `p${x}-${y}`;
      pixel.addEventListener('click', mainAction);
      pixel.addEventListener('mouseover', mouseDownPaint);
      pixelBoard.appendChild(pixel);
    }
  }
}

// Load && Delete Board

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

window.onload = function load() {
  const blackColor = document.querySelector('#black');
  blackColor.className = 'color selected';
  paintBrushEl.className = 'tool selected-tool';

  const colorPalette = document.getElementsByClassName('color');
  for (let i = 1; i < colorPalette.length; i += 1) {
    colorPalette[i].style.backgroundColor = randomRGB();
  }
  randomRGB();
  createBoard();
};

function deleteBoard() {
  const pixelsToDelete = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixelsToDelete.length; i += 1) {
    pixelsToDelete[i].remove();
  }
}

const inputBoardSize = document.querySelector('#board-size');
function createNewBoard() {
  deleteBoard();
  let boardSize = inputBoardSize.value;
  if (inputBoardSize.value < 5) { boardSize = 5; }
  if (inputBoardSize.value > 50) { boardSize = 50; }
  pixelBoard.style.gridTemplateColumns = `repeat(${boardSize}, 40px)`;
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.addEventListener('click', mainAction);
      pixel.addEventListener('mouseover', mouseDownPaint);
      pixelBoard.appendChild(pixel);
    }
  }
}

function newBoardSize() {
  if (inputBoardSize.value === '') {
    alert('Board Inválido!');
  } else {
    createNewBoard();
  }
}

const btnBoardSize = document.getElementById('generate-board');
btnBoardSize.addEventListener('click', newBoardSize);

// Toggle Selected Color

const colorPalette = document.getElementsByClassName('color');
function selectionFunction(e) {
  for (let i = 0; i < colorPalette.length; i += 1) {
    if (colorPalette[i].classList.contains('selected')) {
      colorPalette[i].classList.toggle('selected');
    }
  }
  e.target.classList.toggle('selected');
}

for (let i = 0; i < colorPalette.length; i += 1) {
  colorPalette[i].addEventListener('click', selectionFunction);
}

// Clear Btn

const pixels = document.getElementsByClassName('pixel');
function clearBoard() {
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
}
const button = document.querySelector('#clear-board');
button.addEventListener('click', clearBoard);
