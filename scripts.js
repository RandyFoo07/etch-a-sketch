const sketchPad = document.querySelector('.sketchPad');
const resizeButton = document.querySelector('.left #resize');
const clearButton = document.querySelector('.left #clear');
const eraseButton = document.querySelector('.left #erase');
const colorPicker = document.querySelector('#colorPicker');
const redButton = document.querySelector('#red');
const blueButton = document.querySelector('#blue');
const yellowButton = document.querySelector('#yellow');
const purpleButton = document.querySelector('#purple');
const greenButton = document.querySelector('#green');
const orangeButton = document.querySelector('#orange');
const borderButton = document.querySelector('#border');
const modeButton = document.querySelector('#mode');
const rngButton = document.querySelector('#rng');

let size = 16;
let squareDiv = [];
let eraseToggled = true;
let borderToggle = 'grey';
let colorSelection = 'black';
let colorMode = 'mouseover';

setSize(size, squareDiv);

colorPicker.addEventListener('click', getColor);
colorPicker.onchange = getColor;
resizeButton.addEventListener('click', resizeBoard);
clearButton.addEventListener('click', clearBoard);
eraseButton.addEventListener('click', toggleErase);
redButton.addEventListener('click', changeColor);
blueButton.addEventListener('click', changeColor);
yellowButton.addEventListener('click', changeColor);
purpleButton.addEventListener('click', changeColor);
greenButton.addEventListener('click', changeColor);
orangeButton.addEventListener('click', changeColor);
borderButton.addEventListener('click', changeBorderVisibility);
modeButton.addEventListener('click', changeColorMode);
rngButton.addEventListener('click', rngColor);

function setSize(num, array) {
    sketchPad.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    for (let i = 0; i < num * num; i++) {
        array[i] = document.createElement('div');
        array[i].classList.add('squareDiv');
        sketchPad.appendChild(array[i]);
    }
    colorBoard();
}

function resizeBoard() {
    size = Number(prompt('What size to resize to (default = 16 (16x16))'));
    resetErase();
    clearBoard();
}

function colorBoard() {
    squareDiv.forEach(square => square.removeEventListener(colorMode, eraseSquare));
    squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));
}


function eraseBoard() {
    squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
    squareDiv.forEach(square => square.addEventListener(colorMode, eraseSquare));
}

function eraseSquare(e) {
    e.target.style.backgroundColor = 'white';
}

function clearBoard() {
    squareDiv = [];
    sketchPad.innerHTML = '';
    resetErase();
    setSize(size, squareDiv);

}

function toggleErase() {
    if (eraseToggled === true) {
        eraseBoard();
        eraseButton.style.backgroundColor = '#888';
        eraseToggled = false;
    } else {
        colorBoard();
        eraseButton.style.backgroundColor = 'rgb(221, 221, 221)';
        eraseToggled = true;
    }
}

function resetErase() {
    eraseToggled = true;
    eraseButton.style.backgroundColor = 'rgb(221, 221, 221)';
}

function getColor() {
    colorSelection = this.value;
}

function changeColor(e) {
    colorSelection = e.target.id;
    squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));

}

function changeBorderVisibility() {
    if (borderToggle === 'grey') {
        squareDiv.forEach(square => square.style.border = 'solid 0.5px #000');
        borderToggle = 'black';
        borderButton.textContent = 'No Border';
    } else if (borderToggle === 'black') {
        squareDiv.forEach(square => square.style.border = 'solid 0.5px transparent');
        borderToggle = 'transparent';
        borderButton.textContent = 'Light Grey Border';
    } else if (borderToggle === 'transparent') {
        squareDiv.forEach(square => square.style.border = 'solid 0.5px #f3f3f3');
        borderToggle = 'grey';
        borderButton.textContent = 'Black Border';
    }
}

function changeColorMode() {
    if (colorMode === 'mouseover') {
        squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
        colorMode = 'click';
        squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));
        modeButton.textContent = 'Hover to Color';
    } else if (colorMode === 'click') {
        squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
        colorMode = 'mouseover';
        squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));
        modeButton.textContent = 'Click to Color';
    }
}

function rngColor() {
    squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
    for (let i = 0; i < squareDiv.length; i++) {
        squareDiv[i].addEventListener(colorMode, rngColorSquare);
    }
}


function colorSquare(e) {
    e.target.style.backgroundColor = colorSelection;
}

function rngColorSquare(e) {
    let redRng = Math.floor(Math.random() * 256);
    let blueRng = Math.floor(Math.random() * 256);
    let greenRng = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${redRng}, ${blueRng}, ${greenRng})`;
}




//pencil mode
//rgb mode
