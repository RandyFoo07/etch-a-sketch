const sketchPad = document.querySelector('.sketchPad');
const resizeButton = document.querySelector('.left #resize');
const clearButton = document.querySelector('.left #clear');
const eraseButton = document.querySelector('.left #erase');

let size = 16;
let squareDiv = [];
let eraseToggled = true;

setSize(size, squareDiv);

resizeButton.addEventListener('click', resizeBoard);
clearButton.addEventListener('click', clearBoard);
eraseButton.addEventListener('click', toggleErase);

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
    squareDiv.forEach(square => square.removeEventListener('mouseover', eraseSquare));
    squareDiv.forEach(square => square.addEventListener('mouseover', colorSquare));
}

function colorSquare(e) {
    e.target.style.backgroundColor = 'black';
}

function eraseBoard() {
    squareDiv.forEach(square => square.removeEventListener('mouseover', colorSquare));
    squareDiv.forEach(square => square.addEventListener('mouseover', eraseSquare));
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