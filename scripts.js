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
const pencilButton = document.querySelector('#pencil');
const colorPickArea = document.querySelector('#colorPickArea');

let size = 16;
let squareDiv = [];
let eraseToggled = false;
let rngToggled = false;
let pencilToggled = false;
let borderToggle = 'grey';
let colorSelection = 'black';
let colorMode = 'mouseover';
let colorButtonName = '';

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
pencilButton.addEventListener('click', pencilMode);

function setSize(num, array) {
    sketchPad.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    sketchPad.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num * num; i++) {
        array[i] = document.createElement('div');
        array[i].classList.add('squareDiv');
        sketchPad.appendChild(array[i]);
    }

    findCurrentMode();
}

function resizeBoard() {
    size = Number(prompt('What size to resize to (default = 16 (16x16))'));
    clearBoard();
}

function colorBoard() {
    modifyMode('color');
}

function eraseBoard() {
    modifyMode('erase');
}

function eraseSquare(e) {
    e.target.style.opacity = '';

    e.target.style.backgroundColor = 'white';
}

function clearBoard() {
    squareDiv = [];
    sketchPad.innerHTML = '';
    setSize(size, squareDiv);
}

function toggleErase() {
    if (colorButtonName !== '') {
        colorButtonName.classList.toggle("activeC", false);
    }

    pencilToggled = false;
    pencilButton.classList.toggle("active", false);

    rngToggled = false;
    rngButton.classList.toggle("active", false);

    colorPickArea.classList.toggle("active", false);

    eraseToggled = true;
    eraseButton.classList.toggle("active", true);

    eraseBoard();
}

function getColor() {
    if (colorButtonName !== '') {
        colorButtonName.classList.toggle("activeC", false);
    }

    pencilToggled = false;
    pencilButton.classList.toggle("active", false);

    eraseToggled = false;
    eraseButton.classList.toggle("active", false);

    rngToggled = false;
    rngButton.classList.toggle("active", false);

    colorPickArea.classList.toggle("active", true);

    colorSelection = this.value;

    colorBoard();
}

function changeColor(e) {
    if (colorButtonName !== '') {
        colorButtonName.classList.toggle("activeC", false);
    }

    colorPickArea.classList.toggle("active", false);

    pencilToggled = false;
    pencilButton.classList.toggle("active", false);

    eraseToggled = false;
    eraseButton.classList.toggle("active", false);

    rngToggled = false;
    rngButton.classList.toggle("active", false);

    colorSelection = e.target.id;
    colorButtonName = e.target;
    colorButtonName.classList.toggle("activeC", true);

    squareDiv.forEach(square => square.removeEventListener(colorMode, pencilSquare));
    squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));
}

function colorSquare(e) {
    e.target.style.opacity = '';

    e.target.style.backgroundColor = colorSelection;
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
        modifyMode('remove');

        colorMode = 'click';

        findCurrentMode();

        modeButton.textContent = 'Hover to Color';

    } else if (colorMode === 'click') {
        modifyMode('remove');

        colorMode = 'mouseover';

        findCurrentMode();

        modeButton.textContent = 'Click to Color';

    }
}

function rngColor() {
    if (colorButtonName !== '') {
        colorButtonName.classList.toggle("activeC", false);
    }

    pencilToggled = false;
    pencilButton.classList.toggle("active", false);

    eraseToggled = false;
    eraseButton.classList.toggle("active", false);

    colorPickArea.classList.toggle("active", false);

    rngToggled = true;
    rngButton.classList.toggle("active", true);

    modifyMode('rng');
}


function rngColorSquare(e) {
    e.target.style.opacity = '';

    let redRng = Math.floor(Math.random() * 256);
    let blueRng = Math.floor(Math.random() * 256);
    let greenRng = Math.floor(Math.random() * 256);

    e.target.style.backgroundColor = `rgb(${redRng}, ${blueRng}, ${greenRng})`;
}

function pencilMode() {
    if (colorButtonName !== '') {
        colorButtonName.classList.toggle("activeC", false);
    }

    eraseToggled = false;
    eraseButton.classList.toggle("active", false);

    rngToggled = false;
    rngButton.classList.toggle("active", false);

    colorPickArea.classList.toggle("active", false);

    pencilToggled = true;
    pencilButton.classList.toggle("active", true);

    modifyMode('pencil');
}

function pencilSquare(e) {
    e.target.style.backgroundColor = 'black';

    let currentOpacity = Number(e.target.style.opacity);

    e.target.style.opacity = currentOpacity += 0.1;
}

function findCurrentMode() {
    if (rngToggled === true) {
        rngColor();
    } else if (eraseToggled === true) {
        eraseBoard();
    } else if (pencilToggled === true) {
        pencilMode();
    } else {
        colorBoard();
    }
}

function modifyMode(mode) {
    switch (mode) {
        case 'pencil':
            squareDiv.forEach(square => square.removeEventListener(colorMode, rngColorSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, eraseSquare));
            squareDiv.forEach(square => square.addEventListener(colorMode, pencilSquare));
            break;
        case 'color':
            squareDiv.forEach(square => square.removeEventListener(colorMode, pencilSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, eraseSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, rngColorSquare));
            squareDiv.forEach(square => square.addEventListener(colorMode, colorSquare));
            break;
        case 'erase':
            squareDiv.forEach(square => square.removeEventListener(colorMode, pencilSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, rngColorSquare));
            squareDiv.forEach(square => square.addEventListener(colorMode, eraseSquare));
            break;
        case 'rng':
            squareDiv.forEach(square => square.removeEventListener(colorMode, pencilSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, eraseSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));

            for (let i = 0; i < squareDiv.length; i++) {
                squareDiv[i].addEventListener(colorMode, rngColorSquare);
            }
            break;
        case 'remove':
            squareDiv.forEach(square => square.removeEventListener(colorMode, rngColorSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, colorSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, eraseSquare));
            squareDiv.forEach(square => square.removeEventListener(colorMode, pencilSquare));
            break;
    }
}